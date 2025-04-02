/**
 * **Obligation:** Mandatory
 * 
 * **Occurrences:** 1
 * 
 * **Definition:** The Identifier is a unique string that identifies a resource.
 * 
 * For software, determine whether the identifier is for a specific version of a piece of software, (per the Force11 Software Citation Principles 2), or for all versions.
 * 
 * Allowed values, examples, other constraints:
 * 
 * A DOI(Digital Object Identifier) registered by a DataCite Member.
 * 
 * The format should be 10.21384/foo.
 *
 * @example
 * const Identifier: dcIdentifier = {"identifier": "10.21384/foo", "identifierType": "DOI"}
 **/
export type dcIdentifier = {
    identifier: string;
    identifierType: "DOI";
}
