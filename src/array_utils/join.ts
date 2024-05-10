import type { IsNever, IsStringContaining } from "../type_checks";
import type { AddNonEmptyStringToArr, AddTrimmedStringToArr } from "./builders";
import { IsCapitalized, IsUppercase } from "../upper_lower";

export type AddToString<Input extends string, ToAdd> = IsNever<
  ToAdd,
  1,
  0
> extends 0
  ? ToAdd extends string
    ? `${Input}${ToAdd}`
    : Input
  : Input;

export type AddToStringWith<
  Input extends string,
  ToAdd,
  Seperator extends string = " "
> = AddToString<AddToString<Input, Seperator>, ToAdd>;

type _Join<
  Words extends string[],
  Seperator extends string,
  Current extends string = ""
> = Words extends [infer Next, ...rest: infer Rest]
  ? Rest extends string[]
    ? _Join<Rest, Seperator, AddToStringWith<Current, Next, Seperator>>
    : Current
  : Current;

export type Join<
  Words extends string[],
  Seperator extends string = " "
> = _Join<Words, Seperator>;

// // helper to recombine the pending array and add it to the output array
// type AddPendingToOutput<
//   Pending extends string[],
//   Output extends string[]
// > = AddNonEmptyStringToArr<Output, Join<Pending, "">>;

// // recombine
// type _CombineByUpper<
//   Characters extends string[],
//   Pending extends string[],
//   Output extends string[]
// > = Characters extends [infer Next, ...rest: infer Rest]
//   ? Rest extends string[]
//     ? // if next is capitalized and pending is not all uppercase, then move pending to output and start next part
//       IsCapitalized<Next, 1, 0> | IsAllUppercase<Pending, 0, 1> extends 1
//       ? _CombineByUpper<
//           Rest,
//           AddStringToArr<[], Next>,
//           AddPendingToOutput<Pending, Output>
//         >
//       : _CombineByUpper<Rest, AddStringToArr<Pending, Next>, Output>
//     : AddPendingToOutput<Pending, Output>
//   : AddPendingToOutput<Pending, Output>;

// // This will take a string array (expecting like from FullSplit), and recombine characters until capitalized words are found.
// export type CombineByUpper<Words extends string[]> = _CombineByUpper<
//   Words,
//   [],
//   []
// >;

type _CombineByUpper<
  Parts extends string[],
  Pending extends string,
  Output extends string[]
> = Parts extends [infer Next, ...rest: infer Rest]
  ? Rest extends string[]
    ? IsCapitalized<Next, 1, 0> | IsUppercase<Pending, 0, 1> extends 1
      ? _CombineByUpper<
          Rest,
          AddToString<"", Next>,
          AddNonEmptyStringToArr<Output, Pending>
        >
      : _CombineByUpper<Rest, AddToString<Pending, Next>, Output>
    : AddNonEmptyStringToArr<Output, Pending>
  : AddNonEmptyStringToArr<Output, Pending>;

export type CombineByUpper<Words extends string[]> = _CombineByUpper<
  Words,
  "",
  []
>;
