import type { IsAny } from "./type_checks";

// wrapped type check to convert type to an array if it's not already. Added Any check, so that any only becomes [any] and not `any | [any]` which won't play nice with cyclicle types
export type AsArray<T> = IsAny<T, 1, 0> extends 0
  ? T extends unknown[]
    ? T
    : [T]
  : [T];

// export type ArrayToUnionFancy<Input extends unknown[], Output> = Input extends [infer Next, ...rest: infer Rest]
