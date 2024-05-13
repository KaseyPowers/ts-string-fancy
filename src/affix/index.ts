export type * from "./affix";
export type * from "./prefix";
export type * from "./suffix";

/**
 * Notes: Currently require prefixes/suffixes to be all pure strings
 * The affix type accepts a string and one prefix + suffix value.
 * Potentially could do a single array definition for both, something like `[prefix1, prefix2, string, suffix]`
 */
