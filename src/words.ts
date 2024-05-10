import { NonEmptyArray } from "./basic_types";
import type { SmartCapitalize, SmartUncapitalize } from "./common";
import type { AddString } from "./string_array";
// internal function, rebuilds array of values but capitalizing each string
type _CapitalizeWords<
  Vals extends string[],
  Current extends string[]
> = Vals extends [infer Next, ...rest: infer Rest]
  ? Rest extends string[]
    ? _CapitalizeWords<Rest, AddString<Current, SmartCapitalize<string & Next>>>
    : never
  : Current;
// internal function, keeps trying to build current until it has a single value (in case of invalid inputs), then starts capitalizing the rest with that first value uncapitalized
type _CamelCaseWords<
  Vals extends string[],
  Current extends string[]
> = Current extends [infer First]
  ? _CapitalizeWords<Vals, [SmartUncapitalize<First & string>]>
  : Vals extends [infer Next, ...rest: infer Rest]
  ? Rest extends string[]
    ? _CamelCaseWords<Rest, AddString<Current, string & Next>>
    : never
  : Current;

// cast the array of words for Pascal case, Make sure to do this last because Capitalize/Uncapitalize
// export type WordsForPascal<Words extends string[]>
export type WordsForPascal<Vals extends string[]> = _CapitalizeWords<Vals, []>;
export type WordsForCamel<Vals extends string[]> = _CamelCaseWords<Vals, []>;
