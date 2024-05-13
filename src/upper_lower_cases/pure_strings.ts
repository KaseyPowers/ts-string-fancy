import type { IfStringNotEmpty, IsNever } from "../type_checks";
import {
  IfNotWrappedString,
  IfStringLiteralNotWrapped,
  IfWrappedString,
  IsWrappedString,
} from "./case_checks";
import {
  WordsAsUnion,
  FullSplit,
  JoinWords,
  AddStringToArr,
} from "../array_utils";
import { AsArray } from "../common";

export type FindWrappersAsUnion<Str> = Str extends string
  ? IfWrappedString<WordsAsUnion<FullSplit<Str>>>
  : never;

type AddNonWrappedString<Input extends string[], ToAdd> = IsWrappedString<
  ToAdd,
  1,
  0
> extends 0
  ? AddStringToArr<Input, ToAdd>
  : Input;

type PushNonWrappedStrings<
  Input,
  Output extends string[] = []
> = Input extends unknown[]
  ? Input extends [infer Next, ...rest: infer Rest]
    ? PushNonWrappedStrings<Rest, AddNonWrappedString<Output, Next>>
    : Output
  : PushNonWrappedStrings<AsArray<Input>, Output>;

type FilterWrappedStrings<Input> = PushNonWrappedStrings<Input>;

export type StripOutWrappedStrings<Str> = Str extends string
  ? JoinWords<FilterWrappedStrings<FullSplit<Str>>>
  : never;

export type IsPureStringLiteral<Str, True, False = never> = IsNever<
  FindWrappersAsUnion<Str>,
  True,
  False
>;

export type IfPureStringLiteral<Str, Fallback = never> = Str extends string
  ? IsPureStringLiteral<Str, Str, Fallback>
  : Fallback;

export type IfStrictPureStringLiteral<
  Str,
  Fallback = never
> = Str extends string
  ? 1 extends IfStringNotEmpty<Str, 1>
    ? Fallback
    : IfPureStringLiteral<Str, Fallback>
  : Fallback;

export type IsStrictPureStringLiteral<
  Str,
  True,
  False = never
> = 1 extends IfStrictPureStringLiteral<Str, 1> ? False : True;

// to test an array of words, we just join them into one word before testing that word (since the pureString test splits into characters anyway)
export type IsWordsPureStringLiterals<
  Words,
  True,
  False = never
> = Words extends string[]
  ? IsPureStringLiteral<JoinWords<Words>, True, False>
  : False;

// for strict checks, we need to check each word individually, so convert the array to a union first
export type IsWordsStrictPureStringLiterals<Words, True, False> =
  Words extends string[]
    ? IsStrictPureStringLiteral<WordsAsUnion<Words>, True, False>
    : False;
