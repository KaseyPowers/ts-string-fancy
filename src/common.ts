import type { CommonSeperators } from "./basic_types";
import type { IsStrictStringLiteral, IsAny } from "./type_checks";

// wrapped type check to convert type to an array if it's not already. Added Any check, so that any only becomes [any] and not `any | [any]` which won't play nice with cyclicle types
export type AsArray<T> = IsAny<T, 1, 0> extends 0
  ? T extends unknown[]
    ? T
    : [T]
  : [T];

// export type ArrayToUnionFancy<Input extends unknown[], Output> = Input extends [infer Next, ...rest: infer Rest]

// remove from the string each instance of the seperator(s) from the start and end of the string literal
type _Trim<
  Str extends string,
  Seperator extends string
> = Str extends `${Seperator}${infer InnerStr}`
  ? _Trim<InnerStr, Seperator>
  : Str extends `${infer InnerStr}${Seperator}`
  ? _Trim<InnerStr, Seperator>
  : Str;

export type TrimString<
  Str extends string,
  Seperator extends string = CommonSeperators
> = IsStrictStringLiteral<Seperator, 1, 0> extends 0
  ? Str
  : _Trim<Str, Seperator>;

export type IfStringTrimmed<
  Str extends string,
  Seperator extends string = CommonSeperators,
  Fallback = never
> = TrimString<Str, Seperator> extends Str ? Str : Fallback;

export type IsStringTrimmed<
  Str extends string,
  True,
  False = never,
  Seperator extends string = CommonSeperators
> = IfStringTrimmed<Str, Seperator, 1> extends 1 ? False : True;

// type TestVal = "";
// type TestSeperator = CommonSeperators;

// type testTrim = TrimString<TestVal, TestSeperator>;
// type testIfTrimmed = IfStringTrimmed<TestVal, TestSeperator, 1> extends 1 ? "yes" : "No";
// type testIsTrimmed = IsStringTrimmed<TestVal, true, false, TestSeperator>;
