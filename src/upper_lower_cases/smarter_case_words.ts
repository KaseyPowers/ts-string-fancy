import { AsArray } from "../common";
import type { AddStringToArr } from "../array_utils";
import type {
  SmarterCapitalize,
  SmarterUncapitalize,
  SmarterUppercase,
  SmarterLowercase,
} from "./smarter_case";

// internal function, rebuilds array of values but capitalizing each string
type _CapitalizeWords<
  Input,
  Current extends string[] = []
> = Input extends unknown[]
  ? Input extends [infer Next, ...rest: infer Rest]
    ? _CapitalizeWords<
        Rest,
        AddStringToArr<Current, SmarterCapitalize<string & Next>>
      >
    : Current
  : _CapitalizeWords<AsArray<Input>, Current>;

type _UncapitalizeWords<
  Input,
  Current extends string[] = []
> = Input extends unknown[]
  ? Input extends [infer Next, ...rest: infer Rest]
    ? _UncapitalizeWords<
        Rest,
        AddStringToArr<Current, SmarterUncapitalize<string & Next>>
      >
    : Current
  : _UncapitalizeWords<AsArray<Input>, Current>;

type _UppercaseWords<
  Input,
  Current extends string[] = []
> = Input extends unknown[]
  ? Input extends [infer Next, ...rest: infer Rest]
    ? _UppercaseWords<
        Rest,
        AddStringToArr<Current, SmarterUppercase<string & Next>>
      >
    : Current
  : _UppercaseWords<AsArray<Input>, Current>;

type _LowercaseWords<
  Input,
  Current extends string[] = []
> = Input extends unknown[]
  ? Input extends [infer Next, ...rest: infer Rest]
    ? _LowercaseWords<
        Rest,
        AddStringToArr<Current, SmarterLowercase<string & Next>>
      >
    : Current
  : _LowercaseWords<AsArray<Input>, Current>;

// capitalize each word
export type SmarterCapitalizeWords<Vals extends string[]> = _CapitalizeWords<
  Vals,
  []
>;
export type SmarterUncapitalizeWords<Vals extends string[]> =
  _UncapitalizeWords<Vals, []>;
export type SmarterUppercaseWords<Vals extends string[]> = _UppercaseWords<
  Vals,
  []
>;
export type SmarterLowercaseWords<Vals extends string[]> = _LowercaseWords<
  Vals,
  []
>;

export type SmarterCapitalizeAfterFirst<Vals extends string[]> = Vals extends [
  infer First,
  ...rest: infer Rest
]
  ? [string & First, ..._CapitalizeWords<Rest, []>]
  : Vals;

export type SmarterCamelCaseWords<Vals extends string[]> = Vals extends [
  infer First,
  ...rest: infer Rest
]
  ? [SmarterUncapitalize<First & string>, ..._CapitalizeWords<Rest, []>]
  : [];
