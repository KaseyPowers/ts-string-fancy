import { IfNotWrappedString } from "./upper_lower";

// taken from https://github.com/joonhocho/tsdef
// return True if T is `never`, otherwise return False
// wrap with array to prevent args distributing
export type IsNever<T, True, False = never> = [T] extends [never]
  ? True
  : False;

// taken from https://github.com/joonhocho/tsdef
// return True if T is `any`, otherwise return False
export type IsAny<T, True, False = never> = true | false extends (
  T extends never ? true : false
)
  ? True
  : False;
// If any, will return this type instead
export type CastString<Input> = IsAny<Input, string, Input>;

// Returns Str back if it's a string literal, otherwise returns Fallback
export type IfStringLiteral<Str, Fallback = never> = Str extends string
  ? string extends Str
    ? Fallback
    : Str
  : Fallback;

export type IsStringLiteral<Str, True, False = never> = IfStrictStringLiteral<
  Str,
  0
> extends 0
  ? False
  : True;
// Checks for string, and make sure it's not "";
export type IfStringNotEmpty<Val, Fallback = never> = Val extends string
  ? Val extends ""
    ? Fallback
    : Val
  : Fallback;
export type IsStringNotEmpty<Val, True, False = never> = IfStringNotEmpty<
  Val,
  0
> extends 0
  ? False
  : True;
// Returns Str only if it's a string literal and not "";
export type IfStrictStringLiteral<Str, Fallback = never> = IfStringNotEmpty<
  Str,
  1
> extends 1
  ? Fallback
  : IfStringLiteral<Str, Fallback>;

export type IsStrictStringLiteral<
  Str,
  True,
  False = never
> = IfStrictStringLiteral<Str, 0> extends 0 ? False : True;

export type IfStringLiteralNotWrapped<
  Str,
  Fallback = never
> = IfStrictStringLiteral<IfNotWrappedString<Str, Fallback>, Fallback>;

export type IfValidSeperators<Val, Fallback = never> = [Val] extends [string]
  ? IsStrictStringLiteral<Val, 1, 0> extends 1
    ? Val
    : [Val] extends [""]
    ? Val
    : Fallback
  : Fallback;
