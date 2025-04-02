import { createRxDatabase, addRxPlugin, RxDatabase, RxCollection } from "rxdb";
import { dcMetadata_4_6 } from "flow/plugins/data-cite/metadata";
import { useState, useEffect } from "react";
import Dexie, { Table } from "dexie";



const contributorTypes = [
  "ContactPerson",
  "DataCollector",
  "DataCurator",
  "DataManager",
  "Distributor",
  "Editor",
  "HostingInstitution",
  "Producer",
  "ProjectLeader",
  "ProjectManager",
  "ProjectMember",
  "RegistrationAgency",
  "RegistrationAuthority",
  "RelatedPerson",
  "Researcher",
  "ResearchGroup",
  "RightsHolder",
  "Sponsor",
  "Supervisor",
  "Translator",
  "WorkPackageLeader",
  "Other",
];
const identifierType = [
  "ARK",
  "arXiv",
  "bibcode",
  "CSTR",
  "DOI",
  "EAN13",
  "EISSN",
  "Handle",
  "IGSN",
  "ISBN",
  "ISSN",
  "ISTC",
  "LISSN",
  "LSID",
  "PMID",
  "PURL",
  "RRID",
  "UPC",
  "URL",
  "URN",
  "w3id",
];
const resourceTypes = [
  "Audiovisual",
  "Award",
  "Book",
  "BookChapter",
  "Collection",
  "ComputationalNotebook",
  "ConferencePaper",
  "ConferenceProceeding",
  "DataPaper",
  "Dataset",
  "Dissertation",
  "Event",
  "Image",
  "InteractiveResource",
  "Instrument",
  "Journal",
  "JournalArticle",
  "Model",
  "OutputManagementPlan",
  "PeerReview",
  "PhysicalObject",
  "Preprint",
  "Project",
  "Report",
  "Service",
  "Software",
  "Sound",
  "Standard",
  "StudyRegistration",
  "Text",
  "Workflow",
  "Other",
];
const relationType = [
  "IsCitedBy",
  "Cites",
  "IsSupplementTo",
  "IsSupplementedBy",
  "IsContinuedBy",
  "Continues",
  "IsDescribedBy",
  "Describes",
  "HasMetadata",
  "IsMetadataFor",
  "HasVersion",
  "IsVersionOf",
  "IsNewVersionOf",
  "IsPreviousVersionOf",
  "IsPartOf",
  "HasPart",
  "IsPublishedIn",
  "IsReferencedBy",
  "References",
  "IsDocumentedBy",
  "Documents",
  "IsCompiledBy",
  "Compiles",
  "IsVariantFormOf",
  "IsOriginalFormOf",
  "IsIdenticalTo",
  "IsReviewedBy",
  "Reviews",
  "IsDerivedFrom",
  "IsSourceOf",
  "IsRequiredBy",
  "Requires",
  "IsObsoletedBy",
  "Obsoletes",
  "IsCollectedBy",
  "Collects",
  "IsTranslationOf",
  "HasTranslation",
];
const resourceTypeGeneral = [
  "Audiovisual",
  "Award",
  "Book",
  "BookChapter",
  "Collection",
  "ComputationalNotebook",
  "ConferencePaper",
  "ConferenceProceeding",
  "DataPaper",
  "Dataset",
  "Dissertation",
  "Event",
  "Image",
  "InteractiveResource",
  "Instrument",
  "Journal",
  "JournalArticle",
  "Model",
  "OutputManagementPlan",
  "PeerReview",
  "PhysicalObject",
  "Preprint",
  "Project",
  "Report",
  "Service",
  "Software",
  "Sound",
  "Standard",
  "StudyRegistration",
  "Text",
  "Workflow",
  "Other",
];

