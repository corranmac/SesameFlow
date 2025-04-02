/** RelatedIdentifier | Recommended | Identifiers of related resources. These must be globally unique identifiers */

import { type dcResourceTypeGeneral } from "./resourceType";

export type dcRelatedIdentifierType =
  | "ARK"
  | "arXiv"
  | "bibcode"
  | "CSTR"
  | "DOI"
  | "EAN13"
  | "EISSN"
  | "Handle"
  | "IGSN"
  | "ISBN"
  | "ISSN"
  | "ISTC"
  | "LISSN"
  | "LSID"
  | "PMID"
  | "PURL"
  | "RRID"
  | "UPC"
  | "URL"
  | "URN"
  | "w3id";

export type dcRelationType = 
 | "IsCitedBy"
 | "Cites"
 | "IsSupplementTo"
 | "IsSupplementedBy"
 | "IsContinuedBy"
 | "Continues"
 | "IsDescribedBy"
 | "Describes"
 | "HasMetadata"
 | "IsMetadataFor"
 | "HasVersion"
 | "IsVersionOf"
 | "IsNewVersionOf"
 | "IsPreviousVersionOf"
 | "IsPartOf"
 | "HasPart"
 | "IsPublishedIn"
 | "IsReferencedBy"
 | "References"
 | "IsDocumentedBy"
 | "Documents"
 | "IsCompiledBy"
 | "Compiles"
 | "IsVariantFormOf"
 | "IsOriginalFormOf"
 | "IsIdenticalTo"
 | "IsReviewedBy"
 | "Reviews"
 | "IsDerivedFrom"
 | "IsSourceOf"
 | "IsRequiredBy"
 | "Requires"
 | "IsObsoletedBy"
 | "Obsoletes"
 | "IsCollectedBy"
 | "Collects"
 | "IsTranslationOf"
 | "HasTranslation";

export type dcRelatedIdentifier = {
    /** Description of the relationship of the resource being registered (A) and the related resource (B) */
    relationType: dcRelationType;
    /** The export type of the RelatedIdentifier */
    relatedIdentifier?: string;
    /** The general export type of the related resource */
    resourceTypeGeneral?: dcResourceTypeGeneral;
    /** The export type of the RelatedIdentifier. */
    relatedIdentifierType?: dcRelatedIdentifierType;
    /** The URI of the relatedMetadataScheme */
    schemeUri?: string;
    /** The export type of the relatedMetadataScheme, linked with the schemeURI */
    schemeType?: string;
    /** The name of the scheme */
    relatedMetadataScheme?: string;
  }

export type dcRelatedIdentifiers = dcRelatedIdentifier[];