import type { FullSplit } from "./split_full";
// Will return True for strings of length 1, can be used to recombine capital letters when splitting by capitalize ex. onIDs => ["on", "I", "Ds"] => ["on", "IDs"]
export type IsStrLength1<Str, True, False = never> = Str extends string
  ? FullSplit<Str> extends [string]
    ? True
    : False
  : False;
// keeps the value(s) that are a length1 string
export type IfStrLength1<Str, Fallback = never> = Str extends string
  ? IsStrLength1<Str, Str, Fallback>
  : Fallback;
// keeps the value(s) that aren't a length1 string
export type IfStrNotLength1<Str, Fallback = never> = Str extends string
  ? IsStrLength1<Str, Fallback, Str>
  : Fallback;
