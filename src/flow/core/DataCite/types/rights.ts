/** Rights | Optional | Any rights information for this resource */

import { type dcLanguage } from "./language";

export type dcRights = {
    /** Any rights information for this resource */
    rights: string;
    /** The URI of the license */
    rightsUri?: string;
    /** The URI of the rightsIdentifierScheme */
    schemeUri?: string;
    /** A short, standardized version of the license name e.g. CC-BY-3.0 */
    rightsIdentifier?: string;
    /** The name of the scheme e.g. SPDX */
    rightsIdentifierScheme?: string;
    lang?: dcLanguage;
}

export type dcRightsList = dcRights[]