import type { AllSeperatorsDefault } from "./basic_types";
import type { AddNonEmptyString, TrimAddString } from "./string_array";
import type {
  IsStrictStringLiteral,
  IsAny,
  IsStringNotEmpty,
  IfValidSeperators,
} from "./type_checks";

// wrapped type check to convert type to an array if it's not already. Added Any check, so that any only becomes [any] and not `any | [any]` which won't play nice with cyclicle types
export type AsArray<T> = IsAny<T, 1, 0> extends 0
  ? T extends unknown[]
    ? T
    : [T]
  : [T];
// remove from the string each instance of the seperator(s) from the start and end of the string literal
export type TrimString<
  Str extends string,
  Seperator extends string = AllSeperatorsDefault
> = IsStrictStringLiteral<Seperator, 1, 0> extends 0
  ? Str
  : Str extends `${Seperator}${infer InnerStr}`
  ? TrimString<InnerStr, Seperator>
  : Str extends `${infer InnerStr}${Seperator}`
  ? TrimString<InnerStr, Seperator>
  : Str;

export type IfStringTrimmed<
  Str extends string,
  Seperator extends string = AllSeperatorsDefault,
  Fallback = never
> = TrimString<Str, Seperator> extends Str ? Str : Fallback;
export type IsStringTrimmed<
  Str extends string,
  True,
  False = never,
  Seperator extends string = AllSeperatorsDefault
> = IfStringTrimmed<Str, Seperator, 1> extends 1 ? True : False;

type _Split<
  Input extends string,
  Seperator extends string,
  Current extends string[] = []
> = Input extends `${infer Next}${Seperator}${infer Rest}`
  ? IsStringNotEmpty<Rest, 1, 0> extends 1
    ? _Split<Rest, Seperator, TrimAddString<Current, Next, Seperator>>
    : TrimAddString<Current, Next, Seperator>
  : AddNonEmptyString<Current, Input>;

export type SplitString<
  In extends string,
  Seperator extends string = AllSeperatorsDefault
> = IfValidSeperators<Seperator, 0> extends 0
  ? never
  : _Split<TrimString<In, Seperator>, Seperator, []>;
