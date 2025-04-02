/** Contributor | Recommended | The institution or person responsible for collecting, managing, distributing, or otherwise contributing to the development of the resource. To supply multiple contributors, repeat this property */
import { type dcAffiliation, type dcNameIdentifier } from "./creator";
import { type dcNameType } from "./creator";

export type dcContributorType = 
 | "ContactPerson"
 | "DataCollector"
 | "DataCurator"
 | "DataManager"
 | "Distributor"
 | "Editor"
 | "HostingInstitution"
 | "Producer"
 | "ProjectLeader"
 | "ProjectManager"
 | "ProjectMember"
 | "RegistrationAgency"
 | "RegistrationAuthority"
 | "RelatedPerson"
 | "Researcher"
 | "ResearchGroup"
 | "RightsHolder"
 | "Sponsor"
 | "Supervisor"
 | "Translator"
 | "WorkPackageLeader"
 | "Other"

 export type dcContributor = {
    /** The full name of the contributor */
    name: string;
    /** The export type of name */
    nameType?: dcNameType;
    /** The personal or first name of the contributor */
    givenName?: string;
    /** The surname or last name of the contributor */
    familyName?: string;
    /** Uniquely identifies an individual or legal entity, according to various schemes. I.e ROR or ORCID */
    nameIdentifiers?: dcNameIdentifier[];
    /** The organizational or institutional affiliation of the contributor */
    affiliation?: dcAffiliation[];
    /** The type of contributor of the resource */
    contributorType?: dcContributorType[];
  }
  
export type dcContributors = dcContributor[];