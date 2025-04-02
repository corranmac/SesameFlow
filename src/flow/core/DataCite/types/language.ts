/** Language | Optional | The primary language of the resource */

/** Matches 2-letter codes (e.g., "en", "fr") */
export type TwoLetterISO6391 = `${string}${string}`;
/** Matches 3-letter codes (e.g., "eng", "fra") */
export type ThreeLetterISO6392 = `${string}${string}${string}`;

export type dcLanguage = TwoLetterISO6391 | ThreeLetterISO6392;