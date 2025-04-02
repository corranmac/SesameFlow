import { type dcMetadata_4_6 } from '../../../../plugins/data-cite/metadata';
/**
 * Type definition for OpenAlex Work schema
 */


interface OpenAlexWork {
    id: string;
    doi?: string;
    title: string;
    display_name: string;
    publication_year: number;
    publication_date?: string;
    type: string;
    type_crossref?: string;
    is_paratext?: boolean;
    is_retracted?: boolean;
    has_fulltext?: boolean;
    fulltext_origin?: string;
    cited_by_count: number;
    cited_by_api_url?: string;
    abstract_inverted_index?: Record<string, number[]>;
    keywords?: {
      id: string;
      display_name: string;
      score: number;
    }[];
    authorships: {
      author_position: string;
      author: {
        id: string;
        display_name: string;
        orcid?: string;
      };
      institutions?: {
        id: string;
        display_name: string;
        ror?: string;
        country_code?: string;
        type?: string;
      }[];
      is_corresponding?: boolean;
    }[];
    countries_distinct_count?: number;
    institutions_distinct_count?: number;
    corresponding_author_ids?: string[];
    corresponding_institution_ids?: string[];
    apc_list?: {
      value: number;
      currency: string;
      value_usd: number;
      provenance: string;
    };
    apc_paid?: {
      value: number;
      currency: string;
      value_usd: number;
      provenance: string;
    };
    biblio?: {
      volume?: string;
      issue?: string;
      first_page?: string;
      last_page?: string;
    };
    primary_location?: {
      is_oa: boolean;
      landing_page_url?: string;
      pdf_url?: string | null;
      source: {
        id: string;
        display_name: string;
        issn_l?: string | null;
        issn?: string[] | null;
        host_organization?: string | null;
        type: "journal" | "repository" | "conference";
      };
      license?: string | null;
      version?: "publishedVersion" | "acceptedVersion" | "submittedVersion" | null;
    };
    best_oa_location?: {
      is_oa: boolean;
      landing_page_url?: string;
      pdf_url?: string | null;
      source: {
        id: string;
        display_name: string;
        issn_l?: string | null;
        issn?: string[] | null;
        host_organization?: string | null;
        type: "journal" | "repository" | "conference";
      };
      license?: string | null;
      version?: "publishedVersion" | "acceptedVersion" | "submittedVersion" | null;
    };
    locations: {
      is_oa: boolean;
      landing_page_url?: string;
      pdf_url?: string | null;
      source: {
        id: string;
        display_name: string;
        issn_l?: string | null;
        issn?: string[] | null;
        host_organization?: string | null;
        type: "journal" | "repository" | "conference";
      };
      license?: string | null;
      version?: "publishedVersion" | "acceptedVersion" | "submittedVersion" | null;
    }[];
    locations_count?: number;
    open_access: {
      is_oa: boolean;
      oa_status: "diamond" | "gold" | "green" | "hybrid" | "bronze" | "closed";
      oa_url?: string;
      any_repository_has_fulltext: boolean;
    };
    concepts: {
      id: string;
      wikidata?: string;
      display_name: string;
      level: number;
      score: number;
    }[];
    primary_topic?: {
      id: string;
      display_name: string;
      score: number;
      subfield: {
        id: number;
        display_name: string;
      };
      field: {
        id: number;
        display_name: string;
      };
      domain: {
        id: number;
        display_name: string;
      };
    };
    topics?: {
      id: string;
      display_name: string;
      score: number;
      subfield: {
        id: number;
        display_name: string;
      };
      field: {
        id: number;
        display_name: string;
      };
      domain: {
        id: number;
        display_name: string;
      };
    }[];
    mesh?: {
      descriptor_ui: string;
      descriptor_name: string;
      qualifier_ui?: string;
      qualifier_name?: string;
      is_major_topic: boolean;
    }[];
    sustainable_development_goals?: {
      id: string;
      display_name: string;
      score: number;
    }[];
    referenced_works?: string[];
    related_works?: string[];
    citation_normalized_percentile?: {
      value: number;
      is_in_top_1_percent?: boolean;
      is_in_top_10_percent?: boolean;
    };
    language?: string;
    indexed_in?: ("arxiv" | "crossref" | "doaj" | "pubmed")[];
    grants?: {
      funder: string;
      funder_display_name: string;
      award_id?: string | null;
    }[];
    fwci?: number;
    counts_by_year?: {
      year: number;
      cited_by_count: number;
    }[];
    ids: {
      openalex: string;
      doi?: string;
      mag?: number;
      pmid?: string;
      pmcid?: string;
    };
    created_date: string;
    updated_date: string;
  }
  

  /**
   * Helper function to parse author name into given name and family name
   * @param fullName Full name of the author
   * @returns Object with givenName and familyName
   */
  function parseAuthorName(fullName: string): { givenName: string; familyName: string } {
    const nameParts = fullName.split(' ');
    
    if (nameParts.length === 1) {
      return {
        givenName: '',
        familyName: nameParts[0]
      };
    }
    
    const familyName = nameParts.pop() || '';
    const givenName = nameParts.join(' ');
    
    return {
      givenName,
      familyName
    };
  }
  
  /**
   * Map OpenAlex type to DC ResourceType
   * @param type OpenAlex work type
   * @returns DC ResourceType general value
   */
  function mapResourceType(type: string): "JournalArticle" | "BookChapter" | "Book" | "ConferencePaper" | "Dataset" | "Preprint" | "Other" {
    const typeMap: Record<string, any> = {
      "article": "JournalArticle",
      "book": "Book",
      "book-chapter": "BookChapter",
      "conference-paper": "ConferencePaper",
      "dataset": "Dataset",
      "preprint": "Preprint"
    };
    
    return typeMap[type] || "Other";
  }
  
  /**
   * Map OpenAlex concepts to DC subjects
   * @param concepts Array of OpenAlex concepts
   * @returns Array of DC subjects
   */
  function mapSubjects(concepts: OpenAlexWork["concepts"]): dcMetadata_4_6["Subjects"] {
    if (!concepts || !concepts.length) return [];
    
    return concepts.map(concept => ({
      subject: concept.display_name,
      schemeUri: concept.wikidata || "",
      valueUri: concept.id,
      subjectScheme: "OpenAlex",
      lang: "en",
      classificationCode: concept.id.split('/').pop() || ""
    }));
  }
  
  /**
   * Generate alternate identifiers from OpenAlex IDs
   * @param ids OpenAlex IDs object
   * @returns Array of DC alternate identifiers
   */
  function generateAlternateIdentifiers(ids: OpenAlexWork["ids"]): dcMetadata_4_6["AlternateIdentifiers"] {
    const alternateIds: dcMetadata_4_6["AlternateIdentifiers"] = [];
    
    if (ids.openalex) {
      alternateIds.push({
        alternateIdentifier: ids.openalex,
        alternateIdentifierType: "OpenAlex"
      });
    }
    
    if (ids.mag) {
      alternateIds.push({
        alternateIdentifier: ids.mag.toString(),
        alternateIdentifierType: "MAG"
      });
    }
    
    if (ids.pmid) {
      alternateIds.push({
        alternateIdentifier: ids.pmid,
        alternateIdentifierType: "PMID"
      });
    }
    
    if (ids.pmcid) {
      alternateIds.push({
        alternateIdentifier: ids.pmcid,
        alternateIdentifierType: "PMCID"
      });
    }
    
    return alternateIds;
  }
  
  /**
   * Generate related identifiers from OpenAlex referenced works
   * @param referencedWorks Array of OpenAlex referenced work IDs
   * @returns Array of DC related identifiers
   */
  function generateRelatedIdentifiers(referencedWorks?: string[]): dcMetadata_4_6["RelatedIdentifiers"] {
    if (!referencedWorks || !referencedWorks.length) return [];
    
    return referencedWorks.map(work => ({
      relationType: "References",
      relatedIdentifier: work,
      relatedIdentifierType: "URL",
      resourceTypeGeneral: "JournalArticle"
    }));
  }
  
  /**
   * Generate funding references from OpenAlex grants
   * @param grants Array of OpenAlex grant objects
   * @returns Array of DC funding references
   */
  function generateFundingReferences(grants?: OpenAlexWork["grants"]): dcMetadata_4_6["FundingReferences"] {
    if (!grants || !grants.length) return [];
    
    return grants.map(grant => ({
      funderName: grant.funder_display_name,
      funderIdentifier: grant.funder,
      funderIdentifierType: "ROR",
      awardNumber: grant.award_id || "",
      awardTitle: "",
      awardUri: "",
      schemeURI: ""
    }));
  }
  
  /**
   * Extract abstract from OpenAlex inverted index
   * @param invertedIndex OpenAlex abstract inverted index
   * @returns Reconstructed abstract text or empty string
   */
  function extractAbstract(invertedIndex?: Record<string, number[]>): string {
    if (!invertedIndex) return "";
    
    // This is a simplified implementation that won't perfectly reconstruct the abstract
    // A complete implementation would need to build the abstract from the inverted index
    const words = Object.keys(invertedIndex);
    const positions = Object.values(invertedIndex).flat();
    
    // Create an array of word positions
    const wordPositions = words.flatMap(word => {
      const positions = invertedIndex[word];
      return positions.map(pos => ({ word, position: pos }));
    });
    
    // Sort by position
    wordPositions.sort((a, b) => a.position - b.position);
    
    // Join words
    return wordPositions.map(wp => wp.word).join(' ');
  }
  
  /**
   * Converts OpenAlex Work to DC Metadata format
   * @param work OpenAlex Work object
   * @returns DC Metadata object
   */
  function convertOpenAlexToDCMetadata(work: OpenAlexWork): dcMetadata_4_6 {
    // Map creators from authorships
    const creators = work.authorships.map(authorship => {
      const { givenName, familyName } = parseAuthorName(authorship.author.display_name);
      
      return {
        name: authorship.author.display_name,
        nameType: "Personal" as "Personal",
        givenName,
        familyName,
        nameIdentifiers: authorship.author.orcid ? [
          {
            nameIdentifier: authorship.author.orcid,
            nameIdentifierScheme: "ORCID",
            schemeUri: "https://orcid.org"
          }
        ] : [],
        affiliation: authorship.institutions?.map(inst => ({
          name: inst.display_name,
          affiliationIdentifier: inst.id,
          affiliationIdentifierScheme: "OpenAlex",
          schemeUri: inst.ror || ""
        })) || [],
        language: "en"
      };
    });
    
    // Find publisher from primary location
    const publisher = work.primary_location?.source.display_name || "";
    
    // Get publisher identifier
    const publisherIdentifier = work.primary_location?.source.id || "";
    
    // Map open access information to rights
    const rights = {
      rights: work.open_access.is_oa ? `Open Access (${work.open_access.oa_status})` : "Closed Access",
      rightsUri: work.open_access.oa_url || "",
      schemeUri: "",
      rightsIdentifier: work.primary_location?.license || "",
      rightsIdentifierScheme: "License",
      lang: "en"
    };
  
    // Basic mapping of OpenAlex work to DC metadata
    const dcMetadata: dcMetadata_4_6 = {
      id: work.id,
      Identifier: {
        identifier: work.doi || work.id,
        identifierType: "DOI"
      },
      Creators: creators,
      Titles: [
        {
          title: work.title,
          lang: "en",
        }
      ],
      Publisher: {
        name: publisher,
        publisherIdentifier: publisherIdentifier,
        publisherIdentifierScheme: "OpenAlex",
        schemeURI: ""
      },
      PublicationYear: work.publication_year.toString(),
      Subjects: mapSubjects(work.concepts),
      Contributors: [], // Could be mapped from additional authors if classification is available
      Dates: [
        {
          date: work.publication_date || work.created_date,
          dateType: "Issued",
          dateInformation: "Publication date"
        },
        {
          date: work.updated_date,
          dateType: "Updated",
          dateInformation: "Last updated in OpenAlex"
        }
      ],
      Language: work.language || "en",
      ResourceType: {
        resourceType: work.type,
        resourceTypeGeneral: mapResourceType(work.type)
      },
      AlternateIdentifiers: generateAlternateIdentifiers(work.ids),
      RelatedIdentifiers: generateRelatedIdentifiers(work.referenced_works),
      Sizes: [],
      Format: "",
      Version: work.primary_location?.version || "",
      Rights: rights,
      Description: work.abstract_inverted_index ? [
        {
          description: extractAbstract(work.abstract_inverted_index),
          descriptionType: "Abstract",
          lang: "en"
        }
      ] : [],
      GeoLocation: [],
      FundingReferences: generateFundingReferences(work.grants),
      RelatedItems: []
    };
  
    return dcMetadata;
  }
  
  /**
   * Process a OpenAlex article object containing OpenAlex data and convert it to DC Metadata
   * @param json OpenAlex Article JSON
   * @returns DC Metadata object
   */
function processOpenAlexObject(json: unknown): dcMetadata_4_6{
    try {
      const openAlexWork = json as OpenAlexWork;
      
      return convertOpenAlexToDCMetadata(openAlexWork);
    } catch (error) {
      console.error('Error processing OpenAlex file:', error);
      throw error;
    }
  }
  
  // Export the functions
  export {
    convertOpenAlexToDCMetadata,
    processOpenAlexObject
  };