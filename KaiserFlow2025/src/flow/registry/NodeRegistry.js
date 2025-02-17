// src/registry/NodeRegistry.jsx

const STORAGE_KEY = 'nodeRegistry';

// In-memory registry: holds both the React component and the node configuration.
const nodeRegistry = {};

/**
 * Dynamically imports all node components from /src/core/nodes/
 */
async function registerCoreNodes() {
  const modules = import.meta.glob('../core/nodes/*/*.jsx', { eager: true });

  for (const path in modules) {
    const module = modules[path];

    // Core Nodes: Default Exported Components
    if (module.default) {
      const component = module.default;
      if (!component.type) {
        console.warn(`Skipping invalid core node module: ${path}`);
        continue;
      }
      registerNodeType(component.type, component || {});
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
        if (!node || !node.type) {
          console.warn(`Skipping invalid node in factory from ${path}`);
          return;
        }
        registerNodeType(node.type, node.component || {});
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
      Object.keys(parsed).forEach((type) => {
        if (nodeRegistry[type]) {
          nodeRegistry[type].config = parsed[type];
        } else {
          console.warn(`Configuration for node type "${type}" found in storage but no component is registered.`);
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
  Object.keys(nodeRegistry).forEach((type) => {
    serializableRegistry[type] = nodeRegistry[type].config;
  });

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializableRegistry, null, 2));
  } catch (error) {
    console.error('Failed to save registry to storage:', error);
  }
}

/**
 * Registers a custom node type.
 *
 * @param {string} type - A unique identifier for the node type.
 * @param {React.Component} component - The React component for this node type.
 * @param {Object} [config={}] - Optional configuration data for the node.
 */
export function registerNodeType(type, component, config = {}) {
  if (nodeRegistry[type]) {
    console.warn(`Node type "${type}" is already registered. Overwriting the component and merging config.`);
    nodeRegistry[type].config = { ...nodeRegistry[type].config, ...config };
    nodeRegistry[type].component = component;
  } else {
    nodeRegistry[type] = { component, config };
  }
  saveRegistryToStorage();
}

/**
 * Returns an object mapping node type identifiers to their React components.
 */
export function getRegisteredNodeTypes() {
  const nodeTypes = {};
  Object.keys(nodeRegistry).forEach((type) => {
    nodeTypes[type] = nodeRegistry[type].component;
  });
  return nodeTypes;
}

/**
 * Serializes the registry's configuration into a JSON string.
 */
export function serializeRegistry() {
  const serializableRegistry = {};
  Object.keys(nodeRegistry).forEach((type) => {
    serializableRegistry[type] = nodeRegistry[type].config;
  });
  return JSON.stringify(serializableRegistry, null, 2);
}

/**
 * Allows exporting the registry's configuration as a JSON file.
 */
export function exportRegistryToFile() {
  const dataStr = serializeRegistry();
  const blob = new Blob([dataStr], { type: 'application/json' });
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
    Object.keys(importedConfig).forEach((type) => {
      if (nodeRegistry[type]) {
        nodeRegistry[type].config = { ...nodeRegistry[type].config, ...importedConfig[type] };
      } else {
        console.warn(`Configuration for unregistered node type "${type}" imported.`);
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
