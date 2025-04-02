/**
 * Workflow RO-Crate API
 * A JavaScript library for creating, modifying and exporting Workflow RO-Crates
 * according to the Workflow RO-Crate profile specification.
 */

class WorkflowROCrate {
  constructor(options = {}) {
    // Initialize with default RO-Crate structure
    this.crate = {
      "@context": [
        "https://w3id.org/ro/crate/1.1/context",
        "https://w3id.org/ro/terms/workflow-run/context"
      ],
      "@graph": [
        {
          "@id": "ro-crate-metadata.json",
          "@type": "CreativeWork",
          "about": { "@id": "./" },
          "conformsTo": [
            { "@id": "https://w3id.org/ro/crate/1.1" },
            { "@id": "https://w3id.org/workflowhub/workflow-ro-crate/1.0" }
          ]
        },
        {
          "@id": "ro-crate-preview.html",
          "@type": "CreativeWork",
          "about": { "@id": "./" }
        },
        {
          "@id": "sesameflow",  
          "@type": "WebSite",
          "name": "Sesame Flow",
          "programmingLanguage": "javascript",
          "dateCreated": "2020-05-23",
          "license": { "@id": "https://spdx.org/licenses/CC-BY-NC-SA-4.0"},
          "url": "https://sesame.science/flow",
          "version": "0.0.0"
        },
        {
          "@id": "./",
          "@type": "Dataset",
          "instrument":{"@id":"sesameflow"},
          "hasPart": []
        }
      ],
      
    };

    // Set basic properties if provided
    if (options.name) this.setName(options.name);
    if (options.description) this.setDescription(options.description);
    if (options.license) this.setLicense(options.license);

    // Pre-defined workflow language identifiers
    this.workflowLanguages = {
      cwl: {
        "@id": "https://w3id.org/workflowhub/workflow-ro-crate#cwl",
        "@type": "ComputerLanguage",
        "name": "Common Workflow Language",
        "alternateName": "CWL",
        "identifier": { "@id": "https://w3id.org/cwl/v1.2/" },
        "url": { "@id": "https://www.commonwl.org/" }
      },
      galaxy: {
        "@id": "https://w3id.org/workflowhub/workflow-ro-crate#galaxy",
        "@type": "ComputerLanguage",
        "name": "Galaxy",
        "identifier": { "@id": "https://galaxyproject.org/" },
        "url": { "@id": "https://galaxyproject.org/" }
      },
      knime: {
        "@id": "https://w3id.org/workflowhub/workflow-ro-crate#knime",
        "@type": "ComputerLanguage",
        "name": "KNIME",
        "identifier": { "@id": "https://www.knime.com/" },
        "url": { "@id": "https://www.knime.com/" }
      },
      nextflow: {
        "@id": "https://w3id.org/workflowhub/workflow-ro-crate#nextflow",
        "@type": "ComputerLanguage",
        "name": "Nextflow",
        "identifier": { "@id": "https://www.nextflow.io/" },
        "url": { "@id": "https://www.nextflow.io/" }
      },
      snakemake: {
        "@id": "https://w3id.org/workflowhub/workflow-ro-crate#snakemake",
        "@type": "ComputerLanguage",
        "name": "Snakemake",
        "identifier": { "@id": "https://doi.org/10.1093/bioinformatics/bts480" },
        "url": { "@id": "https://snakemake.readthedocs.io" }
      }
    };
  }

  /**
   * Helper method to find an entity in the @graph by its @id
   * @param {string} id - The @id to search for
   * @returns {Object|null} The entity or null if not found
   */
  findEntity(id) {
    return this.crate["@graph"].find(entity => entity["@id"] === id);
  }

  /**
   * Helper method to add or update an entity in the @graph
   * @param {Object} entity - The entity to add or update
   * @returns {Object} The added or updated entity
   */
  addOrUpdateEntity(entity) {
    const index = this.crate["@graph"].findIndex(e => e["@id"] === entity["@id"]);
    if (index >= 0) {
      this.crate["@graph"][index] = { ...this.crate["@graph"][index], ...entity };
      return this.crate["@graph"][index];
    } else {
      this.crate["@graph"].push(entity);
      return entity;
    }
  }

  /**
   * Set the name (title) of the workflow crate
   * @param {string} name - The name to set
   * @returns {WorkflowROCrate} This instance for chaining
   */
  setName(name) {
    const root = this.findEntity("./");
    if (root) {
      root.name = name;
    }
    return this;
  }

