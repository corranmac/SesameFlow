/** RelatedItem | Optional | Information about a resource related to the one being registered */

import { type dcContributors } from "./contributor";
import { type dcCreators } from "./creator";
import { type dcIdentifier } from "./identifier";
import { type dcPublicationYear } from "./publicationYear";
import { type dcRelationType } from "./relatedIdentifier";
import { type dcResourceTypeGeneral } from "./resourceType";
import { type dcTitle } from "./title";

export type dcNumberType = 
 | "Article"
 | "Chapter"
 | "Report"
 | "Other"

export type dcNumber = {
    /** Number of the resource within the related item, e.g., report number or article number */
    number: string;
    numberType: dcNumberType;
}

export type dcRelatedItem = {
    /** The general export type of the related item */
    relatedItemType: dcResourceTypeGeneral;
    /** Description of the relationship of the resource being registered (A) and the related item (B) */
    relationType: dcRelationType;
    /** The identifier for the related item */
    relatedItemIdentifier: dcIdentifier;
    /** The institution or person responsible for creating the related resource */
    creators: dcCreators;
    /** Title of the related item */
    title: dcTitle;
    /** The year when the item was or will be made publicly available */
    publicationYear: dcPublicationYear;
    /** Volume of the related item */
    volume: string;
    /** Issue number or name of the related item */
    issue: string;
    /** Number of the resource within the related item, e.g., report number or article number */
    number: string;
    /** First page of the resource within the related item, e.g., of the chapter, article, or conference paper in proceedings */
    firstPage: number;
    /** Last page of the resource within the related item, e.g., of the chapter, article, or conference paper in proceedings */
    lastPage: number;
    /** The name of the entity that holds, archives, publishes prints, distributes, releases, issues, or produces the resource */
    publisher: string;
    /** Edition or version of the related item */
    edition: string;
    /** An institution or person identified as contributing to the development of the resource. If multiple contributors are identified, this sub-property may be repeated for each contributor */
    contributors: dcContributors;
}

export type dcRelatedItems = dcRelatedItem[]