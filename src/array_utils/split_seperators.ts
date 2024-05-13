import type { CommonSeperators } from "../basic_types";
import { AsArray } from "../common";
import type { IsStrictStringLiteral, IsStringContaining } from "../type_checks";
import type { AddTrimmedStringToArr, PushStringsToArr } from "./builders";
import { AddToString } from "./join";
import { FullSplit } from "./split_full";

// Expect Input to be a full-split string, then slowly add the string back together until we get a pending string that contains the sperators, when we do, try adding it to the output (AddTrimmeString utility will not add it if the end result is an empty string)
// Also expect seperators to be validated as strings that will work here
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

// expect Seperators to be validated, but will validate input
type _SplitBySeperator<Input, Seperators extends string> = Input extends string
  ? _RecombineBySeperator<FullSplit<Input>, Seperators, "", []>
  : never;

export type SplitBySeperator<
  Input,
  Seperators extends string = CommonSeperators
> = IsStrictStringLiteral<Seperators, 1, 0> extends 1
  ? _SplitBySeperator<Input, Seperators>
  : never;

// expect seperators to be validated before this
type _PushSplitBySeperator<
  Input,
  Seperators extends string,
  Current extends string[]
> = Input extends unknown[]
  ? Input extends [infer Next, ...rest: infer Rest]
    ? _PushSplitBySeperator<
        Rest,
        Seperators,
        PushStringsToArr<SplitBySeperator<Next, Seperators>, Current>
      >
    : Current
  : _PushSplitBySeperator<AsArray<Input>, Seperators, Current>;

export type PushSplitBySeperator<
  Input,
  Seperators extends string = CommonSeperators,
  Current extends string[] = []
> = IsStrictStringLiteral<Seperators, 1, 0> extends 1
  ? _PushSplitBySeperator<Input, Seperators, Current>
  : never;
