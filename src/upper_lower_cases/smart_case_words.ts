import type { AsArray } from "../common";
import type { AddStringToArr } from "../array_utils";
import type {
  SmartCapitalize,
  SmartUncapitalize,
  SmartUppercase,
  SmartLowercase,
} from "./smart_case";
// internal function, rebuilds array of values but capitalizing each string
type _CapitalizeWords<
  Input,
  Current extends string[] = []
> = Input extends unknown[]
  ? Input extends [infer Next, ...rest: infer Rest]
    ? _CapitalizeWords<
        Rest,
        AddStringToArr<Current, SmartCapitalize<string & Next>>
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
        AddStringToArr<Current, SmartUncapitalize<string & Next>>
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
        AddStringToArr<Current, SmartUppercase<string & Next>>
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
        AddStringToArr<Current, SmartLowercase<string & Next>>
      >
    : Current
  : _LowercaseWords<AsArray<Input>, Current>;

// capitalize each word
export type SmartCapitalizeWords<Vals extends string[]> = _CapitalizeWords<
  Vals,
  []
>;
export type SmartUncapitalizeWords<Vals extends string[]> = _UncapitalizeWords<
  Vals,
  []
>;
export type SmartUppercaseWords<Vals extends string[]> = _UppercaseWords<
  Vals,
  []
>;
export type SmartLowercaseWords<Vals extends string[]> = _LowercaseWords<
  Vals,
  []
>;

export type SmartCamelCaseWords<Vals extends string[]> = Vals extends [
  infer First,
  ...rest: infer Rest
]
  ? [SmartUncapitalize<First & string>, _CapitalizeWords<Rest, []>]
  : [];
