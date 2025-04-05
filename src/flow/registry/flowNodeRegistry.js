// src/registry/NodeRegistry.jsx

const STORAGE_KEY = 'nodeRegistry';

// In-memory registry: holds both the React component and the node configuration.
const nodeRegistry = {};

/**
 * Dynamically imports all node components from /src/core/nodes/
 */
async function registerCoreNodes() {
  const modules = import.meta.glob('@flowcore/**/nodes/*{Node,Factory}.jsx', { eager: true });

  for (const path in modules) {
    const module = modules[path];

    // Core Nodes: Default Exported Components
    if (module.default) {
      const component = module.default;
      if (!component.name) {
        console.warn(`Skipping invalid core node module: ${path}`);
        continue;
      }
      registerNodeType(component.source_short+"-"+component.label, component || {});
      continue;
    }

    // Factory Nodes: Explicitly Exported Factory Function
    if (module.factory) {
      if (typeof module.factory !== 'function') {
        console.warn(`Skipping invalid factory in ${path}`);
        continue;
      }

      const nodes = module.factory(); // Factory returns multiple nodes
      if (!Array.isArray(nodes)) {
        console.warn(`Factory in ${path} did not return an array of nodes.`);
        continue;
      }

      nodes.forEach((node) => {
        if (!node || !node.label) {
          console.warn(`Skipping invalid node in factory from ${path}`);
          return;
        }
        registerNodeType(node.source+"-"+node.label, node.component || {});
      });
    }
  }
}

/**
 * Loads the registry configuration from local storage.
 */
function loadRegistryFromStorage() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      Object.keys(parsed).forEach((label) => {
        if (nodeRegistry[label]) {
          nodeRegistry[label].config = parsed[label];
        }
      });
    } catch (error) {
      console.error('Failed to parse registry from storage:', error);
    }
  }
}

/**
 * Saves the serializable configuration from the registry to local storage.
 */
function saveRegistryToStorage() {
  const serializableRegistry = {};
  Object.keys(nodeRegistry).forEach((label) => {
    serializableRegistry[label] = nodeRegistry[label].config;
  });

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializableRegistry, null, 2));
  } catch (error) {
    console.error('Failed to save registry to storage:', error);
  }
}

/**
 * Registers a custom node label.
 *
 * @param {string} label - A unique identifier for the node label.
 * @param {React.Component} component - The React component for this node label.
 * @param {Object} [config={}] - Optional configuration data for the node.
 */
export function registerNodeType(label, component, config = {}) {
  if (nodeRegistry[label]) {
    nodeRegistry[label].config = { ...nodeRegistry[label].config, ...config };
    nodeRegistry[label].component = component;
  } else {
    nodeRegistry[label] = { component, config };
  }
  saveRegistryToStorage();
}

/**
 * Returns an object mapping node label identifiers to their React components.
 */
export function getRegisteredNodeTypes() {
  const nodeTypes = {};
  Object.keys(nodeRegistry).forEach((label) => {
    nodeTypes[label] = nodeRegistry[label].component;
  });
  return nodeTypes;
}

/**
 * Serializes the registry's configuration into a JSON string.
 */
export function serializeRegistry() {
  const serializableRegistry = {};
  Object.keys(nodeRegistry).forEach((label) => {
    serializableRegistry[label] = nodeRegistry[label].config;
  });
  return JSON.stringify(serializableRegistry, null, 2);
}

/**
 * Allows exporting the registry's configuration as a JSON file.
 */
export function exportRegistryToFile() {
  const dataStr = serializeRegistry();
  const blob = new Blob([dataStr], { label: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'node-registry.json';
  link.click();
  URL.revokeObjectURL(url);
}

/**
 * Imports registry configuration from a JSON string.
 */
export function importRegistryFromJson(jsonString) {
  try {
    const importedConfig = JSON.parse(jsonString);
    Object.keys(importedConfig).forEach((label) => {
      if (nodeRegistry[label]) {
        nodeRegistry[label].config = { ...nodeRegistry[label].config, ...importedConfig[label] };
      } else {
        console.warn(`Configuration for unregistered node label "${label}" imported.`);
      }
    });
    saveRegistryToStorage();
  } catch (error) {
    console.error('Failed to import registry configuration:', error);
  }
}

/**
 * Initializes the registry by loading stored configurations and registering core nodes.
 */
export async function loadRegistry() {
  loadRegistryFromStorage();
  await registerCoreNodes();
}