  /**
   * Set the description of the workflow crate
   * @param {string} description - The description to set
   * @returns {WorkflowROCrate} This instance for chaining
   */
  setDescription(description) {
    const root = this.findEntity("./");
    if (root) {
      root.description = description;
    }
    return this;
  }

  /**
   * Set the license of the workflow crate
   * @param {string} license - The license to set (should be a valid license identifier)
   * @returns {WorkflowROCrate} This instance for chaining
   */
  setLicense(license) {
    const root = this.findEntity("./");
    if (root) {
      root.license = license;
    }
    return this;
  }

  /**
   * Add authors to the workflow crate
   * @param {Array<Object>} authors - Array of author objects with name and optionally orcid
   * @returns {WorkflowROCrate} This instance for chaining
   */
  setAuthors(authors) {
    const root = this.findEntity("./");
    if (root) {
      root.author = authors.map(author => {
        const authorEntity = {
          "@id": author.orcid || `#${this._slugify(author.name)}`,
          "@type": "Person",
          "name": author.name
        };
        
        if (author.orcid) {
          authorEntity.identifier = author.orcid;
        }
        
        if (author.affiliation) {
          authorEntity.affiliation = author.affiliation;
        }

        this.addOrUpdateEntity(authorEntity);
        return { "@id": authorEntity["@id"] };
      });
    }
    return this;
  }

  /**
   * Set keywords/tags for the workflow crate
   * @param {Array<string>} keywords - Array of keyword strings
   * @returns {WorkflowROCrate} This instance for chaining
   */
  setKeywords(keywords) {
    const root = this.findEntity("./");
    if (root) {
      root.keywords = keywords;
    }
    return this;
  }

  /**
   * Add a file to the crate
   * @param {Object} fileDetails - Details about the file
   * @param {string} fileDetails.path - Path to the file
   * @param {string} fileDetails.name - Name of the file
   * @param {string} [fileDetails.encodingFormat] - MIME type of the file
   * @param {Array<string>} [fileDetailss] - Additional types beyond "File"
   * @param {Object} [fileDetails.additionalProperties] - Any other properties to include
   * @returns {Object} The added file entity
   */
  addFile(fileDetails) {
    const types = ["File"].concat(fileDetailss || []);
    const fileEntity = {
      "@id": fileDetails.path,
      "@type": types,
      "name": fileDetails.name,
      ...fileDetails.additionalProperties
    };

    if (fileDetails.encodingFormat) {
      fileEntity.encodingFormat = fileDetails.encodingFormat;
    }

    // Add to the root's hasPart if not already there
    const root = this.findEntity("./");
    if (root) {
      if (!root.hasPart) {
        root.hasPart = [];
      }
      
      if (!root.hasPart.some(part => part["@id"] === fileDetails.path)) {
        root.hasPart.push({ "@id": fileDetails.path });
      }
    }

    return this.addOrUpdateEntity(fileEntity);
  }

  /**
   * Add a README file to the crate
   * @param {string} path - Path to the README file, defaults to "README.md"
   * @returns {Object} The added README entity
   */
  addReadme(path = "README.md") {
    return this.addFile({
      path,
      name: "README",
      encodingFormat: "text/markdown",
      additionalProperties: {
        "about": { "@id": "./" }
      }
    });
  }

  /**
   * Set the main workflow for the crate
   * @param {Object} workflowDetails - Details about the main workflow
   * @param {string} workflowDetails.path - Path to the workflow file
   * @param {string} workflowDetails.name - Name of the workflow
   * @param {string} workflowDetails.language - Workflow language (cwl, galaxy, knime, nextflow, snakemake)
   * @param {string} [workflowDetails.diagramPath] - Path to a diagram of the workflow
   * @param {Object} [workflowDetails.additionalProperties] - Any other properties to include
   * @returns {Object} The added workflow entity
   */
  setMainWorkflow(workflowDetails) {
    // First add the workflow language if it's a recognized one
    if (this.workflowLanguages[workflowDetails.language]) {
      const languageEntity = this.workflowLanguages[workflowDetails.language];
      this.addOrUpdateEntity(languageEntity);
    }

    // Add the workflow file
    const workflowEntity = this.addFile({
      path: workflowDetails.path,
      name: workflowDetails.name,
      types: ["SoftwareSourceCode", "ComputationalWorkflow"],
      additionalProperties: {
        "programmingLanguage": { 
          "@id": this.workflowLanguages[workflowDetails.language]["@id"] 
        },
        ...workflowDetails.additionalProperties
      }
    });

    // If a diagram is specified, add it and link it to the workflow
    if (workflowDetails.diagramPath) {
      const diagramEntity = this.addFile({
        path: workflowDetails.diagramPath,
        name: `${workflowDetails.name} Diagram`,
        types: ["ImageObject"]
      });
      
      workflowEntity.image = { "@id": workflowDetails.diagramPath };
    }

    // Set as the main entity of the crate
    const root = this.findEntity("./");
    if (root) {
      root.mainEntity = { "@id": workflowDetails.path };
    }

    return workflowEntity;
  }

