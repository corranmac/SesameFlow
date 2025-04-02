# Workflow RO-Crate API Documentation

## Introduction

The Workflow RO-Crate API is a JavaScript library for creating, modifying, and exporting Workflow RO-Crates according to the [Workflow RO-Crate profile specification](https://w3id.org/workflowhub/workflow-ro-crate/1.0). This API simplifies the process of generating valid RO-Crates by handling the complex JSON-LD structure behind the scenes.

## Installation

```bash
npm install workflow-ro-crate-api
```

## Basic Usage

```javascript
const { WorkflowROCrate } = require('workflow-ro-crate-api');

// Create a new Workflow RO-Crate
const crate = new WorkflowROCrate({
  name: "Data Processing Workflow",
  description: "A workflow for processing CSV data and generating reports",
  license: "MIT"
});

// Add authors
crate.setAuthors([
  { name: "Jane Doe", orcid: "https://orcid.org/0000-0001-2345-6789" }
]);

// Set the main workflow
crate.setMainWorkflow({
  path: "process_data.py",
  name: "Data Processing Workflow",
  language: "python"
});

// Get the RO-Crate as JSON
const crateJson = crate.toJSON(true);
```

## Required Components

According to the Workflow RO-Crate specification, the following components are **required**:

### 1. Basic Crate Metadata

```javascript
const crate = new WorkflowROCrate({
  name: "Data Processing Workflow",  // Required: Name/title of the workflow
  description: "A workflow for processing CSV data", // Required: Description of what the workflow does
  license: "MIT" // Required: License for the crate content
});
```

### 2. Main Workflow Definition

```javascript
crate.setMainWorkflow({
  path: "process_data.py", // Required: Path to the main workflow file
  name: "Data Processing Workflow", // Required: Name of the workflow
  language: "python" // Required: Programming language
});
```

## Optional Components

The following components are **optional** but recommended for a more complete and useful RO-Crate:

### 1. Authors

```javascript
crate.setAuthors([
  { 
    name: "Jane Doe", // Name of author
    orcid: "https://orcid.org/0000-0001-2345-6789" // ORCID identifier (optional)
  },
  { 
    name: "John Smith", 
    affiliation: "University of Example" // Affiliation (optional)
  }
]);
```

### 2. Keywords/Tags

```javascript
crate.setKeywords(["data processing", "reporting", "automation"]);
```

### 3. README File

```javascript
crate.addReadme(); // Defaults to "README.md"
```

### 4. Workflow Diagram

Include a diagram when setting the main workflow:

```javascript
crate.setMainWorkflow({
  path: "process_data.py",
  name: "Data Processing Workflow",
  language: "python",
  diagramPath: "diagram.svg" // Optional diagram showing workflow structure
});
```

### 5. Test Directory

```javascript
crate.addTestDirectory(["test/test_input.csv", "test/test_script.sh"]);
```

### 6. Examples Directory

```javascript
crate.addExamplesDirectory(["examples/example_config.json", "examples/sample_data.csv"]);
```

### 7. CWL Description

```javascript
crate.addCWLDescription("workflow.cwl");
```

## Complete Example: Document Processing Workflow

Here's a complete example of creating a document processing workflow RO-Crate:

```javascript
const { WorkflowROCrate } = require('workflow-ro-crate-api');

// Create a new Workflow RO-Crate with required fields
const crate = new WorkflowROCrate({
  name: "Document Processing Workflow",
  description: "A workflow that converts documents to text, analyzes them, and generates a summary report",
  license: "Apache-2.0"
});

// Add optional authors
crate.setAuthors([
  { name: "Jane Doe", orcid: "https://orcid.org/0000-0001-2345-6789" },
  { name: "John Smith", affiliation: "University of Example" }
]);

// Add optional keywords
crate.setKeywords(["document processing", "text analysis", "reporting"]);

// Add optional README
crate.addReadme();

// Set required main workflow
crate.setMainWorkflow({
  path: "document_processor.py",
  name: "Document Processing Workflow",
  language: "python", 
  diagramPath: "workflow_diagram.svg" // optional
});

// Add optional test directory
crate.addTestDirectory([
  "test/test_document.docx", 
  "test/test_run.sh"
]);

// Add optional examples directory
crate.addExamplesDirectory([
  "examples/sample_document.docx", 
  "examples/config.json"
]);

// Add additional files
crate.addFile({
  path: "requirements.txt",
  name: "Python Dependencies",
  encodingFormat: "text/plain"
});

crate.addFile({
  path: "config_template.json",
  name: "Configuration Template",
  encodingFormat: "application/json"
});

// Get the RO-Crate as JSON
const crateJson = crate.toJSON(true);
console.log(crateJson);
```

## Workflow Run Crate Extension

To document the execution of a workflow, you can use the `WorkflowRunCrate` extension:

```javascript
const { WorkflowRunCrate } = require('workflow-ro-crate-api');

// Create a new Workflow Run RO-Crate
const runCrate = new WorkflowRunCrate({
  name: "Document Processing Run",
  description: "Execution record for document processing workflow",
  license: "Apache-2.0"
});

// Set up the workflow (required)
runCrate.setMainWorkflow({
  path: "document_processor.py",
  name: "Document Processing Workflow",
  language: "python"
});

// Add run details (required for run crates)
runCrate.setRunDetails({
  id: "#run-2025-03-08",
  name: "Document Processing Run",
  startTime: "2025-03-08T10:00:00Z",
  endTime: "2025-03-08T10:15:00Z",
  status: "CompletedActionStatus",
  workflowId: "document_processor.py",
  agent: {
    id: "#python-executor",
    type: "SoftwareApplication",
    name: "Python 3.10"
  }
});

// Add inputs (optional but recommended for run crates)
runCrate.addInputs([
  {
    id: "#input-document",
    name: "input_document",
    format: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    file: "inputs/business_report.docx"
  },
  {
    id: "#input-config",
    name: "config_file",
    format: "application/json",
    file: "inputs/analysis_config.json"
  }
]);

// Add outputs (optional but recommended for run crates)
runCrate.addOutputs([
  {
    id: "#output-text",
    name: "extracted_text",
    format: "text/plain",
    file: "outputs/extracted_text.txt"
  },
  {
    id: "#output-report",
    name: "analysis_report",
    format: "application/pdf",
    file: "outputs/analysis_report.pdf"
  }
]);

// Get the Workflow Run RO-Crate as JSON
const runCrateJson = runCrate.toJSON(true);
console.log(runCrateJson);
```

## API Reference

### WorkflowROCrate Class

#### Constructor

```javascript
new WorkflowROCrate(options)
```

- `options.name` (string): Name of the workflow (required)
- `options.description` (string): Description of the workflow (required)
- `options.license` (string): License for the crate (required)

#### Methods

| Method | Description | Required? |
|--------|-------------|-----------|
| `setName(name)` | Set the name of the workflow | Required |
| `setDescription(description)` | Set the description of the workflow | Required |
| `setLicense(license)` | Set the license for the crate | Required |
| `setMainWorkflow(workflowDetails)` | Define the main workflow | Required |
| `setAuthors(authors)` | Add authors to the crate | Optional |
| `setKeywords(keywords)` | Add keywords/tags to the crate | Optional |
| `addFile(fileDetails)` | Add a file to the crate | Optional |
| `addReadme(path)` | Add a README file | Optional |
| `addCWLDescription(cwlPath)` | Add a CWL description | Optional |
| `addDirectory(dirDetails)` | Add a directory to the crate | Optional |
| `addTestDirectory(testFiles)` | Add a test directory | Optional |
| `addExamplesDirectory(exampleFiles)` | Add an examples directory | Optional |
| `toJSON(pretty)` | Convert crate to JSON string | - |
| `getCrate()` | Get the raw crate object | - |

### WorkflowRunCrate Class (extends WorkflowROCrate)

#### Additional Methods

| Method | Description | Required for Run Crates? |
|--------|-------------|--------------------------|
| `setRunDetails(runDetails)` | Set workflow run details | Required |
| `addInputs(inputs)` | Add input data details | Optional but recommended |
| `addOutputs(outputs)` | Add output data details | Optional but recommended |

## Best Practices

1. **Always include required components**: Name, description, license, and main workflow.
2. **Include a README**: Add a README.md file to provide human-readable information about the workflow.
3. **Add a diagram**: Visual representations help others understand your workflow.
4. **Document inputs and outputs**: For workflow runs, clearly document what goes in and what comes out.
5. **Use standard licenses**: Use standard license identifiers recognized by WorkflowHub.
6. **Include test cases**: Provide test data and scripts when possible.
7. **Add example configurations**: Example files help others understand how to use your workflow.

## Supported Workflow Languages

The API has built-in support for the following workflow languages:

- CWL (Common Workflow Language)
- Galaxy
- KNIME
- Nextflow
- Snakemake

## Exporting and Using the RO-Crate

To get the complete RO-Crate as a JSON string:

```javascript
const json = crate.toJSON(true); // true for pretty-printing
```

For WorkflowHub submission, zip the generated JSON as `ro-crate-metadata.json` along with all referenced files, and use the `.crate.zip` extension.
