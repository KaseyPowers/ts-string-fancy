import { IsStrictStringLiteralNotWrapped } from "./case_checks";
import {
  SmarterCapitalize,
  SmarterLowercase,
  SmarterUncapitalize,
  SmarterUppercase,
} from "./smarter_case";

// Take each non-wrapped string, and return all 4 common cases
export type ToCommonCaseUnion<Input> = Input extends string
  ? IsStrictStringLiteralNotWrapped<Input, 1, 0> extends 1
    ?
        | SmarterCapitalize<Input>
        | SmarterUncapitalize<Input>
        | SmarterLowercase<Input>
        | SmarterUppercase<Input>
    : Input
  : Input;
