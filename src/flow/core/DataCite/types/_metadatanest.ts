interface nested_dcMetadata_4_6 {
    ID: string;
    Identifier: {
        identifier: string;
        identifierType: "DOI";
    };
    Creators: {
        name: string;
        nameType?: "Personal" | "Organizational";
        givenName: string;
        familyName: string;
        nameIdentifiers: {
            nameIdentifier: string;
            nameIdentifierScheme: string;
            schemeUri: string;
        }[];
        affiliation: {
            name: string;
            affiliationIdentifier: string;
            affiliationIdentifierScheme: string;
            schemeUri: string;
        }[];
    }[];
    Titles: {
        title: string;
        lang: string;
        titleType?: "Other" | "AlternativeTitle" | "Subtitle" | "TranslatedTitle";
    }[];
    Publisher: {
        name: string;
        publisherIdentifier: string;
        publisherIdentifierScheme: string;
        schemeURI: string;
    };
    PublicationYear: string;
    Subjects: {
        subject: string;
        schemeUri: string;
        valueUri: string;
        subjectScheme: string;
        lang: string;
        classificationCode: string;
    }[];
    Contributors: {
        name: string;
        nameType?: "Personal" | "Organizational";
        givenName: string;
        familyName: string;
        nameIdentifiers: {
            nameIdentifier: string;
            nameIdentifierScheme: string;
            schemeUri: string;
        }[];
        affiliation: {
            name: string;
            affiliationIdentifier: string;
            affiliationIdentifierScheme: string;
            schemeUri: string;
        }[];
        contributorType: ("Other" | "ContactPerson" | "DataCollector" | "DataCurator" | "DataManager" | "Distributor" | "Editor" | "HostingInstitution" | "Producer" | "ProjectLeader" | "ProjectManager" | "ProjectMember" | "RegistrationAgency" | "RegistrationAuthority" | "RelatedPerson" | "Researcher" | "ResearchGroup" | "RightsHolder" | "Sponsor" | "Supervisor" | "Translator" | "WorkPackageLeader")[];
    }[];
    Dates: {
        date: string;
        dateType: "Other" | "Accepted" | "Available" | "Copyrighted" | "Collected" | "Coverage" | "Created" | "Issued" | "Submitted" | "Updated" | "Valid" | "Withdrawn";
        dateInformation: string;
    }[];
    Language: string;
    ResourceType: {
        resourceType: string;
        resourceTypeGeneral: "JournalArticle" | "Audiovisual" | "Award" | "Book" | "BookChapter" | "Collection" | "ComputationalNotebook" | "ConferencePaper" | "ConferenceProceeding" | "DataPaper" | "Dataset" | "Dissertation" | "Event" | "Image" | "InteractiveResource" | "Instrument" | "Journal" | "Model" | "OutputManagementPlan" | "PeerReview" | "PhysicalObject" | "Preprint" | "Project" | "Report" | "Service" | "Software" | "Sound" | "Standard" | "StudyRegistration" | "Text" | "Workflow" | "Other";
    };
    AlternateIdentifiers: {
        alternateIdentifier: string;
        alternateIdentifierType: string;
    }[];
    RelatedIdentifiers: {
        relationType: "IsCitedBy" | "Cites" | "IsSupplementTo" | "IsSupplementedBy" | "IsContinuedBy" | "Continues" | "IsDescribedBy" | "Describes" | "HasMetadata" | "IsMetadataFor" | "HasVersion" | "IsVersionOf" | "IsNewVersionOf" | "IsPreviousVersionOf" | "IsPartOf" | "HasPart" | "IsPublishedIn" | "IsReferencedBy" | "References" | "IsDocumentedBy" | "Documents" | "IsCompiledBy" | "Compiles" | "IsVariantFormOf" | "IsOriginalFormOf" | "IsIdenticalTo" | "IsReviewedBy" | "Reviews" | "IsDerivedFrom" | "IsSourceOf" | "IsRequiredBy" | "Requires" | "IsObsoletedBy" | "Obsoletes" | "IsCollectedBy" | "Collects" | "IsTranslationOf" | "HasTranslation";
        relatedIdentifier?: string;
        resourceTypeGeneral?: "JournalArticle" | "Audiovisual" | "Award" | "Book" | "BookChapter" | "Collection" | "ComputationalNotebook" | "ConferencePaper" | "ConferenceProceeding" | "DataPaper" | "Dataset" | "Dissertation" | "Event" | "Image" | "InteractiveResource" | "Instrument" | "Journal" | "Model" | "OutputManagementPlan" | "PeerReview" | "PhysicalObject" | "Preprint" | "Project" | "Report" | "Service" | "Software" | "Sound" | "Standard" | "StudyRegistration" | "Text" | "Workflow" | "Other";
        relatedIdentifierType?: "DOI" | "ARK" | "arXiv" | "bibcode" | "CSTR" | "EAN13" | "EISSN" | "Handle" | "IGSN" | "ISBN" | "ISSN" | "ISTC" | "LISSN" | "LSID" | "PMID" | "PURL" | "RRID" | "UPC" | "URL" | "URN" | "w3id";
        schemeUri?: string;
        schemeType?: string;
        relatedMetadataScheme?: string;
    }[];
    Sizes: string[];
    Format: string;
    Version: string;
    Rights: {
        rights: string;
        rightsUri: string;
        schemeUri: string;
        rightsIdentifier: string;
        rightsIdentifierScheme: string;
        lang: string;
    };
    Description: {
        description: string;
        descriptionType: "Other" | "Abstract" | "Methods" | "SeriesInformation" | "TableOfContents" | "TechnicalInfo";
        lang: string;
    }[];
    GeoLocation: {
        geoLocationPoint: {
            pointLongitude: number;
            pointLatitude: number;
        };
        geoLocationBox: {
            westBoundLongitude: number;
            eastBoundLongitude: number;
            southBoundLatitude: number;
            northBoundLatitude: number;
        };
        geoLocationPlace: string;
        geoLocationPolygon: {
            polygonPoints: {
                pointLongitude: number;
                pointLatitude: number;
            }[];
            inPolygonPoint: {
                pointLongitude: number;
                pointLatitude: number;
            };
        }[];
    }[];
    FundingReferences: {
        funderName: string;
        awardUri: string;
        awardTitle: string;
        awardNumber: string;
        funderIdentifier: string;
        funderIdentifierType?: "Other" | "Crossref Funder ID" | "GRID" | "ISNI" | "ROR";
        schemeURI: string;
    }[];
    RelatedItems: {
        relatedItemType: "JournalArticle" | "Audiovisual" | "Award" | "Book" | "BookChapter" | "Collection" | "ComputationalNotebook" | "ConferencePaper" | "ConferenceProceeding" | "DataPaper" | "Dataset" | "Dissertation" | "Event" | "Image" | "InteractiveResource" | "Instrument" | "Journal" | "Model" | "OutputManagementPlan" | "PeerReview" | "PhysicalObject" | "Preprint" | "Project" | "Report" | "Service" | "Software" | "Sound" | "Standard" | "StudyRegistration" | "Text" | "Workflow" | "Other";
        relationType: "IsCitedBy" | "Cites" | "IsSupplementTo" | "IsSupplementedBy" | "IsContinuedBy" | "Continues" | "IsDescribedBy" | "Describes" | "HasMetadata" | "IsMetadataFor" | "HasVersion" | "IsVersionOf" | "IsNewVersionOf" | "IsPreviousVersionOf" | "IsPartOf" | "HasPart" | "IsPublishedIn" | "IsReferencedBy" | "References" | "IsDocumentedBy" | "Documents" | "IsCompiledBy" | "Compiles" | "IsVariantFormOf" | "IsOriginalFormOf" | "IsIdenticalTo" | "IsReviewedBy" | "Reviews" | "IsDerivedFrom" | "IsSourceOf" | "IsRequiredBy" | "Requires" | "IsObsoletedBy" | "Obsoletes" | "IsCollectedBy" | "Collects" | "IsTranslationOf" | "HasTranslation";
        relatedItemIdentifier: {
            identifier: string;
            identifierType: "DOI";
        };
        creators: {
            name: string;
            nameType?: "Personal" | "Organizational";
            givenName: string;
            familyName: string;
            nameIdentifiers: {
                nameIdentifier: string;
                nameIdentifierScheme: string;
                schemeUri: string;
            }[];
            affiliation: {
                name: string;
                affiliationIdentifier: string;
                affiliationIdentifierScheme: string;
                schemeUri: string;
            }[];
        }[];
        title: {
            title: string;
            lang: string;
            titleType?: "Other" | "AlternativeTitle" | "Subtitle" | "TranslatedTitle";
        };
        publicationYear: string;
        volume: string;
        issue: string;
        number: string;
        firstPage: number;
        lastPage: number;
        publisher: string;
        edition: string;
        contributors: {
            name: string;
            nameType?: "Personal" | "Organizational";
            givenName: string;
            familyName: string;
            nameIdentifiers: {
                nameIdentifier: string;
                nameIdentifierScheme: string;
                schemeUri: string;
            }[];
            affiliation: {
                name: string;
                affiliationIdentifier: string;
                affiliationIdentifierScheme: string;
                schemeUri: string;
            }[];
            contributorType: ("Other" | "ContactPerson" | "DataCollector" | "DataCurator" | "DataManager" | "Distributor" | "Editor" | "HostingInstitution" | "Producer" | "ProjectLeader" | "ProjectManager" | "ProjectMember" | "RegistrationAgency" | "RegistrationAuthority" | "RelatedPerson" | "Researcher" | "ResearchGroup" | "RightsHolder" | "Sponsor" | "Supervisor" | "Translator" | "WorkPackageLeader")[];
        }[];
    }[];
}