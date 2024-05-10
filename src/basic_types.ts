export type NonEmptyArray<T> = [T, ...rest: T[]];
export type NonEmptyWords = NonEmptyArray<string>;

export type SnakeCaseSeperator = "_";
export type KebabCaseSeperator = "-";
export type SpaceSeperator = " ";
export type CommonSeperators =
  | SpaceSeperator
  | KebabCaseSeperator
  | SnakeCaseSeperator;
