import { JoinWords } from "../array_utils/join";
import { FullSplit } from "../array_utils/split_full";
import { SmartLowercaseWords, SmartUppercaseWords } from "./smart_case_words";
import { SmartCapitalize, SmartUncapitalize } from "./smart_case";

// Extra Smart casings, will split the string up, and apply the smart case change to those words before re-joining. This allows it to catch wrapped strings inside the input string

type _SmarterCapitalize<Parts extends string[]> = Parts extends [
  infer Next,
  ...rest: infer Rest
]
  ? [SmartCapitalize<string & Next>, ...Rest]
  : [];

type _SmarterUncapitalize<Parts extends string[]> = Parts extends [
  infer Next,
  ...rest: infer Rest
]
  ? [SmartUncapitalize<string & Next>, ...Rest]
  : [];

export type SmarterCapitalize<Input extends string> = JoinWords<
  _SmarterCapitalize<FullSplit<Input>>
>;

export type SmarterUncapitalize<Input extends string> = JoinWords<
  _SmarterUncapitalize<FullSplit<Input>>
>;

export type SmarterUppercase<Input extends string> = JoinWords<
  SmartUppercaseWords<FullSplit<Input>>
>;

export type SmarterLowercase<Input extends string> = JoinWords<
  SmartLowercaseWords<FullSplit<Input>>
>;

// type TestBulk<T> = {
//   val: T;
//   smarterCap: SmarterCapitalize<string & T>;
//   smarterUncap: SmarterUncapitalize<string & T>;
//   smarterUp: SmarterUppercase<string & T>;
//   smarterLow: SmarterLowercase<string & T>;
// };

// type test3 = TestBulk<Capitalize<Lowercase<`${string}123`>>>;
// type test4 = TestBulk<Capitalize<Lowercase<`abc${string}123`>>>;
