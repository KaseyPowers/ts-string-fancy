import { FullSplit } from "./split_full";
export type LastWord<Words extends string[]> = Words extends [
  ...start: any[],
  infer Last
]
  ? Last
  : never;

// get the length of a string, string or string parts of a literal count as 1
export type StringLength<In extends string> = FullSplit<In>["length"];
