import type {
  IfStrictStringLiteral,
  IfStringNotEmpty,
  IsNever,
  CastString,
} from "./type_checks";
import { AsArray, TrimString } from "./common";
import { AllSeperatorsDefault } from "./basic_types";

// add to array if ToAdd extends string (and is not never)
export type AddString<Input extends string[], ToAdd> = IsNever<
  ToAdd,
  1,
  0
> extends 0
  ? ToAdd extends string
    ? [...Input, ToAdd]
    : Input
  : Input;
// Add to array if not never, while casting any to string
// needing to duplicate logic before doing the cast so that we can distribute the any as expected
export type AddStringCast<Input extends string[], ToAdd> = IsNever<
  ToAdd,
  1,
  0
> extends 0
  ? ToAdd extends string
    ? [...Input, CastString<ToAdd>]
    : Input
  : Input;

// Add non-empty strings
export type AddNonEmptyString<Input extends string[], ToAdd> = AddString<
  Input,
  IfStringNotEmpty<ToAdd>
>;
// Add to array only if it's a non-empty string literal
export type StrictAddString<Input extends string[], ToAdd> = AddString<
  Input,
  IfStrictStringLiteral<ToAdd>
>;

export type TrimAddString<
  Input extends string[],
  ToAdd,
  Seperator extends string = AllSeperatorsDefault
> = AddNonEmptyString<Input, TrimString<string & ToAdd, Seperator>>;

// push 1 ore more strings to the array
export type PushStrings<
  Input,
  Current extends string[] = []
> = Input extends unknown[]
  ? Input extends [infer Next, ...rest: infer Rest]
    ? PushStrings<Rest, AddString<Current, Next>>
    : Current
  : PushStrings<AsArray<Input>, Current>;

// Filter input into an array of strings (just the push logic with an enforced empty array to push to)
export type FilterStrings<Input> = PushStrings<Input>;

// push 1 or more strings casted to string
export type PushCastedStrings<
  Input,
  Current extends string[] = []
> = Input extends unknown[]
  ? Input extends [infer Next, ...rest: infer Rest]
    ? PushCastedStrings<Rest, AddStringCast<Current, Next>>
    : Current
  : PushCastedStrings<AsArray<Input>, Current>;

// Filter input into an array of strings (just the push logic with an enforced empty array to push to)
export type FilterAndCastStrings<Input> = PushCastedStrings<Input>;

export type PushNonEmptyStrings<
  Input,
  Current extends string[] = []
> = Input extends unknown[]
  ? Input extends [infer Next, ...rest: infer Rest]
    ? PushNonEmptyStrings<Rest, AddNonEmptyString<Current, Next>>
    : Current
  : PushNonEmptyStrings<AsArray<Input>, Current>;

// Filter input into an array of strings (just the push logic with an enforced empty array to push to)
export type FilterNonEmptyStrings<Input> = PushNonEmptyStrings<Input>;

// push 1 or more non-empty string literals
export type StrictPushStrings<
  Input,
  Current extends string[] = []
> = Input extends unknown[]
  ? Input extends [infer Next, ...rest: infer Rest]
    ? StrictPushStrings<Rest, StrictAddString<Current, Next>>
    : Current
  : StrictPushStrings<AsArray<Input>, Current>;

// Filter input into an array of strings (just the push logic with an enforced empty array to push to)
export type FilterStrictStrings<Input> = StrictPushStrings<Input>;