  /**
   * Add a CWL description to the main workflow
   * @param {string} cwlPath - Path to the CWL description file
   * @returns {Object} The added CWL description entity
   */
  addCWLDescription(cwlPath) {
    // Get the main workflow
    const root = this.findEntity("./");
    if (!root || !root.mainEntity) {
      throw new Error("No main workflow defined. Call setMainWorkflow first.");
    }
    
    const mainWorkflowId = root.mainEntity["@id"];
    const mainWorkflow = this.findEntity(mainWorkflowId);
    
    if (!mainWorkflow) {
      throw new Error(`Main workflow entity not found: ${mainWorkflowId}`);
    }
    
    // Add the CWL language entity if not already present
    this.addOrUpdateEntity(this.workflowLanguages.cwl);
    
    // Add the CWL description file
    const cwlEntity = this.addFile({
      path: cwlPath,
      name: `${mainWorkflow.name} CWL Description`,
      types: ["SoftwareSourceCode", "HowTo"],
      additionalProperties: {
        "programmingLanguage": { "@id": "https://w3id.org/workflowhub/workflow-ro-crate#cwl" }
      }
    });
    
    // Link the main workflow to its CWL description
    mainWorkflow.subjectOf = { "@id": cwlPath };
    
    return cwlEntity;
  }

  /**
   * Add a directory to the crate as a Dataset
   * @param {Object} dirDetails - Details about the directory
   * @param {string} dirDetails.path - Path to the directory, ending with /
   * @param {string} dirDetails.name - Name of the directory
   * @param {Array<string>} [dirDetails.contents] - Paths to files contained in the directory
   * @returns {Object} The added directory entity
   */
  addDirectory(dirDetails) {
    const dirEntity = {
      "@id": dirDetails.path,
      "@type": ["Dataset"],
      "name": dirDetails.name
    };
    
    // Add files as hasPart if specified
    if (dirDetails.contents && dirDetails.contents.length > 0) {
      dirEntity.hasPart = dirDetails.contents.map(path => ({ "@id": path }));
    }
    
    // Add to the root's hasPart
    const root = this.findEntity("./");
    if (root) {
      if (!root.hasPart) {
        root.hasPart = [];
      }
      
      if (!root.hasPart.some(part => part["@id"] === dirDetails.path)) {
        root.hasPart.push({ "@id": dirDetails.path });
      }
    }
    
    return this.addOrUpdateEntity(dirEntity);
  }

  /**
   * Add a test directory to the crate
   * @param {Array<string>} [testFiles] - Paths to test files
   * @returns {Object} The added test directory entity
   */
  addTestDirectory(testFiles = []) {
    return this.addDirectory({
      path: "test/",
      name: "Test directory",
      contents: testFiles
    });
  }

  /**
   * Add an examples directory to the crate
   * @param {Array<string>} [exampleFiles] - Paths to example files
   * @returns {Object} The added examples directory entity
   */
  addExamplesDirectory(exampleFiles = []) {
    return this.addDirectory({
      path: "examples/",
      name: "Examples directory",
      contents: exampleFiles
    });
  }

  /**
   * Create a workflow run extension to the crate
   * @param {Object} runDetails - Details about the workflow run
   * @returns {WorkflowROCrate} This instance for chaining
   */
  addWorkflowRun(runDetails) {
    // Implementation for Workflow Run Crate extension
    // This would involve adding provenance information about workflow execution
    
    // Add to conformsTo to indicate use of Workflow Run Crate profile
    const metadataFileDesc = this.findEntity("ro-crate-metadata.json");
    if (metadataFileDesc && metadataFileDesc.conformsTo) {
      const runProfileId = "https://w3id.org/workflowhub/workflow-run-crate/1.0";
      if (!metadataFileDesc.conformsTo.some(profile => profile["@id"] === runProfileId)) {
        metadataFileDesc.conformsTo.push({ "@id": runProfileId });
      }
    }
    
    // Implementation would continue with detailed run information
    // This is a placeholder as the full implementation would depend on
    // the details of the Workflow Run Crate specification
    
    return this;
  }

  /**
   * Convert crate to JSON string
   * @param {boolean} [pretty=false] - Whether to pretty-print the JSON
   * @returns {string} JSON representation of the crate
   */
  toJSON(pretty = false) {
    return JSON.stringify(this.crate, null, pretty ? 2 : 0);
  }

