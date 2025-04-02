import { dcRelatedItems, dcIdentifier, dcCreators, dcTitles, dcPublisher, dcPublicationYear, dcSubjects, dcContributors, dcDates, dcLanguage, dcResourceType, dcAlternateIdentifiers, dcRelatedIdentifiers, dcSizes, dcFormat, dcVersion, dcRights, dcDescriptions, dcGeoLocations, dcFundingReferences } from ".";

export type dcMetadata_4_6 = {
    id: string;
    Identifier: dcIdentifier; //M
    Creators: dcCreators; //M
    Titles: dcTitles; //M
    Publisher: dcPublisher; //M
    PublicationYear: dcPublicationYear; //M
    Subjects?: dcSubjects; //R
    Contributors?: dcContributors; //R
    Dates?: dcDates; //R
    Language?: dcLanguage; //R
    ResourceType: dcResourceType;
    AlternateIdentifiers?: dcAlternateIdentifiers; //O
    RelatedIdentifiers?: dcRelatedIdentifiers; //O
    Sizes?: dcSizes; //O
    Format?: dcFormat; //O
    Version?: dcVersion; //O
    Rights?: dcRights; //O
    Description?: dcDescriptions; //O
    GeoLocation?: dcGeoLocations; //R
    FundingReferences?: dcFundingReferences; //O
    RelatedItems?: dcRelatedItems; //O
}

