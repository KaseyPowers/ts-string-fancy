import type { AddNonEmptyStringToArr, PushStringsToArr } from "./builders";
import { IsCapitalized, IsUppercase } from "../upper_lower_cases";
import { AddToString } from "./join";
import { FullSplit } from "./split_full";
import { AsArray } from "../common";

/**
 * How this works:
 * iterating through Parts (expect to be a FullSplit string)
 * If the next character is capitalized (or uppercase in IsCapitalized check) AND the pending string is not uppercase
 *   - IsUppercase will return true for an empty string or any string that doesn't include a-z
 */
type _CombineByUpper<
  Parts extends string[],
  Pending extends string,
  Output extends string[]
> = Parts extends [infer Next, ...rest: infer Rest]
  ? Rest extends string[]
    ? IsCapitalized<Next, 1, 0> | IsUppercase<Pending, 0, 1> extends 1
      ? _CombineByUpper<
          Rest,
          AddToString<"", Next>,
          AddNonEmptyStringToArr<Output, Pending>
        >
      : _CombineByUpper<Rest, AddToString<Pending, Next>, Output>
    : AddNonEmptyStringToArr<Output, Pending>
  : AddNonEmptyStringToArr<Output, Pending>;

type CombineByUpper<Input extends string[]> = _CombineByUpper<Input, "", []>;

export type SplitByCase<Input> = Input extends string
  ? CombineByUpper<FullSplit<Input>>
  : never;

export type PushSplitByCase<
  Input,
  Current extends string[] = []
> = Input extends unknown[]
  ? Input extends [infer Next, ...rest: infer Rest]
    ? PushSplitByCase<Rest, PushStringsToArr<SplitByCase<Next>, Current>>
    : Current
  : PushSplitByCase<AsArray<Input>, Current>;
