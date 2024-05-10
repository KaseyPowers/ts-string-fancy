import type {
  IfStrictStringLiteral,
  IfStringNotEmpty,
  IsNever,
  CastString,
  IsStrictStringLiteral,
} from "../type_checks";
import { AsArray, TrimString } from "../common";
import { CommonSeperators } from "../basic_types";

// add to array if ToAdd extends string (and is not never)
export type AddStringToArr<Input extends string[], ToAdd> = IsNever<
  ToAdd,
  1,
  0
> extends 0
  ? ToAdd extends string
    ? [...Input, ToAdd]
    : Input
  : Input;

// push 1 ore more strings to the array
export type PushStringsToArr<
  Input,
  Current extends string[] = []
> = Input extends unknown[]
  ? Input extends [infer Next, ...rest: infer Rest]
    ? PushStringsToArr<Rest, AddStringToArr<Current, Next>>
    : Current
  : PushStringsToArr<AsArray<Input>, Current>;

// Filter input into an array of strings (just the push logic with an enforced empty array to push to)
export type FilterStrings<Input> = PushStringsToArr<Input>;

// Add to array if not never, while casting any to string
// needing to duplicate logic before doing the cast so that we can distribute the any as expected
export type AddCastStringToArr<Input extends string[], ToAdd> = IsNever<
  ToAdd,
  1,
  0
> extends 0
  ? ToAdd extends string
    ? [...Input, CastString<ToAdd>]
    : Input
  : Input;

// push 1 or more strings casted to string
export type PushCastStringsToArr<
  Input,
  Current extends string[] = []
> = Input extends unknown[]
  ? Input extends [infer Next, ...rest: infer Rest]
    ? PushCastStringsToArr<Rest, AddCastStringToArr<Current, Next>>
    : Current
  : PushCastStringsToArr<AsArray<Input>, Current>;

// Filter input into an array of strings (just the push logic with an enforced empty array to push to)
export type FilterAndCastStrings<Input> = PushCastStringsToArr<Input>;

// Add non-empty strings
export type AddNonEmptyStringToArr<
  Input extends string[],
  ToAdd
> = AddStringToArr<Input, IfStringNotEmpty<ToAdd>>;

export type PushNonEmptyStringsToArr<
  Input,
  Current extends string[] = []
> = Input extends unknown[]
  ? Input extends [infer Next, ...rest: infer Rest]
    ? PushNonEmptyStringsToArr<Rest, AddNonEmptyStringToArr<Current, Next>>
    : Current
  : PushNonEmptyStringsToArr<AsArray<Input>, Current>;

// Filter input into an array of strings (just the push logic with an enforced empty array to push to)
export type FilterNonEmptyStrings<Input> = PushNonEmptyStringsToArr<Input>;

// Add to array only if it's a non-empty string literal
export type AddStrictStringToArr<
  Input extends string[],
  ToAdd
> = AddStringToArr<Input, IfStrictStringLiteral<ToAdd>>;

// push 1 or more non-empty string literals
export type PushStrictStringsToArr<
  Input,
  Current extends string[] = []
> = Input extends unknown[]
  ? Input extends [infer Next, ...rest: infer Rest]
    ? PushStrictStringsToArr<Rest, AddStrictStringToArr<Current, Next>>
    : Current
  : PushStrictStringsToArr<AsArray<Input>, Current>;

// Filter input into an array of strings (just the push logic with an enforced empty array to push to)
export type FilterStrictStrings<Input> = PushStrictStringsToArr<Input>;

// Utils for using trim on strings as adding to the array
export type AddTrimmedStringToArr<
  Input extends string[],
  ToAdd,
  Seperator extends string = CommonSeperators
> = AddNonEmptyStringToArr<Input, TrimString<string & ToAdd, Seperator>>;

export type PushTrimmedStringsToArr<
  Input,
  Seperator extends string = CommonSeperators,
  Current extends string[] = []
> = Input extends unknown[]
  ? Input extends [infer Next, ...rest: infer Rest]
    ? PushTrimmedStringsToArr<
        Rest,
        Seperator,
        AddTrimmedStringToArr<Current, Next, Seperator>
      >
    : Current
  : PushTrimmedStringsToArr<AsArray<Input>, Seperator, Current>;

export type TrimAllStrings<
  Input,
  Seperator extends string = CommonSeperators
> = IsStrictStringLiteral<Seperator, 1, 0> extends 1
  ? PushTrimmedStringsToArr<Input, Seperator>
  : never;
