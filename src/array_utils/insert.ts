import { PushStringsToArr } from "./builders";
// inner helper that adds insert before each value
type _InsertBefore<
  Words extends string[],
  Insert extends string,
  Current extends string[]
> = Words extends [infer Next, ...rest: infer Rest]
  ? Rest extends string[]
    ? _InsertBefore<Rest, Insert, PushStringsToArr<[Insert, Next], Current>>
    : Current
  : Current;

export type InsertBefore<
  Words,
  ToInsert extends string
> = Words extends string[]
  ? _InsertBefore<Words, ToInsert, []>
  : Words extends string
  ? InsertBefore<[Words], ToInsert>
  : never;

type _InsertAfter<
  Words extends string[],
  Insert extends string,
  Current extends string[]
> = Words extends [infer Next, ...rest: infer Rest]
  ? Rest extends string[]
    ? _InsertAfter<Rest, Insert, PushStringsToArr<[Next, Insert], Current>>
    : Current
  : Current;

export type InsertAfter<Words, ToInsert extends string> = Words extends string[]
  ? _InsertAfter<Words, ToInsert, []>
  : Words extends string
  ? InsertAfter<[Words], ToInsert>
  : never;

// insertBetween will use insertBefore skipping the first value.
export type InsertBetween<
  Words,
  ToInsert extends string
> = Words extends string[]
  ? Words extends [infer Next, ...rest: infer Rest]
    ? Next extends string
      ? Rest extends string[]
        ? _InsertBefore<Rest, ToInsert, [Next]>
        : never
      : never
    : never
  : Words extends string
  ? InsertBetween<[Words], ToInsert>
  : never;
