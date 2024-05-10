import type {
  IfNotWrappedUncapitalize,
  IfNotWrappedCapitalize,
  IfNotWrappedString,
} from "./type_checks";

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

// If the string isn't capitalized (by above logic), capitalize it, while also checking for and avoiding stacking on Uncapitalize<string>
export type SmartCapitalize<Str extends string> = IsCapitalized<
  Str,
  Str,
  IfNotWrappedUncapitalize<Str, string>
>;
// Uncapitalize the input, but check for wrapped strings to prevent unnecisary stacking
export type SmartUncapitalize<Str extends string> = IsUncapitalized<
  Str,
  Str,
  IfNotWrappedCapitalize<Str, string>
>;

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
