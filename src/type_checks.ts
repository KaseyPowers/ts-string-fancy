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
> = 0 extends IfStringLiteral<Str, 0> ? False : True;

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
  ? 1 extends IfStringNotEmpty<Str, 1>
    ? Fallback
    : IfStringLiteral<Str, Fallback>
  : Fallback;

export type IsStrictStringLiteral<
  Str,
  True,
  False = never
> = 0 extends IfStrictStringLiteral<Str, 0> ? False : True;

// type TestBulk<T> = {
//   value: T;
//   maybeCap: IsMaybeWrappedCapitalize<T, "yes", "no">;
//   maybeUncap: IsMaybeWrappedUncapitalize<T, "yes", "no">;
//   maybeUp: IsMaybeWrappedUppercase<T, "yes", "no">;
//   maybeLow: IsMaybeWrappedLowercase<T, "yes", "no">;
//   maybeWrapped: IsMaybeWrappedString<T, "yes", "no">;
// };

// type test1 = TestBulk<string>;
// type test2 = TestBulk<Capitalize<string>>;
// type test3 = TestBulk<Uncapitalize<string>>;
// type test4 = TestBulk<Uppercase<string>>;
// type test5 = TestBulk<Lowercase<string>>;
// type test6 = TestBulk<Capitalize<string> | Lowercase<string> | "hello">;

export type IsStringStartsWith<
  Input,
  CheckFor extends string,
  True,
  False = never
> = IsStrictStringLiteral<CheckFor, 1, 0> extends 1
  ? IsNever<Input, 1, 0> extends 0
    ? Input extends string
      ? Input extends `${CheckFor}${string}`
        ? True
        : False
      : False
    : False
  : False;

export type IsStringEndsWith<
  Input,
  CheckFor extends string,
  True,
  False = never
> = IsStrictStringLiteral<CheckFor, 1, 0> extends 1
  ? IsNever<Input, 1, 0> extends 0
    ? Input extends string
      ? Input extends `${string}${CheckFor}`
        ? True
        : False
      : False
    : False
  : False;

export type IsStringContaining<
  Input,
  CheckFor extends string,
  True,
  False = never
> = IsStrictStringLiteral<CheckFor, 1, 0> extends 1
  ? IsNever<Input, 1, 0> extends 0
    ? Input extends string
      ? Input extends `${string}${CheckFor}${string}`
        ? True
        : False
      : False
    : False
  : False;

export type StringsMatch<
  A extends string,
  B extends string,
  True,
  False = never
> = A extends B ? (B extends A ? True : False) : False;

// type testVarA = `on${string}`;
// type testVarB = Uncapitalize<testVarA>;
// type check = StringsMatch<testVarA, testVarB, true, false>;
