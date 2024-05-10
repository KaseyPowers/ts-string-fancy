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

export type IsMaybeWrappedString<T, True, False = never> = 1 extends
  | IsMaybeWrappedCapitalize<T, 1, 0>
  | IsMaybeWrappedUncapitalize<T, 1, 0>
  | IsMaybeWrappedUppercase<T, 1, 0>
  | IsMaybeWrappedLowercase<T, 1, 0>
  ? True
  : False;

export type IfNotWrappedString<T, Fallback = never> = T extends any
  ? IsMaybeWrappedString<T, Fallback, T>
  : Fallback;

// Capitalize the input, but check specifically for Uncapitalize<string> so that we don't stack the types (avoiding Capitalize<Uncapitalize<string>>)
export type SmartCapitalize<Str extends string> = Str extends Capitalize<string>
  ? Str
  : IsMaybeWrappedUppercase<Str, 1, 0> extends 1
  ? Str
  : Capitalize<IfNotWrappedUncapitalize<Str, string>>;

// Uncapitalize the input, but check for wrapped strings to prevent unnecisary stacking
export type SmartUncapitalize<Str extends string> =
  Str extends Uncapitalize<string>
    ? Str
    : IsMaybeWrappedLowercase<Str, 1, 0> extends 1
    ? Str
    : Uncapitalize<IfNotWrappedCapitalize<Str, string>>;
// will drop the wrapping from any wrapped cases before uppercasing, since Uppercase would override all others
export type SmartUppercase<Str extends string> = Str extends Uppercase<string>
  ? Str
  : Uppercase<IfNotWrappedString<Str, string>>;
export type SmartLowercase<Str extends string> = Str extends Lowercase<string>
  ? Str
  : Lowercase<IfNotWrappedString<Str, string>>;
