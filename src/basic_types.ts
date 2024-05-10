import { IsStrictStringLiteral } from "./type_checks";

export type NonEmptyArray<T> = [T, ...rest: T[]];

export type SnakeCaseSeperator = "_";
export type KebabCaseSeperator = "-";
export type CommonSeperators = " " | KebabCaseSeperator | SnakeCaseSeperator;

export type AllSeperatorsDefault =
  | " "
  | KebabCaseSeperator
  | SnakeCaseSeperator;
