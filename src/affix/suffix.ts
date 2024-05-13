import { IsStringNotEmpty } from "../type_checks";
import { AddToString, JoinWords, WordsAsUnion } from "../array_utils";
// import { TrimStringEnd } from "../trim";
import { FancyTrimEnd } from "../trim_fancy";
import {
  SmarterCapitalize,
  SmarterCapitalizeAfterFirst,
  IsStrictPureStringLiteral,
  IsWordsStrictPureStringLiterals,
} from "../upper_lower_cases";

export type AddSuffix<
  Input extends string,
  Suffix extends string,
  Fallback = never
> = IsStrictPureStringLiteral<
  Suffix,
  IsStringNotEmpty<Input, AddToString<Input, Suffix>, Fallback>,
  Fallback
>;

export type AddSuffixCase<
  Input extends string,
  Suffix extends string,
  Fallback = never
> = AddSuffix<Input, SmarterCapitalize<Suffix>, Fallback>;

export type AddSuffixes<
  Input extends string,
  Suffixes extends string[],
  Fallback = never
> = IsStringNotEmpty<
  Input,
  IsWordsStrictPureStringLiterals<
    Suffixes,
    JoinWords<SmarterCapitalizeAfterFirst<[Input, ...Suffixes]>>,
    Fallback
  >,
  Fallback
>;

type _StripSuffixesAdd<
  Input extends string,
  Suffixes extends string[],
  Fallback = never
> = IsWordsStrictPureStringLiterals<
  Suffixes,
  AddSuffixes<FancyTrimEnd<Input, WordsAsUnion<Suffixes>>, Suffixes, Fallback>,
  Fallback
>;

export type StripSuffixesAdd<
  Input extends string,
  Suffix extends string | string[],
  Fallback = never
> = IsStringNotEmpty<
  Input,
  _StripSuffixesAdd<Input, Suffix extends string ? [Suffix] : Suffix, Fallback>,
  Fallback
>;
