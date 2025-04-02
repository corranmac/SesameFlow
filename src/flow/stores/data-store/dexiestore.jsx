import Dexie from 'dexie';

class UseFlowData {
  constructor(flowID) {
    this.flowID = flowID;
    this.db = new Dexie(`FlowData_${flowID}`);

    // Define the database schema
    this.db.version(1).stores({
      // Use Dublin Core terms as indexes where appropriate
      // Primary key is 'identifier', with indexes on commonly queried fields
      resources: "identifier, title, creator, subject, type, date, publisher, modified, *language, *subject",
      versions: "id, version", // Keep versions table for tracking
    });

    // Initialize the versions table
    this.db.versions.get(0).then(entry => {
      if (!entry) {
        this.db.versions.put({ id: 0, version: 0 }).catch(() => {});
      }
    });

    // Define Dublin Core schema (all possible fields)
    this.dublinCoreSchema = [
      // Core terms from /terms/ namespace
      "abstract", "accessRights", "accrualMethod", "accrualPeriodicity", 
      "accrualPolicy", "alternative", "audience", "available", 
      "bibliographicCitation", "conformsTo", "contributor", "coverage", 
      "created", "creator", "date", "dateAccepted", "dateCopyrighted", 
      "dateSubmitted", "description", "educationLevel", "extent", 
      "format", "hasFormat", "hasPart", "hasVersion", "identifier", 
      "instructionalMethod", "isFormatOf", "isPartOf", "isReferencedBy", 
      "isReplacedBy", "isRequiredBy", "issued", "isVersionOf", 
      "language", "license", "mediator", "medium", "modified", 
      "provenance", "publisher", "references", "relation", "replaces", 
      "requires", "rights", "rightsHolder", "source", "spatial", 
      "subject", "tableOfContents", "temporal", "title", "type", "valid"
    ];
  }

  async fetchVersion() {
    const entry = await this.db.versions.get(0);
    return entry ? entry.version : 0;
  }

  async updateVersion() {
    const currentVersion = await this.fetchVersion();
    const newVersion = currentVersion + 1;
    await this.db.versions.put({ id: 0, version: newVersion });
  }

  // Add a new resource with Dublin Core metadata
  async addResource(resource) {
    if (!resource.identifier) {
      throw new Error("Resource must have an identifier");
    }

    // Validate that all provided fields are valid Dublin Core terms
    for (const key in resource) {
      if (!this.dublinCoreSchema.includes(key) && key !== 'id') {
        console.warn(`Field '${key}' is not a Dublin Core term`);
      }
    }

    try {
      // Add or update the resource
      await this.db.resources.put(resource);
      return resource.identifier;
    } catch (error) {
      console.error("Error adding resource:", error);
      throw error;
    }
  }

  // Get a resource by identifier
  async getResource(identifier) {
    return await this.db.resources.get(identifier);
  }

  // Query resources based on Dublin Core fields
  async queryResources(criteria) {
    // Validate criteria fields
    for (const key in criteria) {
      if (!this.dublinCoreSchema.includes(key)) {
        console.warn(`Search criterion '${key}' is not a Dublin Core term`);
      }
    }

    // Build query based on provided criteria
    let collection = this.db.resources;

    // Use indexed fields for faster queries when possible
    if (criteria.title) {
      collection = collection.where('title').equals(criteria.title);
    } else if (criteria.creator) {
      collection = collection.where('creator').equals(criteria.creator);
    } else if (criteria.type) {
      collection = collection.where('type').equals(criteria.type);
    } else if (criteria.date) {
      collection = collection.where('date').equals(criteria.date);
    } else if (criteria.publisher) {
      collection = collection.where('publisher').equals(criteria.publisher);
    } else if (criteria.modified) {
      collection = collection.where('modified').equals(criteria.modified);
    } else {
      // For non-indexed fields, we need to fetch all and filter manually
      const allResources = await collection.toArray();
      return allResources.filter(resource => {
        for (const [key, value] of Object.entries(criteria)) {
          // Skip if the resource doesn't have this property or values don't match
          if (!resource[key] || resource[key] !== value) {
            return false;
          }
        }
        return true;
      });
    }

    return await collection.toArray();
  }

  // Extend to support provider functionality from original class
  async addProvider(provider, data) {
    const currentVersion = await this.fetchVersion();
    const newVersion = currentVersion + 1;

    // Update the database schema to include the new provider table
    this.db.version(newVersion).stores({
      [provider]: "identifier, title, creator, type, date, modified"
    });

    await this.db[provider].put(data);
    await this.updateVersion();
  }

  // Update a resource's metadata
  async updateResource(identifier, updates) {
    // Validate update fields
    for (const key in updates) {
      if (!this.dublinCoreSchema.includes(key)) {
        console.warn(`Update field '${key}' is not a Dublin Core term`);
      }
    }

    const resource = await this.db.resources.get(identifier);
    if (!resource) {
      throw new Error(`Resource with identifier ${identifier} not found`);
    }

    // Update fields
    const updatedResource = { ...resource, ...updates };
    
    // Automatically update modified timestamp
    updatedResource.modified = new Date().toISOString();

    await this.db.resources.put(updatedResource);
    return updatedResource;
  }

  // Delete a resource
  async deleteResource(identifier) {
    await this.db.resources.delete(identifier);
  }
}

export default UseFlowData;