// RxDB schema definition
const dcRXSchema = {
  title: "Datacite Schema",
  description: "Schema for storing metadata with nested fields",
  version: 0,
  type: "object",
  primaryKey: "id",
  indexes: [["Creators.name"]],
  properties: {
    id: {
      type: "string",
      maxLength: 40,
    },
    Identifier: {
      type: "object",
      properties: {
        identifier: { type: "string" },
        identifierType: { type: "string" },
      },
      required: ["identifier"],
    },
    Creators: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          nameType: { type: "string", enum: ["Personal", "Organizational"] },
          givenName: { type: "string" },
          familyName: { type: "string" },
          affiliations: {
            type: "array",
            items: {
              type: "object",
              properties: {
                affiliationIdentifier: { type: "string" },
                affiliationIdentifierScheme: { type: "string" },
                name: { type: "string" },
                schemeUri: { type: "string" },
              },
            },
          },
          nameIdentifiers: {
            type: "array",
            items: {
              type: "object",
              properties: {
                schemeUri: { type: "string" },
                nameIdentifier: { type: "string" },
                nameIdentifierScheme: { type: "string" },
              },
            },
          }, 
        },
        required: ["name"]
      },
    },
    Titles: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          titleType: {
            type: "string",
            enum: ["AlternativeTitle", "Subtitle", "TranslatedTitle", "Other"],
          },
          lang: { type: "string" },
        },
        required: ["title"],
      },
    },
    Publisher: {
      type: "object",
      properties: {
        name: { type: "string" },
        publisherIdentifier: { type: "string" },
        publisherIdentifierScheme: { type: "string" },
        schemeUri: { type: "string" },
        lang: { type: "string" },
      },
      required: ["name"],
    },
    PublicationYear: { type: "number" },
    Subjects: {
      type: "array",
      items: {
        type: "object",
        properties: {
          subject: { type: "string" },
          schemeUri: { type: "string" },
          valueUri: { type: "string" },
          subjectScheme: { type: "string" },
          lang: { type: "string" },
        },
        required: ["subject"],
      },
    },
    Contributors: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          nameType: { type: "string", enum: ["Personal", "Organizational"] },
          givenName: { type: "string" },
          familyName: { type: "string" },
          affiliations: {
            type: "array",
            items: {
              type: "object",
              properties: {
                affiliationIdentifier: { type: "string" },
                affiliationIdentifierScheme: { type: "string" },
                name: { type: "string" },
                schemeUri: { type: "string" },
              },
            },
          },
          contributorType: { type: "string", enum: contributorTypes },
          nameIdentifiers: {
            type: "array",
            items: {
              type: "object",
              properties: {
                schemeUri: { type: "string" },
                nameIdentifier: { type: "string" },
                nameIdentifierScheme: { type: "string" },
              },
            },
          },
        },
        required: ["name"],
      },
    },
    Dates: {
      type:"array",
      items:{
        type: "object",
        properties: {
          date: { type: "string" },
          dateInformation: { type: "string" },
          dateType: {
            type: "string",
            enum: [
              "Accepted",
              "Available",
              "Copyrighted",
              "Collected",
              "Coverage",
              "Created",
              "Issued",
              "Submitted",
              "Updated",
              "Valid",
              "Withdrawn",
              "Other",
            ],
          }
        },
      },
    },
    Language: {
      type: "string",
    },
    ResourceType: {
      type: "object",
      properties: {
        resourceTypeGeneral: { type: "string", enum: resourceTypes },
        resourceType: { type: "string" },
      },
      required: ["resourceType", "resourceTypeGeneral"],
    },
    AlternateIdentifiers: {
      type:"array",
      items:{
      type: "object",
      properties: {
        alternateIdentifierType: { type: "string" },
        alternateIdentifier: { type: "string" },
      },
      required: ["alternateIdentifierType"],
    }
    },
    RelatedIdentifiers: {
      type:"array",
      items:{
      type: "object",
      properties: {
        relationType: { type: "string", enum: relationType },
        relatedIdentifier: { type: "string" },
        resourceTypeGeneral: { type: "string", enum: resourceTypeGeneral },
        relatedIdentifierType: { type: "string", enum: identifierType },
        schemeUri: { type: "string" },
        relatedMetadataScheme: { type: "string" },
      },
      required: ["relationType", "relatedIdentifier","relatedIdentifierType"],
    }
    },
    Size: {
      type: "array",
      items: {
        type: "string",
      },
    },
    Formats: {
      type: "array",
      items: {
        type: "string",
      },
    },
    Version: {
      type: "string",
    },
    rightsList: {
      type: "array",
      items: {
        type: "object",
        properties: {
          rights: { type: "string" },
          rightsUri: { type: "string" },
          schemeUri: { type: "string" },
          rightsIdentifier: { type: "string" },
          rightsIdentifierScheme: { type: "string" },
          lang: { type: "string" },
        },
        required: ["rights"],
      },
    },
    Description: {
      type: "array",
      items: {
        type: "object",
        properties: {
          lang: { type: "string" },
          description: { type: "string" },
          descriptionType: {
            type: "string",
            enum: [
              "Abstract",
              "Methods",
              "SeriesInformation",
              "TableOfContents",
              "TechnicalInfo",
              "Other",
            ],
          },
        },
        required: ["description", "descriptionType"],
      },
    },
    GeoLocation: {
      type: "array",
      items: {
        type: "object",
        properties: {
          geoLocationPoint: {
            type: "object",
            properties: {
              pointLongitude: { type: "string" },
              pointLatitude: { type: "string" },
            },
          },
          geoLocationBox: {
            type: "object",
            properties: {
              westBoundLongitude: { type: "string" },
              eastBoundLongitude: { type: "string" },
              southBoundLatitude: { type: "string" },
              northBoundLatitude: { type: "string" },
            },
          },
          geoLocationPlace: { type: "string" },
          geoLocationPolygon: {
            type: "object",
            properties: {
              polygonPoint: { type: "string" },
              pointLongitude: { type: "string" },
              pointLatitude: { type: "string" },
              inPolygonPoint: { type: "string" },
            },
          },
        },
      },
    },
    FundingReferences: {
      type: "array",
      items: {
        type: "object",
        properties: {
          awardUri: { type: "string" },
          awardTitle: { type: "string" },
          funderName: { type: "string" },
          awardNumber: { type: "string" },
          funderIdentifier: { type: "string" },
          funderIdentifierType: { type: "string" },
        },
        required: ["funderName"],
      },
    },
    RelatedItems: {
      type: "array",
      items: {
        type: "object",
        properties: {
          relatedItemType: { type: "string", enum: resourceTypes },
          relationType: { type: "string", enum: relationType },
          relatedItemIdentifier: {
            type: "object",
            properties: {
              relatedItemIdentifierType: {
                type: "string",
                enum: identifierType,
              },
              relatedMetadataScheme: { type: "string" },
              schemeUri: { type: "string" },
              schemeType: { type: "string" },
            },
          },
          creators: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                nameType: {
                  type: "string",
                  enum: ["Personal", "Organizational"],
                },
                givenName: { type: "string" },
                familyName: { type: "string" },
                affiliations: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      affiliationIdentifier: { type: "string" },
                      affiliationIdentifierScheme: { type: "string" },
                      name: { type: "string" },
                      schemeUri: { type: "string" },
                    },
                  },
                },
                nameIdentifiers: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      schemeUri: { type: "string" },
                      nameIdentifier: { type: "string" },
                      nameIdentifierScheme: { type: "string" },
                    },
                  },
                },
              },
              required: ["name"],
            },
          },
          publicationYear: {
            type: "number",
          },
          volume: {
            type: "string",
          },
          issue: {
            type: "string",
          },
          number: {
            type: "object",
            properties: {
              number: { type: "string" },
              numberType: {
                type: "string",
                enum: ["Article", "Chapter", "Report", "Other"],
              },
            },
          },
          firstPage: {
            type: "string",
          },
          lastPage: {
            type: "string",
          },
          publisher: {
            type: "string",
          },
          edition: {
            type: "string",
          },
          contributors: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                nameType: { type: "string", enum: ["Personal", "Organizational"] },
                givenName: { type: "string" },
                familyName: { type: "string" },
                affiliations: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      affiliationIdentifier: { type: "string" },
                      affiliationIdentifierScheme: { type: "string" },
                      name: { type: "string" },
                      schemeUri: { type: "string" },
                    },
                  },
                },
                contributorType: { type: "string", enum: contributorTypes },
                nameIdentifiers: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      schemeUri: { type: "string" },
                      nameIdentifier: { type: "string" },
                      nameIdentifierScheme: { type: "string" },
                    },
                  },
                },
              },
              required: ["name"],
            },
          },
        },
        required: ["relatedItemType", "relationType"],
      },
    },
  },
  required: [
    "Identifier",
    "Creators",
    "Titles",
    "Publisher",
    "PublicationYear",
    "ResourceType",
  ],
};

// Database interface
interface DatabaseCollections {
  metadata: RxCollection<any>;
}

class MetadataDB extends Dexie {
  metadata!: Table<dcMetadata_4_6, string>;

  constructor() {
    super("metadataDB6");

    this.version(1).stores({
      metadata: "id, *Creators.name, *Titles.title, Publisher.name, PublicationYear",
    });
  }
}

// Hook for database initialization
export function useDatabase() {
  const [db, setDb] = useState<MetadataDB | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function initDatabase() {
      try {
        setIsLoading(true);
        const database = new MetadataDB();
        setDb(database);
        setError(null);
      } catch (err) {
        console.error("Database initialization failed:", err);
        setError(
          err instanceof Error ? err : new Error("Unknown database error")
        );
      } finally {
        setIsLoading(false);
      }
    }

    initDatabase();
  }, []);

  return { db, isLoading, error };
}