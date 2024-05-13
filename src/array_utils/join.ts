import type { IsNever, IsStringNotEmpty } from "../type_checks";
import { InsertBetween } from "./insert";

export type AddToString<Input extends string, ToAdd> = IsNever<
  ToAdd,
  1,
  0
> extends 0
  ? ToAdd extends string
    ? `${Input}${ToAdd}`
    : Input
  : Input;
// Join all words provided
type _Join<Words, Output extends string = ""> = Words extends string[]
  ? Words extends [infer Next, ...rest: infer Rest]
    ? _Join<Rest, AddToString<Output, Next>>
    : Output
  : Output;

export type JoinWords<Words extends string[]> = _Join<Words>;
// insert JoinWith between each word before joining
export type JoinWordsWith<
  Words extends string[],
  JoinWith extends string
> = IsStringNotEmpty<JoinWith, 1, 0> extends 1
  ? _Join<InsertBetween<Words, JoinWith>>
  : _Join<Words>;
