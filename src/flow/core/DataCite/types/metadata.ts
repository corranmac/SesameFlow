import { dcRelatedItems, dcIdentifier, dcCreators, dcTitles, dcPublisher, dcPublicationYear, dcSubjects, dcContributors, dcDates, dcLanguage, dcResourceType, dcAlternateIdentifiers, dcRelatedIdentifiers, dcSizes, dcFormat, dcVersion, dcRights, dcDescriptions, dcGeoLocations, dcFundingReferences } from ".";

export type dcMetadata_4_6 = {
    id: string;
    identifier: dcIdentifier; //M
    creators: dcCreators; //M
    titles: dcTitles; //M
    publisher: dcPublisher; //M
    publicationYear: dcPublicationYear; //M
    subjects?: dcSubjects; //R
    contributors?: dcContributors; //R
    dates?: dcDates; //R
    language?: dcLanguage; //R
    resourceType: dcResourceType;
    alternateIdentifiers?: dcAlternateIdentifiers; //O
    relatedIdentifiers?: dcRelatedIdentifiers; //O
    sizes?: dcSizes; //O
    format?: dcFormat; //O
    version?: dcVersion; //O
    rights?: dcRights; //O
    description?: dcDescriptions; //O
    geoLocation?: dcGeoLocations; //R
    fundingReferences?: dcFundingReferences; //O
    relatedItems?: dcRelatedItems; //O
}

