import { IfStringLiteralNotWrapped, IsStringLiteral } from "../type_checks";
import type { FullSplit } from "./split";
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

// Returns true if a single character, and if that single character is Uppercase/Capitalize  (checking both for wrapped strings)
// export type IsCapitalizeChar<
// Str,
// True,
// False = never
// > = Str extends Uppercase<string>
// ? True
// : IsStrLength1<Str, 1, 0> extends 1
// ? Str extends Capitalize<string>
//   ? True
//   : False
// : False;

export type IsPureStringLiteral<Str, True, False = never> = Str extends string
  ? 1 extends IfStringLiteralNotWrapped<FullSplit<Str>[number], 1>
    ? False
    : True
  : False;

// type testInput = `hello ${Capitalize<`next-${string}`>} world`;
// type test = IsPureStringLiteral<
//   `hello ${Capitalize<`next-${string}`>} world`,
//   true,
//   false
// >;

// type _IsAllUppercase<Words extends string[], Output = true> = [Output] extends [
//   true
// ]
//   ? Words extends [infer Next, ...rest: infer Rest]
//     ? Rest extends string[]
//       ? _IsAllUppercase<
//           Rest,
//           Output | (Next extends Uppercase<string> ? true : false)
//         >
//       : _IsAllUppercase<
//           [],
//           Output | (Next extends Uppercase<string> ? true : false)
//         >
//     : Output
//   : false;

// export type IsAllUppercase<
//   Words extends string[],
//   True,
//   False = never
// > = _IsAllUppercase<Words> extends true ? True : False;

// type IfUppercase<In> = In extends Uppercase<string> ? In : never;

// type testIfUpper = IfUppercase<`${Uppercase<string>}1ABC`>
