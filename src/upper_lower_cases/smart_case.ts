import { IsStringLiteral, IsNever, IsAny } from "../type_checks";
import { IfNotWrappedString } from "./case_checks";

/** Check for intrinsic string cases while also accounting for wrapped string types */

/** Check for capitalized strings, but also catch Uppercase<string> type since it would return true if a deep literal */
export type IsCapitalized<
  Str,
  True,
  False = never
> = Str extends Capitalize<string>
  ? True
  : Str extends Uppercase<string>
  ? True
  : False;

export type IsUncapitalized<
  Str,
  True,
  False = never
> = Str extends Uncapitalize<string>
  ? True
  : Str extends Lowercase<string>
  ? True
  : False;

// Upper/Lowercase doesn't need the secondary checks
export type IsUppercase<
  Str,
  True,
  False = never
> = Str extends Uppercase<string> ? True : False;
export type IsLowercase<
  Str,
  True,
  False = never
> = Str extends Lowercase<string> ? True : False;

// this infer will return string for Capitalize<string> (even if string is a pure literal), but will return the inner value if stacked ex. Capitalize<Lowercase<string>>
type _RemoveCapitalizeWrap<T> = IsNever<T, 1, 0> extends 1
  ? T
  : T extends Capitalize<infer Inner>
  ? 1 extends IsAny<Inner, 1, 0> | IsStringLiteral<Inner, 1, 0>
    ? Inner
    : Capitalize<string> extends T // This will return true for strings (and similar like `any`) and shallow wrapped Capitalize<string>
    ? string
    : T
  : T;

export type IsWrappedCapitalize<
  T,
  True,
  False = never
> = _RemoveCapitalizeWrap<T> extends T ? False : True;

type _RemoveUncapitalizeWrap<T> = T extends Uncapitalize<infer Inner>
  ? IsStringLiteral<Inner, 1, 0> extends 1
    ? Inner
    : Uncapitalize<string> extends T
    ? string
    : T
  : T;

export type IsWrappedUncapitalize<
  T,
  True,
  False = never
> = _RemoveUncapitalizeWrap<T> extends T ? False : True;

type _RemoveUppercaseWrap<T> = T extends Uppercase<infer Inner>
  ? IsStringLiteral<Inner, 1, 0> extends 1
    ? Inner
    : Uppercase<string> extends T
    ? string
    : T
  : T;

export type IsWrappedUppercase<
  T,
  True,
  False = never
> = _RemoveUppercaseWrap<T> extends T ? False : True;

type _RemoveLowercaseWrap<T> = T extends Lowercase<infer Inner>
  ? IsStringLiteral<Inner, 1, 0> extends 1
    ? Inner
    : Lowercase<string> extends T
    ? string
    : T
  : T;

export type IsWrappedLowercase<
  T,
  True,
  False = never
> = _RemoveLowercaseWrap<T> extends T ? False : True;

/**
 * NOTE: Smart<> casing here only works for directly wrapped strings, Mixing literals and wraps won't do anything yet.
 * Ex. Capitalize<Lowercase<`${string}123`>> becomes `${Capitalize<Lowercase<string>}123`, which the simple checks don't do
 *
 * For "Extra" smart versions, we will need to mix in the fullSplit + join behavior from the array utils
 *
 */

// If the string isn't capitalized (by above logic), capitalize it, while also checking for and avoiding stacking on Uncapitalize<string>
export type SmartCapitalize<Str extends string> = IsCapitalized<
  Str,
  1,
  0
> extends 1
  ? Str
  : IsWrappedUncapitalize<Str, 1, 0> extends 1
  ? SmartCapitalize<_RemoveUncapitalizeWrap<Str>>
  : Capitalize<Str>;

// Uncapitalize the input, but check for wrapped strings to prevent unnecisary stacking
export type SmartUncapitalize<Str extends string> = IsUncapitalized<
  Str,
  1,
  0
> extends 1
  ? Str
  : IsWrappedCapitalize<Str, 1, 0> extends 1
  ? SmartUncapitalize<_RemoveCapitalizeWrap<Str>>
  : Uncapitalize<Str>;

// will drop the wrapping from any wrapped cases before uppercasing, since Uppercase would override all others
export type SmartUppercase<Str extends string> = IsUppercase<
  Str,
  Str,
  Uppercase<IfNotWrappedString<Str, string>>
>;

export type SmartLowercase<Str extends string> = IsLowercase<
  Str,
  Str,
  Lowercase<IfNotWrappedString<Str, string>>
>;

// type TestBulk<T> = {
//   val: T;
//   isCap: IsCapitalized<T, true, false>;
//   isUncap: IsUncapitalized<T, true, false>;
//   isUp: IsUppercase<T, true, false>;
//   isLow: IsLowercase<T, true, false>;
//   isWrappedCap: IsWrappedCapitalize<T, true, false>;
//   isWrappedUncap: IsWrappedUncapitalize<T, true, false>;
//   isWrappedUpper: IsWrappedUppercase<T, true, false>;
//   isWrappedLower: IsWrappedLowercase<T, true, false>;
//   isWrappedString: IsWrappedString<T, true, false>;
//   smartCap: SmartCapitalize<string & T>;
//   smartUncap: SmartUncapitalize<string & T>;
//   smartUp: SmartUppercase<string & T>;
//   smartLow: SmartLowercase<string & T>;
// };

// type test1 = TestBulk<string>;
// type test2 = TestBulk<"string">;
// type test3 = TestBulk<Capitalize<string>>;
// type test3_2 = TestBulk<string & Lowercase<string>>;
// type test4 = TestBulk<Capitalize<Lowercase<`abc${string}123`>>>;
// type test5 = TestBulk<Uppercase<string> | Capitalize<string>>;
