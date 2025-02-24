
export const filters = [
    { value: "authorships.author.id", label: "Author ID", groupLabel:"Authorship", group:"authorship",inputType:"term" },
    { value: "authorships.author.orcid", label: "Author ORCID", groupLabel:"Authorship", group:"authorship",inputType:"term"},
    {
      value: "authorships.institutions.country_code",
      label: "Institution Country Code", groupLabel:"Authorship", group:"authorship",inputType:"term"
    },
    { value: "authorships.institutions.id", label: "Institution ID", groupLabel:"Authorship", group:"authorship",inputType:"term" },
    { value: "authorships.institutions.ror", label: "Institution ROR", groupLabel:"Authorship", group:"authorship",inputType:"term" },
    { value: "authorships.institutions.type", label: "Institution Type", groupLabel:"Authorship", group:"authorship",inputType:"term" },
    { value: "authorships.is_corresponding", label: "Is Corresponding", groupLabel:"Authorship", group:"authorship",inputType:"boolean" },
    { value: "apc_list.value", label: "APC Value", groupLabel:"APC", group:"apc",inputType:"range" },
    { value: "apc_list.currency", label: "APC Currency", groupLabel:"APC", group:"apc",inputType:"term" },
    { value: "apc_list.provenance", label: "APC Provenance", groupLabel:"APC", group:"apc",inputType:"term" },
    { value: "apc_list.value_usd", label: "APC Value USD", groupLabel:"APC", group:"apc",inputType:"range" },
    { value: "apc_paid.value", label: "APC Paid Value", groupLabel:"APC", group:"apc",inputType:"range" },
    { value: "apc_paid.currency", label: "APC Paid Currency", groupLabel:"APC", group:"apc",inputType:"term" },
    { value: "apc_paid.provenance", label: "APC Paid Provenance", groupLabel:"APC", group:"apc",inputType:"term" },
    { value: "apc_paid.value_usd", label: "APC Paid Value USD", groupLabel:"APC", group:"apc",inputType:"range"},
    { value: "best_oa_location.license", label: "Best OA Location License", groupLabel:"Open Access",  group:"open_access",inputType:"OA-license" },
    { value: "best_oa_location.source.id", label: "Best OA Location Source ID", groupLabel:"Open Access",  group:"open_access",inputType:"term"  },
    {
      value: "best_oa_location.source.is_in_doaj",
      label: "Best OA Location Source In DOAJ", groupLabel:"Open Access",  group:"open_access",inputType:"boolean"
    },
    {
      value: "best_oa_location.source.issn",
      label: "Best OA Location Source ISSN", groupLabel:"Open Access",  group:"open_access",inputType:"term"
    },
    {
      value: "best_oa_location.source.host_organization",
      label: "Best OA Location Source Host Organization", groupLabel:"Open Access",  group:"open_access",inputType:"term"
    },
    {
      value: "best_oa_location.source.type",
      label: "Best OA Location Source Type", groupLabel:"Open Access",  group:"open_access",inputType:"select"
    },
    { value: "best_oa_location.version", label: "Best OA Location Version", groupLabel:"Open Access",  group:"open_access",inputType:"select" },
    { value: "cited_by_count", label: "Cited By Count", groupLabel:"Citations",  group:"citations",inputType:"range"  },
    { value: "concepts.id", label: "Concept ID", groupLabel:"Concepts",  group:"concepts",inputType:"term"  },
    { value: "concepts.wikidata", label: "Concept Wikidata ID", groupLabel:"Concepts",  group:"concepts",inputType:"terms"  },
    { value: "corresponding_author_ids", label: "Corresponding Author IDs", groupLabel:"Correspondance", group:"correspondance",inputType:"terms"  },
    {
      value: "corresponding_institution_ids",
      label: "Corresponding Institution IDs", groupLabel:"Correspondance", group:"correspondance",inputType:"terms"
    },
    { value: "doi", label: "DOI", groupLabel:"Identifiers", group:"identifiers",inputType:"term" },
    { value: "grants.award_id", label: "Grant Award ID", groupLabel:"Funding", group:"funding",inputType:"term" },
    { value: "grants.funder", label: "Grant Funder",groupLabel:"Funding", group:"funding",inputType:"term" },
    { value: "ids.pmcid", label: "PMCID", groupLabel:"Identifiers", group:"identifiers",inputType:"term" },
    { value: "ids.pmid", label: "PMID", groupLabel:"Identifiers", group:"identifiers",inputType:"term" },
    { value: "ids.openalex", label: "OpenAlex ID", groupLabel:"Identifiers", group:"identifiers",inputType:"term" },
    { value: "ids.mag", label: "MAG ID", groupLabel:"Identifiers", group:"identifiers",inputType:"term" },
    { value: "is_paratext", label: "Is Paratext", groupLabel:"Identifiers", group:"identifiers",inputType:"boolean" },
    { value: "is_retracted", label: "Is Retracted", groupLabel:"Core", group:"core",inputType:"boolean" },
    { value: "language", label: "Language", groupLabel:"Core", group:"core",inputType:"language_code" },
    { value: "locations.is_oa", label: "Location is OA", groupLabel:"Open Access",  group:"open_access",inputType:"boolean" },
    { value: "locations.license", label: "Location License", groupLabel:"Open Access",  group:"open_access",inputType:"OA-license" },
    { value: "locations.source.id", label: "Location Source ID", groupLabel:"Publication",  group:"publication",inputType:"term" },
    { value: "locations.source.is_in_doaj", label: "Location Source In DOAJ", groupLabel:"Publication",  group:"publication",inputType:"boolean"  },
    { value: "locations.source.issn", label: "Location Source ISSN", groupLabel:"Publication",  group:"publication",inputType:"term"  },
    {
      value: "locations.source.host_organization",
      label: "Location Source Host Organization", groupLabel:"Publication",  group:"publication",inputType:"term"
    },
    { value: "locations.source.type", label: "Location Source Type", groupLabel:"Publication",  group:"publication",inputType:"select"  },
    { value: "locations.version", label: "Location Version", groupLabel:"Publication",  group:"publication",inputType:"term"  },
    { value: "locations_count", label: "Location Count", groupLabel:"Publication",  group:"publication",inputType:"range"  },
    {
      value: "open_access.any_repository_has_fulltext",
      label: "Any Repository has Fulltext", groupLabel:"Open Access",  group:"open_access",inputType:"boolean" 
    },
    { value: "open_access.is_oa", label: "Is OA", groupLabel:"Core", group:"core",inputType:"boolean"  },
    { value: "open_access.oa_status", label: "OA Status", groupLabel:"Core", group:"core",inputType:"OA-license" },
    { value: "primary_location.is_oa", label: "Primary Location is OA", groupLabel:"Open Access",  group:"open_access",inputType:"boolean" },
    { value: "primary_location.license", label: "Primary Location License", groupLabel:"Open Access",  group:"open_access",inputType:"OA-license" },
    { value: "primary_location.source.id", label: "Primary Location Source ID", groupLabel:"Open Access",  group:"open_access",inputType:"term" },
    {
      value: "primary_location.source.is_in_doaj",
      label: "Primary Location Source In DOAJ", groupLabel:"Publication",  group:"publication",inputType:"boolean"
    },
    {
      value: "primary_location.source.issn",
      label: "Primary Location Source ISSN", groupLabel:"Publication",  group:"publication",inputType:"term"
    },
    {
      value: "primary_location.source.host_organization",
      label: "Primary Location Source Host Organization", groupLabel:"Publication",  group:"publication",inputType:"term"
    },
    {
      value: "primary_location.source.type",
      label: "Primary Location Source Type", groupLabel:"Publication",  group:"publication",inputType:"OA-license"
    },
    { value: "primary_location.version", label: "Primary Location Version", groupLabel:"Publication",  group:"publication",inputType:"term" },
    { value: "publication_year", label: "Publication Year", groupLabel:"Core", group:"core",inputType:"range" },
    { value: "publication_date", label: "Publication Date", groupLabel:"Core", group:"core",inputType:"date"},
    { value: "type", label: "Type", groupLabel:"Core", group:"core",inputType:"OA-pub_type" },
    { value: "abstract.search", label: "Abstract", groupLabel:"Search Fields",group:"search_fields",inputType:"term" },
    { value: "authors_count", label: "Author Count", groupLabel:"Authorship", group:"authorship",inputType:"range" },
    {
      value: "authorships.institutions.continent",
      label: "Institution Continent", groupLabel:"Authorship", group:"authorship",inputType:"country_code"
    },
    {
      value: "authorships.institutions.is_global_south",
      label: "Institution is Global South", groupLabel:"Authorship", group:"authorship",inputType:"boolean"
    },
    { value: "best_open_version", label: "Best Open Version", groupLabel:"Open Access",  group:"open_access",inputType:"OA-license" },
    { value: "cited_by", label: "Cited By", groupLabel:"Citations",  group:"citations",inputType:"term" },
    { value: "cites", label: "Cites", groupLabel:"Citations",  group:"citations",inputType:"term" },
    { value: "concepts_count", label: "Concept Count", groupLabel:"Concepts",  group:"concepts",inputType:"range" },
    { value: "default.search", label: "Default Search", groupLabel:"Search Fields",group:"search_fields",inputType:"term" },
    { value: "display_name.search", label: "Display Name Search", groupLabel:"Authorship", group:"authorship",inputType:"term" },
    { value: "from_created_date", label: "From Created Date", groupLabel:"Publication Dates",group:"publication_dates",inputType:"date" },
    { value: "from_publication_date", label: "From Publication Date", groupLabel:"Publication Dates",group:"publication_dates",inputType:"date" },
    { value: "from_updated_date", label: "From Updated Date", groupLabel:"Publication Dates",group:"publication_dates",inputType:"date" },
    { value: "fulltext.search", label: "Fulltext Search", groupLabel:"Search Fields",group:"search_fields",inputType:"term" },
    { value: "has_abstract", label: "Has Abstract", groupLabel:"Core", group:"core",inputType:"boolean" },
    { value: "has_doi", label: "Has DOI", groupLabel:"Core", group:"core",inputType:"boolean" },
    {
      value: "has_oa_accepted_or_published_version",
      label: "Has OA Accepted/Published Version", groupLabel:"Open Access",  group:"open_access",inputType:"boolean"
    },
    { value: "has_oa_submitted_version", label: "Has OA Submitted Version", groupLabel:"Open Access",  group:"open_access",inputType:"boolean" },
    { value: "has_orcid", label: "Has ORCID", groupLabel:"Identifiers", group:"identifiers",inputType:"boolean" },
    { value: "has_pmcid", label: "Has PMCID", groupLabel:"Identifiers", group:"identifiers",inputType:"boolean" },
    { value: "has_pmid", label: "Has PMID", groupLabel:"Identifiers", group:"identifiers",inputType:"boolean" },
    { value: "has_ngrams", label: "Has Ngrams", groupLabel:"Misc",group:"misc",inputType:"boolean" },
    { value: "has_references", label: "Has References", groupLabel:"Citations",  group:"citations",inputType:"boolean" },
    { value: "journal", label: "Journal", groupLabel:"Publication",  group:"publication",inputType:"term" },
    {
      value: "locations.source.host_institution_lineage",
      label: "Location Source Host Institution Lineage", groupLabel:"Publication",  group:"publication",inputType:"boolean"
    },
    {
      value: "locations.source.publisher_lineage",
      label: "Location Source Publisher Lineage", groupLabel:"Publication",  group:"publication",inputType:"term"
    },
    {
      value: "primary_location.source.has_issn",
      label: "Primary Location Source Has ISSN", groupLabel:"Publication",  group:"publication",inputType:"boolean"
    },
    {
      value: "primary_location.source.publisher_lineage",
      label: "Primary Location Source Publisher Lineage", groupLabel:"Publication",  group:"publication",inputType:"term"
    },
    {
      value: "raw_affiliation_string.search",
      label: "Raw Affiliation String Search", groupLabel:"Publication",  group:"publication",inputType:"term"
    },
    { value: "related_to", label: "Related To", groupLabel:"Publication",  group:"publication",inputType:"term" },
    { value: "repository", label: "Repository", groupLabel:"Publication",  group:"publication",inputType:"term" },
    { value: "to_publication_date", label: "To Publication Date", groupLabel:"Publication Dates",group:"publication_dates",inputType:"date" },
    { value: "version", label: "Version", groupLabel:"Publication",  group:"publication",inputType:"date" }
]

const allgroups = ['Search Fields','Core','Authorship','Publication','Concepts','Open Access','Citations', 'Identifiers','APC', 'Correspondance', 'Funding', undefined, 'Publication Dates', 'Misc'];

export const filterCollection = {
  items: filters
};

// Group filters
const groupedFilters = filterCollection.items.reduce((acc, item) => {
  const group = acc.find(group => group.group === item.group);
  if (group) {
    group.items.push(item);
  } else {
    acc.push({ 
      group: item.group, 
      groupLabel: item.groupLabel, 
      items: [item] 
    });
  }
  return acc;
}, []);

// Updated sorting to use groupLabel instead of group
export const groups = groupedFilters.sort((a, b) => {
  // Handle null/undefined groups
  if (!a.groupLabel && !b.groupLabel) return 0;
  if (!a.groupLabel) return 1;
  if (!b.groupLabel) return -1;

  const indexA = allgroups.indexOf(a.groupLabel);
  const indexB = allgroups.indexOf(b.groupLabel);

  // If both items aren't in allgroups, maintain their relative order
  if (indexA === -1 && indexB === -1) return 0;
  
  // Put unknown groups at the end
  if (indexA === -1) return 1;
  if (indexB === -1) return -1;

  return indexA - indexB;
});