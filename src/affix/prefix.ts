import { AddToString, JoinWords, WordsAsUnion } from "../array_utils";
import {
  SmarterCapitalizeAfterFirst,
  SmarterCapitalize,
  IsStrictPureStringLiteral,
  IsWordsStrictPureStringLiterals,
} from "../upper_lower_cases";
// import { TrimStringStart } from "../trim";
import { IsStringStartsWith, IsStringNotEmpty } from "../type_checks";
import { FancyTrimStart } from "../trim_fancy";

// AddPrefix essentially acts as AddToString with verifying that both strings are non-empty (expect prefix to be a pure string literal too)
export type AddPrefix<
  Input extends string,
  Prefix extends string,
  Fallback = never
> = IsStrictPureStringLiteral<
  Prefix,
  IsStringNotEmpty<Input, AddToString<Prefix, Input>, Fallback>,
  Fallback
>;

// Add prefix but use smarterCapitalize on Input before continuing
export type AddPrefixCase<
  Input extends string,
  Prefix extends string,
  Fallback = never
> = AddPrefix<SmarterCapitalize<Input>, Prefix, Fallback>;

// Assuming Fancy logic is only going to be used for camel/Pascal cased joins, this will pass if the inputted string has no overlap with the prefix, or if it does, expect it to already have the prefix applied. Ex. input `one` prefix `on` returns fallback, but input `onOne` will work
type _AddPrefixChecked<
  Input extends string,
  Prefix extends string,
  Fallback = never
> = IsStringStartsWith<Input, Prefix, 1, 0> extends 1
  ? IsStringStartsWith<Input, SmarterCapitalize<Prefix>, 1, 0> extends 1
    ? Input
    : Fallback
  : AddPrefixCase<Input, Prefix>;

export type AddPrefixChecked<
  Input extends string,
  Prefix extends string,
  Fallback = never
> = IsStrictPureStringLiteral<
  Prefix,
  IsStringNotEmpty<Input, _AddPrefixChecked<Input, Prefix, Fallback>, Fallback>,
  Fallback
>;

// Multiple prefixes assuming join by case, just use the words utility to set all the words
export type AddPrefixes<
  Input extends string,
  Prefixes extends string[],
  Fallback = never
> = IsStringNotEmpty<
  Input,
  IsWordsStrictPureStringLiterals<
    Prefixes,
    JoinWords<SmarterCapitalizeAfterFirst<[...Prefixes, Input]>>,
    Fallback
  >,
  Fallback
>;

// iterate through each prefix, checking it against the current output (initialized on input word)
type _AddPrefixesChecked<
  Prefixes extends string[],
  Output extends string
> = Prefixes extends [...toAdd: infer ToAdd, infer Last]
  ? ToAdd extends string[]
    ? _AddPrefixesChecked<
        ToAdd,
        AddPrefixChecked<Output, string & Last, Output>
      >
    : Output
  : Output;

export type AddPrefixesChecked<
  Input extends string,
  Prefixes extends string[],
  Fallback = never
> = IsStringNotEmpty<
  Input,
  IsWordsStrictPureStringLiterals<
    Prefixes,
    _AddPrefixesChecked<Prefixes, Input>,
    Fallback
  >,
  Fallback
>;

type _StripPrefixesAdd<
  Input extends string,
  Prefixes extends string[],
  Fallback = never
> = IsWordsStrictPureStringLiterals<
  Prefixes,
  AddPrefixes<
    FancyTrimStart<Input, WordsAsUnion<Prefixes>>,
    Prefixes,
    Fallback
  >,
  Fallback
>;

// when prefixes are long and expected to be unique, this will make sure to strip out any prefixes from teh start of the string, then add them. This can be helpful for multiple prefixes and if we want to make sure they are used in the right order if an input includes some but not all
export type StripPrefixesAdd<
  Input extends string,
  Prefix extends string | string[],
  Fallback = never
> = IsStringNotEmpty<
  Input,
  _StripPrefixesAdd<Input, Prefix extends string ? [Prefix] : Prefix, Fallback>,
  Fallback
>;
