import { CommonSeperators } from "./basic_types";
import { IsStrictStringLiteralNotWrapped } from "./upper_lower_cases";

// Trim will repeatedly check and remove the checked values until none are left

// core logic, after validation
type _TrimStart<
  Str extends string,
  ToRemove extends string
> = Str extends `${ToRemove}${infer Inner}` ? _TrimStart<Inner, ToRemove> : Str;

// Validate that the toRemove is not an empty or wrapped string
export type TrimStringStart<
  Str extends string,
  ToRemove extends string = CommonSeperators
> = IsStrictStringLiteralNotWrapped<ToRemove, _TrimStart<Str, ToRemove>, never>;

// Repeat above for string end and both
type _TrimEnd<
  Str extends string,
  ToRemove extends string
> = Str extends `${infer Inner}${ToRemove}` ? _TrimEnd<Inner, ToRemove> : Str;

export type TrimStringEnd<
  Str extends string,
  ToRemove extends string = CommonSeperators
> = IsStrictStringLiteralNotWrapped<ToRemove, _TrimEnd<Str, ToRemove>, never>;

type _Trim<Str extends string, ToRemove extends string> = _TrimEnd<
  _TrimStart<Str, ToRemove>,
  ToRemove
>;

export type TrimString<
  Str extends string,
  ToRemove extends string = CommonSeperators
> = IsStrictStringLiteralNotWrapped<ToRemove, _Trim<Str, ToRemove>, never>;

// export type IsTrimmedStart<
//   Str extends string,
//   ToRemove extends string,
//   True,
//   False = never
// > = Str extends TrimStringStart<Str, ToRemove> ? True : False;

// export type IsTrimmedEnd<
//   Str extends string,
//   ToRemove extends string,
//   True,
//   False = never
// > = Str extends TrimStringEnd<Str, ToRemove> ? True : False;

// export type IsTrimmedString<
//   Str extends string,
//   ToRemove extends string,
//   True,
//   False = never
// > = Str extends TrimString<Str, ToRemove> ? True : False;
