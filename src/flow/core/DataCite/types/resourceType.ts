/** ResourceType | Mandatory | A description of the resource */

export type dcResourceTypeGeneral =
  | "Audiovisual"
  | "Award"
  | "Book"
  | "BookChapter"
  | "Collection"
  | "ComputationalNotebook"
  | "ConferencePaper"
  | "ConferenceProceeding"
  | "DataPaper"
  | "Dataset"
  | "Dissertation"
  | "Event"
  | "Image"
  | "InteractiveResource"
  | "Instrument"
  | "Journal"
  | "JournalArticle"
  | "Model"
  | "OutputManagementPlan"
  | "PeerReview"
  | "PhysicalObject"
  | "Preprint"
  | "Project"
  | "Report"
  | "Service"
  | "Software"
  | "Sound"
  | "Standard"
  | "StudyRegistration"
  | "Text"
  | "Workflow"
  | "Other";


export type dcResourceType = {
  /** A description of the resource */
  resourceType: string;
  /** The general export type of a resource. */
  resourceTypeGeneral: dcResourceTypeGeneral;
}

export type dcResourceTypes = dcResourceType[]
