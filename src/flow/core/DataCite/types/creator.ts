/** Creator | Mandatory | The main researchers involved in producing the data, or the authors of the publication, in priority order. For instruments this is the manufacturer or developer of the instrument. To supply multiple creators, repeat this property. */

export type dcNameType = "Organizational" | "Personal";

export type dcNameIdentifier = {
  /** URL or unique ID */
  nameIdentifier: string;
  /** ORCID, ISNI, ROR, etc. */
  nameIdentifierScheme: string;
  /** Optional: URL of the scheme */
  schemeUri?: string;
}

export type dcAffiliation = {
  /** Institution name */
  name: string;
  /** Unique ID for the institution */
  affiliationIdentifier?: string;
  /** The name of the name identifier scheme. ROR, ISNI, etc. */
  affiliationIdentifierScheme?: string;
  /** The URI of the name identifier scheme. */
  schemeUri?: string;
}

export type dcCreator = {
  /** The full name of the creator */
  name: string;
  /** The type of name */
  nameType?: dcNameType;
  /** The personal or first name of the creator */
  givenName?: string;
  /** The surname or last name of the creator */
  familyName?: string;
  /** Uniquely identifies an individual or legal entity, according to various schemes. I.e ROR or ORCID */
  nameIdentifiers?: dcNameIdentifier[];
  /** The organizational or institutional affiliation of the creator */
  affiliation?: dcAffiliation[];
}

export type dcCreators = dcCreator[];
