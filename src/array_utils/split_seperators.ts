import type { CommonSeperators } from "../basic_types";
import { AsArray } from "../common";
import type { IsStrictStringLiteral, IsStringContaining } from "../type_checks";
import type { AddTrimmedStringToArr, PushStringsToArr } from "./builders";
import { AddToString } from "./join";
import { FullSplit } from "./split_full";

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
  Input,
  Seperators extends string = CommonSeperators
> = Input extends string
  ? IsStrictStringLiteral<Seperators, 1, 0> extends 1
    ? _RecombineBySeperator<FullSplit<Input>, Seperators, "", []>
    : never
  : never;

export type PushSplitBySeperator<
  Input,
  Seperators extends string = CommonSeperators,
  Current extends string[] = []
> = Input extends unknown[]
  ? Input extends [infer Next, ...rest: infer Rest]
    ? PushSplitBySeperator<
        Rest,
        Seperators,
        PushStringsToArr<SplitBySeperator<Next, Seperators>, Current>
      >
    : Current
  : PushSplitBySeperator<AsArray<Input>, Seperators, Current>;
