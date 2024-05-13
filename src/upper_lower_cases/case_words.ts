import type { AddStringToArr } from "../array_utils";
import { AsArray } from "../common";
// internal function, rebuilds array of values but capitalizing each string
type _CapitalizeWords<
  Input,
  Current extends string[] = []
> = Input extends unknown[]
  ? Input extends [infer Next, ...rest: infer Rest]
    ? _CapitalizeWords<Rest, AddStringToArr<Current, Capitalize<string & Next>>>
    : Current
  : _CapitalizeWords<AsArray<Input>, Current>;

type _UncapitalizeWords<
  Input,
  Current extends string[] = []
> = Input extends unknown[]
  ? Input extends [infer Next, ...rest: infer Rest]
    ? _UncapitalizeWords<
        Rest,
        AddStringToArr<Current, Uncapitalize<string & Next>>
      >
    : Current
  : _UncapitalizeWords<AsArray<Input>, Current>;

type _UppercaseWords<
  Input,
  Current extends string[] = []
> = Input extends unknown[]
  ? Input extends [infer Next, ...rest: infer Rest]
    ? _UppercaseWords<Rest, AddStringToArr<Current, Uppercase<string & Next>>>
    : Current
  : _UppercaseWords<AsArray<Input>, Current>;

type _LowercaseWords<
  Input,
  Current extends string[] = []
> = Input extends unknown[]
  ? Input extends [infer Next, ...rest: infer Rest]
    ? _LowercaseWords<Rest, AddStringToArr<Current, Lowercase<string & Next>>>
    : Current
  : _LowercaseWords<AsArray<Input>, Current>;

// capitalize each word
export type CapitalizeWords<Vals extends string[]> = _CapitalizeWords<Vals, []>;
export type UncapitalizeWords<Vals extends string[]> = _UncapitalizeWords<
  Vals,
  []
>;
export type UppercaseWords<Vals extends string[]> = _UppercaseWords<Vals, []>;
export type LowercaseWords<Vals extends string[]> = _LowercaseWords<Vals, []>;

export type CamelCaseWords<Vals extends string[]> = Vals extends [
  infer First,
  ...rest: infer Rest
]
  ? [Uncapitalize<First & string>, _CapitalizeWords<Rest, []>]
  : [];
