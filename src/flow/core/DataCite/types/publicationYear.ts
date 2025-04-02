/** PublicationYear | Mandatory | The year when the data was or will be made publicly available. In the case of resources such as software or dynamic data where there may be multiple releases in one year, include the Date property and sub-properties (dateType/dateInformation) to provide more information about the publication or release date details. */

/** Enforces a four-digit string for the year */
export type dcPublicationYear = string;