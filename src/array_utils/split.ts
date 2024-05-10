import type { CommonSeperators, SpaceSeperator } from "../basic_types";
import type {
  IsStringNotEmpty,
  IsStrictStringLiteral,
  IsNever,
  IsStringContaining,
} from "../type_checks";
import type {
  AddTrimmedStringToArr,
  AddNonEmptyStringToArr,
  TrimAllStrings,
  PushStringsToArr,
} from "./builders";
import type { AsArray, IsStringTrimmed, TrimString } from "../common";
import { AddToString, CombineByUpper, Join } from "./join";

type _Split<
  Input extends string,
  Current extends string[] = []
> = Input extends `${infer Next}${infer Rest}`
  ? IsStringNotEmpty<Rest, 1, 0> extends 1
    ? _Split<Rest, AddNonEmptyStringToArr<Current, Next>>
    : AddTrimmedStringToArr<Current, Next>
  : AddNonEmptyStringToArr<Current, Input>;
export type FullSplit<In extends string> = _Split<In>;

// split and recombine to get string split by any Uppercase
type _SplitByUpper<In> = In extends string ? CombineByUpper<FullSplit<In>> : [];
// Like the Push types in builders, but with logic to splitByUpper before combining. Internal since I don't think there is a reason to use directly?
type _PushSplitByUpper<
  Input,
  Current extends string[] = []
> = Input extends unknown[]
  ? Input extends [infer Next, ...rest: infer Rest]
    ? _PushSplitByUpper<Rest, PushStringsToArr<_SplitByUpper<Next>, Current>>
    : Current
  : _PushSplitByUpper<AsArray<Input>, Current>;

// Recombine a FullSplit string but keep words seperated by the seperators keys
type _RecombineBySeperator<
  Parts extends string[],
  Seperators extends string,
  Pending extends string,
  Output extends string[]
> = IsStringContaining<Pending, Seperators, 1, 0> extends 1
  ? _RecombineBySeperator<
      Parts,
      Seperators,
      "",
      AddTrimmedStringToArr<Output, Pending, Seperators>
    >
  : Parts extends [infer Next, ...rest: infer Rest]
  ? Rest extends string[]
    ? _RecombineBySeperator<
        Rest,
        Seperators,
        AddToString<Pending, Next>,
        Output
      >
    : AddTrimmedStringToArr<Output, Pending, Seperators>
  : AddTrimmedStringToArr<Output, Pending, Seperators>;

export type SplitBySeperator<
  Input extends string,
  Seperators extends string = CommonSeperators
> = IsStrictStringLiteral<Seperators, 1, 0> extends 1
  ? _RecombineBySeperator<FullSplit<Input>, Seperators, "", []>
  : never;
