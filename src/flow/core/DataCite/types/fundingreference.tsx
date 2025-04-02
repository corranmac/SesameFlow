/** FundingReference | Optional | Information about financial support (funding) for the resource being registered */

export type dcFunderIdentifierType = 
 | "Crossref Funder ID"
 | "GRID"
 | "ISNI"
 | "ROR"
 | "Other"

export type dcFundingReference = {
    /** Name of the funding provider */
    funderName: string;
    /** The URI leading to a page provided by the funder for more information about the award */
    awardUri?: string;
    /** The human readable title or name of the award (grant) */
    awardTitle?: string;
    /** The code assigned by the funder to a sponsored award (grant). */
    awardNumber?: string;
    /** Uniquely identifies a funding entity, according to various types */
    funderIdentifier?: string;
    /** The export type of the funderIdentifier */
    funderIdentifierType?: dcFunderIdentifierType;
    /** The URI of the funder identifier scheme */
    schemeURI?: string;
}

export type dcFundingReferences = dcFundingReference[]