  /**
   * Get the raw crate object
   * @returns {Object} The crate object
   */
  getCrate() {
    return this.crate;
  }

  /**
   * Helper method to convert a string to a URL-friendly slug
   * @private
   * @param {string} str - String to convert
   * @returns {string} Slugified string
   */
  _slugify(str) {
    return str
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}

// Extension for workflow run profile
class WorkflowRunCrate extends WorkflowROCrate {
  constructor(options = {}) {
    super(options);
    
    // Add Workflow Run Crate profile to conformsTo
    const metadataFileDesc = this.findEntity("ro-crate-metadata.json");
    if (metadataFileDesc && metadataFileDesc.conformsTo) {
      metadataFileDesc.conformsTo.push({ 
        "@id": "https://w3id.org/workflowhub/workflow-run-crate/1.0" 
      });
    }
  }
  
  /**
   * Set the workflow run details
   * @param {Object} runDetails - Details about the workflow run
   * @returns {WorkflowRunCrate} This instance for chaining
   */
  setRunDetails(runDetails) {
    // Add the run entity
    const runEntity = {
      "@id": runDetails.id || "#run",
      "@type": "OrganizeAction",
      "name": runDetails.name || "Workflow Run",
      "startTime": runDetails.startTime,
      "endTime": runDetails.endTime,
      "status": runDetails.status
    };
    
    // Link to the workflow that was executed
    if (runDetails.workflowId) {
      runEntity.object = { "@id": runDetails.workflowId };
    }
    
    // Add agent who performed the run if specified
    if (runDetails.agent) {
      const agentEntity = {
        "@id": runDetails.agent.id || "#agent",
        "@type": runDetails.agent || "SoftwareApplication",
        "name": runDetails.agent.name
      };
      
      this.addOrUpdateEntity(agentEntity);
      runEntity.agent = { "@id": agentEntity["@id"] };
    }
    
    // Add the run entity to the crate
    this.addOrUpdateEntity(runEntity);
    
    // Link the crate to the run
    const root = this.findEntity("./");
    if (root) {
      root.mentions = root.mentions || [];
      root.mentions.push({ "@id": runEntity["@id"] });
    }
    
    return this;
  }
  
  /**
   * Add input data used in the workflow run
   * @param {Array<Object>} inputs - Array of input data objects
   * @returns {WorkflowRunCrate} This instance for chaining
   */
  addInputs(inputs) {
    const runEntity = this.findEntity("#run");
    if (!runEntity) {
      throw new Error("Run details not set. Call setRunDetails first.");
    }
    
    runEntity.instrument = runEntity.instrument || [];
    
    inputs.forEach(input => {
      const inputEntity = {
        "@id": input.id || `#input-${this._slugify(input.name)}`,
        "@type": "FormalParameter",
        "name": input.name,
        "encodingFormat": input.format
      };
      
      if (input.value) {
        inputEntity.defaultValue = input.value;
      }
      
      if (input.file) {
        // Add the file and link to it
        this.addFile({
          path: input.file,
          name: `Input file for ${input.name}`,
          encodingFormat: input.format
        });
        
        inputEntity.exampleOfWork = { "@id": input.file };
      }
      
      this.addOrUpdateEntity(inputEntity);
      runEntity.instrument.push({ "@id": inputEntity["@id"] });
    });
    
    return this;
  }
  
  /**
   * Add output data produced by the workflow run
   * @param {Array<Object>} outputs - Array of output data objects
   * @returns {WorkflowRunCrate} This instance for chaining
   */
  addOutputs(outputs) {
    const runEntity = this.findEntity("#run");
    if (!runEntity) {
      throw new Error("Run details not set. Call setRunDetails first.");
    }
    
    runEntity.result = runEntity.result || [];
    
    outputs.forEach(output => {
      const outputEntity = {
        "@id": output.id || `#output-${this._slugify(output.name)}`,
        "@type": "FormalParameter",
        "name": output.name,
        "encodingFormat": output.format
      };
      
      if (output.file) {
        // Add the file and link to it
        this.addFile({
          path: output.file,
          name: `Output file for ${output.name}`,
          encodingFormat: output.format
        });
        
        outputEntity.exampleOfWork = { "@id": output.file };
      }
      
      this.addOrUpdateEntity(outputEntity);
      runEntity.result.push({ "@id": outputEntity["@id"] });
    });
    
    return this;
  }
}

// Export the classes
module.exports = {
  WorkflowROCrate,
  WorkflowRunCrate
};
