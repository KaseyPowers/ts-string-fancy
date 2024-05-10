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

export type IsStringLiteral<
  Str,
  True,
  False = never
> = 0 extends IfStrictStringLiteral<Str, 0> ? False : True;
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
export type IfStrictStringLiteral<Str, Fallback = never> = Str extends string
  ? IfStringNotEmpty<Str, 1> extends 1
    ? Fallback
    : IfStringLiteral<Str, Fallback>
  : Fallback;

export type IsStrictStringLiteral<
  Str,
  True,
  False = never
> = 0 extends IfStrictStringLiteral<Str, 0> ? False : True;

/**
 * IsMaybeWrapped<> will return true if T is the wrapped value OR `string` (or `any` or `unknown`)
 */
export type IsMaybeWrappedCapitalize<
  T,
  True,
  False = never
> = Capitalize<string> extends T ? True : False;

export type IsMaybeWrappedUncapitalize<
  T,
  True,
  False = never
> = Uncapitalize<string> extends T ? True : False;

export type IsMaybeWrappedUppercase<
  T,
  True,
  False = never
> = Uppercase<string> extends T ? True : False;

export type IsMaybeWrappedLowercase<
  T,
  True,
  False = never
> = Lowercase<string> extends T ? True : False;

export type IfNotWrappedCapitalize<T, Fallback = never> = T extends any
  ? IsMaybeWrappedCapitalize<T, Fallback, T>
  : Fallback;

export type IfNotWrappedUncapitalize<T, Fallback = never> = T extends any
  ? IsMaybeWrappedUncapitalize<T, Fallback, T>
  : Fallback;

export type IfNotWrappedUppercase<T, Fallback = never> = T extends any
  ? IsMaybeWrappedUppercase<T, Fallback, T>
  : Fallback;

export type IfNotWrappedLowercase<T, Fallback = never> = T extends any
  ? IsMaybeWrappedLowercase<T, Fallback, T>
  : Fallback;

export type IsMaybeWrappedString<
  T,
  True,
  False = never
> = IsMaybeWrappedUppercase<
  T,
  True,
  IsMaybeWrappedLowercase<
    T,
    True,
    IsMaybeWrappedCapitalize<T, True, IsMaybeWrappedLowercase<T, True, False>>
  >
>;

export type IfNotWrappedString<T, Fallback = never> = T extends any
  ? IsMaybeWrappedString<T, Fallback, T>
  : Fallback;

export type IfStringLiteralNotWrapped<
  Str,
  Fallback = never
> = IfStrictStringLiteral<IfNotWrappedString<Str, Fallback>, Fallback>;

type TestBulk<T> = {
  value: T;
  maybeCap: IsMaybeWrappedCapitalize<T, "yes", "no">;
  maybeUncap: IsMaybeWrappedUncapitalize<T, "yes", "no">;
  maybeUp: IsMaybeWrappedUppercase<T, "yes", "no">;
  maybeLow: IsMaybeWrappedLowercase<T, "yes", "no">;
  maybeWrapped: IsMaybeWrappedString<T, "yes", "no">;
};

type test1 = TestBulk<string>;
type test2 = TestBulk<Capitalize<string>>;
type test3 = TestBulk<Uncapitalize<string>>;
type test4 = TestBulk<Uppercase<string>>;
type test5 = TestBulk<Lowercase<string>>;
type test6 = TestBulk<Capitalize<string> | Lowercase<string> | "hello">;

export type IsStringContaining<
  Input,
  CheckFor,
  True,
  False = never
> = IsStrictStringLiteral<CheckFor, 1, 0> extends 1
  ? IsNever<Input, 1, 0> extends 1
    ? False
    : Input extends `${string}${string & CheckFor}${string}`
    ? True
    : False
  : never;
