import type { IsStringNotEmpty } from "../type_checks";
import type { AddNonEmptyStringToArr } from "./builders";

type _Split<
  Input extends string,
  Current extends string[] = []
> = Input extends `${infer Next}${infer Rest}`
  ? IsStringNotEmpty<Rest, 1, 0> extends 1
    ? _Split<Rest, AddNonEmptyStringToArr<Current, Next>>
    : AddNonEmptyStringToArr<Current, Next>
  : AddNonEmptyStringToArr<Current, Input>;

// Splits the string into it's smallest pieces
export type FullSplit<In extends string> = _Split<In>;
