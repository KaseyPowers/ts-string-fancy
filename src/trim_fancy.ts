import type {
  IsStrictStringLiteralNotWrapped,
  SmarterLowercase,
} from "./upper_lower_cases";
import type {
  IsStringEndsWith,
  IsStringStartsWith,
  StringsMatch,
} from "./type_checks";
import { AddToString, FullSplit } from "./array_utils";
import { CommonSeperators } from "./basic_types";

// Expect a full split string for parts, expect seperator to be validated and smarterLowercased already
// add to the output, and if the output (as full lowercase) matches a seperator, reset it to empty
type _BuildTrimmedStart<
  Parts extends string[],
  Seperator extends string,
  Output extends string
> = StringsMatch<SmarterLowercase<Output>, Seperator, 1, 0> extends 1
  ? _BuildTrimmedStart<Parts, Seperator, "">
  : Parts extends [infer Next, ...rest: infer Rest]
  ? Rest extends string[]
    ? _BuildTrimmedStart<Rest, Seperator, AddToString<Output, Next>>
    : Output
  : Output;
// after ToRemove has been validated and smartLowercased
type _BuildStartIfValid<
  Input extends string,
  ToRemove extends string
> = IsStringStartsWith<SmarterLowercase<Input>, ToRemove, 1, 0> extends 1
  ? _BuildTrimmedStart<FullSplit<Input>, ToRemove, "">
  : Input;

export type FancyTrimStart<
  Input extends string,
  ToRemove extends string = CommonSeperators
> = IsStrictStringLiteralNotWrapped<ToRemove, 1, 0> extends 1
  ? _BuildStartIfValid<Input, SmarterLowercase<ToRemove>>
  : never;

// Expect a full split string for parts, expect seperator to be validated and smarterLowercased already
// add to the output, and if the output (as full lowercase) matches a seperator, reset it to empty
type _BuildTrimmedEnd<
  Parts extends string[],
  Seperator extends string,
  Output extends string
> = StringsMatch<SmarterLowercase<Output>, Seperator, 1, 0> extends 1
  ? _BuildTrimmedStart<Parts, Seperator, "">
  : Parts extends [...start: infer Start, infer Last]
  ? Start extends string[]
    ? _BuildTrimmedStart<Start, Seperator, AddToString<Output, Last>>
    : Output
  : Output;

type _BuildEndIfValid<
  Input extends string,
  ToRemove extends string
> = IsStringEndsWith<SmarterLowercase<Input>, ToRemove, 1, 0> extends 1
  ? _BuildTrimmedEnd<FullSplit<Input>, ToRemove, "">
  : Input;

export type FancyTrimEnd<
  Input extends string,
  ToRemove extends string = CommonSeperators
> = IsStrictStringLiteralNotWrapped<ToRemove, 1, 0> extends 1
  ? _BuildEndIfValid<Input, SmarterLowercase<ToRemove>>
  : never;

// stack the main inner logic, stripping the start and then end (if it's possible to do both simultaniously, I imagine it would be too complicated to be readable)
// Is an inner function so we can assume lowercased toRemove and only do that once
type _FancyTrimString<
  Input extends string,
  ToRemove extends string
> = _BuildEndIfValid<_BuildStartIfValid<Input, ToRemove>, ToRemove>;

export type FancyTrimString<
  Input extends string,
  ToRemove extends string = CommonSeperators
> = IsStrictStringLiteralNotWrapped<ToRemove, 1, 0> extends 1
  ? _FancyTrimString<Input, SmarterLowercase<ToRemove>>
  : never;
