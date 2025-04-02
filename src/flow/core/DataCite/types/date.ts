/** Date | Recommended  | Different dates relevant to the work */

export type DateType =
  | "Accepted"
  | "Available"
  | "Copyrighted"
  | "Collected"
  | "Coverage"
  | "Created"
  | "Issued"
  | "Submitted"
  | "Updated"
  | "Valid"
  | "Withdrawn"
  | "Other";


export type DateEntry = {
  /** YYYY, YYYY-MM-DD, YYYY-MM-DDThh:mm:ssTZD or any other format or level of granularity described in W3CDTF. */
  date: string;
  dateType: DateType; 
  /** Specific information about the date, if appropriate. */
  dateInformation?: string;
}

export type dcDates = DateEntry[];
