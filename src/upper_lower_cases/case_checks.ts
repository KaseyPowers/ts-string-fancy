import type {
  IsWrappedCapitalize,
  IsWrappedUncapitalize,
  IsWrappedUppercase,
  IsWrappedLowercase,
} from "./smart_case";
import type {
  IfStringLiteral,
  IfStrictStringLiteral,
  StringsMatch,
  IsStringStartsWith,
  IsStringEndsWith,
  IsStringContaining,
} from "../type_checks";
import { SmarterLowercase } from "./smarter_case";

// check if input is a string wrapped in a string utility
export type IsWrappedString<Input, True, False = never> = IsWrappedCapitalize<
  Input,
  True,
  IsWrappedUncapitalize<
    Input,
    True,
    IsWrappedUppercase<Input, True, IsWrappedLowercase<Input, True, False>>
  >
>;
export type IfWrappedString<Input, Fallback = never> = Input extends any
  ? IsWrappedString<Input, Input, Fallback>
  : Fallback;

export type IfNotWrappedString<Input, Fallback = never> = Input extends any
  ? IsWrappedString<Input, Fallback, Input>
  : Fallback;

export type IfStringLiteralNotWrapped<Str, Fallback = never> = IfStringLiteral<
  IfNotWrappedString<Str, Fallback>,
  Fallback
>;

export type IfStrictStringLiteralNotWrapped<
  Str,
  Fallback = never
> = IfStrictStringLiteral<IfNotWrappedString<Str, Fallback>, Fallback>;

export type IsStrictStringLiteralNotWrapped<
  Str,
  True,
  False = never
> = 1 extends IfStrictStringLiteralNotWrapped<Str, 1> ? False : True;

export type IsStringStartsWithI<
  Input,
  CheckFor extends string,
  True,
  False = never
> = Input extends string
  ? IsStringStartsWith<
      SmarterLowercase<Input>,
      SmarterLowercase<CheckFor>,
      True,
      False
    >
  : False;

export type IsStringEndsWithI<
  Input,
  CheckFor extends string,
  True,
  False = never
> = Input extends string
  ? IsStringEndsWith<
      SmarterLowercase<Input>,
      SmarterLowercase<CheckFor>,
      True,
      False
    >
  : False;

export type IsStringContainingI<
  Input,
  CheckFor extends string,
  True,
  False = never
> = Input extends string
  ? IsStringContaining<
      SmarterLowercase<Input>,
      SmarterLowercase<CheckFor>,
      True,
      False
    >
  : False;

export type StringsMatchI<
  A extends string,
  B extends string,
  True,
  False = never
> = StringsMatch<SmarterLowercase<A>, SmarterLowercase<B>, True, False>;
