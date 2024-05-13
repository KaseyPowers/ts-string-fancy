import { AddPrefixesChecked } from "./prefix";
import { StripSuffixesAdd } from "./suffix";

// apply default suffix behavior if the suffix is defined
type DefaultSuffix<Input extends string, Suffix> = Suffix extends
  | string
  | string[]
  ? StripSuffixesAdd<Input, Suffix, Input>
  : Input;
// apply default prefix behavior if the prefix is defined
type DefaultPrefix<Input extends string, Prefix> = Prefix extends string
  ? AddPrefixesChecked<Input, [Prefix], Input>
  : Prefix extends string[]
  ? AddPrefixesChecked<Input, Prefix, Input>
  : Input;

// apply the default prefix and suffix values to input string
export type AffixString<Input extends string, Prefix, Suffix> = DefaultSuffix<
  DefaultPrefix<Input, Prefix>,
  Suffix
>;

type TestPrefix = "get";
type TestSuffix = ["derived", "state"];

type check = AddPrefixesChecked<string, [TestPrefix]>;

type testAffix = AffixString<string, "get", ["derived", "state"]>;
