/** Subject | Recommended | Subject, keyword, classification code, or key phrase describing the resource */

export type dcSubject = {
  /** Institution name */
  subject: string;
  /** The URI of the subject identifier scheme. */
  schemeUri?: string;
  /** The URI of the subject term */
  valueUri?: string;
  /** The name of the subject scheme or classification code or authority if one is used */
  subjectScheme?: string;
  lang?: string;
  /** The classification code used for the subject term in the subject scheme. */
  classificationCode: string;
}

export type dcSubjects = dcSubject[];

