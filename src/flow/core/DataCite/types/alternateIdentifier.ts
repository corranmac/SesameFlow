/** AlternateIdentifier | Optional | An identifier other than the primary Identifier applied to the resource being registered */

export type dcAlternateIdentifier = {
    /** An identifier other than the primary Identifier applied to the resource being registered */
    alternateIdentifier: string;
    /** The type of the AlternateIdentifier */
    alternateIdentifierType: string;
  }

export type dcAlternateIdentifiers = dcAlternateIdentifier[];

