import { CommonSeperators, SpaceSeperator } from "../basic_types";
import { IsStrictStringLiteral } from "../type_checks";
import { PushStringsToArr } from "./builders";
import { SplitByCase, PushSplitByCase } from "./split_case";
import { SplitBySeperator, PushSplitBySeperator } from "./split_seperators";
import { AsArray } from "../common";

// Simple Util, splits on spaces
export type SplitWords<Input> = SplitBySeperator<Input, SpaceSeperator>;
export type PushSplitWords<Input> = PushSplitBySeperator<Input, SpaceSeperator>;

// Will always split by case, and will split by seperator first if there is a valid seperator
export type Split<Input, Seperators = CommonSeperators> = Input extends string
  ? IsStrictStringLiteral<Seperators, 1, 0> extends 1
    ? PushSplitByCase<SplitBySeperator<Input, string & Seperators>>
    : SplitByCase<Input>
  : never;

export type PushSplit<
  Input,
  Seperators = CommonSeperators,
  Current extends string[] = []
> = Input extends unknown[]
  ? Input extends [infer Next, ...rest: infer Rest]
    ? PushSplit<
        Rest,
        Seperators,
        PushStringsToArr<Split<Next, Seperators>, Current>
      >
    : Current
  : PushSplit<AsArray<Input>, Seperators, Current>;
