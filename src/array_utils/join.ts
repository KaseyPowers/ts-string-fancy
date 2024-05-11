import type { IsNever } from "../type_checks";

export type AddToString<Input extends string, ToAdd> = IsNever<
  ToAdd,
  1,
  0
> extends 0
  ? ToAdd extends string
    ? `${Input}${ToAdd}`
    : Input
  : Input;

export type AddToStringWith<
  Input extends string,
  ToAdd,
  Seperator extends string = " "
> = AddToString<AddToString<Input, Seperator>, ToAdd>;

type _Join<
  Words extends string[],
  Seperator extends string,
  Current extends string = ""
> = Words extends [infer Next, ...rest: infer Rest]
  ? Rest extends string[]
    ? _Join<Rest, Seperator, AddToStringWith<Current, Next, Seperator>>
    : Current
  : Current;

export type JoinStrings<
  Words extends string[],
  Seperator extends string = " "
> = _Join<Words, Seperator>;
