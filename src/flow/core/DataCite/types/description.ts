/** Description | Recommended | All additional information that does not fit in any of the other categories. May be used for technical information or detailed information associated with a scientific instrument */

import { type dcLanguage } from "./language";

export type dcDescriptionType = 
 | "Abstract"
 | "Methods"
 | "SeriesInformation"
 | "TableOfContents"
 | "TechnicalInfo"
 | "Other"

export type dcDescription = {
    /** All additional information that does not fit in any of the other categories */
    description: string;
    /** The type of the Description */
    descriptionType: dcDescriptionType;
    lang?: dcLanguage;
}

export type dcDescriptions = dcDescription[]