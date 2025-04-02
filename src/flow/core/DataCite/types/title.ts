/** Title | Mandatory | A name or title by which a resource is known. May be the title of a dataset or the name of a piece of software or an instrument. */

import { type dcLanguage } from "./language";

export type dcTitleType =
  | "AlternativeTitle"
  | "Subtitle"
  | "TranslatedTitle"
  | "Other"

export type dcTitle = {
  title: string;
  /** The language of the title */
  lang?: dcLanguage;
  /** The export type of Title (other than the Main Title) */
  titleType?: dcTitleType;
}

export type dcTitles = dcTitle[];
