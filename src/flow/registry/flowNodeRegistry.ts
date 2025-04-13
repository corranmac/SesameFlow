// src/registry/NodeRegistry.ts

const STORAGE_KEY = 'nodeRegistry';

export interface NodeConfig {
  [key: string]: any;
}

export interface NodeComponent {
  name?: string;
  source_short?: string;
  source?: string;
  label?: string;
  component?: React.ComponentType<any>;
  measured?: {
    width: number;
    height: number;
  };
}

interface RegistryEntry {
  component: React.ComponentType<any>;
  config: NodeConfig;
}

// In-memory registry
const nodeRegistry: Record<string, RegistryEntry> = {};

/**
 * Dynamically imports all node components from /src/core/nodes/
 */
async function registerCoreNodes(): Promise<void> {
  const modules = import.meta.glob<{ default?: NodeComponent; factory?: () => NodeComponent[] }>(
    '@flowcore/**/nodes/*{Node,Factory}.*sx',  // Ensure it's .tsx for TypeScript/JSX
    { eager: true }
  );
  for (const path in modules) {
    const module = modules[path];

    if (module.default) {
      const component = module.default;
      if (!component.name) {
        console.warn(`Skipping invalid core node module: ${path}`);
        continue;
      }
      registerNodeType(`${component.source}-${component.label}`, component);
      continue;
    }

    if (module.factory && typeof module.factory === 'function') {
      const nodes = module.factory();
      if (!Array.isArray(nodes)) {
        console.warn(`Factory in ${path} did not return an array of nodes.`);
        continue;
      }

      nodes.forEach((node) => {
        if (!node || !node.label || !node.component) {
          console.warn(`Skipping invalid node in factory from ${path}`);
          return;
        }
        registerNodeType(`${node.source}-${node.label}`, node.component);
      });
    }
  }
}

/**
 * Loads the registry configuration from local storage.
 */
function loadRegistryFromStorage(): void {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed: Record<string, NodeConfig> = JSON.parse(stored);
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
function saveRegistryToStorage(): void {
  const serializableRegistry: Record<string, NodeConfig> = {};
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
 */
export function registerNodeType(
  label: string,
  component: React.ComponentType<any>,
  config: NodeConfig = {}
): void {
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
export function getRegisteredNodeTypes(): Record<string, React.ComponentType<any>> {
  const nodeTypes: Record<string, React.ComponentType<any>> = {};
  Object.keys(nodeRegistry).forEach((label) => {
    nodeTypes[label] = nodeRegistry[label].component;
  });
  return nodeTypes;
}

/**
 * Serializes the registry's configuration into a JSON string.
 */
export function serializeRegistry(): string {
  const serializableRegistry: Record<string, NodeConfig> = {};
  Object.keys(nodeRegistry).forEach((label) => {
    serializableRegistry[label] = nodeRegistry[label].config;
  });
  return JSON.stringify(serializableRegistry, null, 2);
}

/**
 * Allows exporting the registry's configuration as a JSON file.
 */
export function exportRegistryToFile(): void {
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
export function importRegistryFromJson(jsonString: string): void {
  try {
    const importedConfig: Record<string, NodeConfig> = JSON.parse(jsonString);
    Object.keys(importedConfig).forEach((label) => {
      if (nodeRegistry[label]) {
        nodeRegistry[label].config = {
          ...nodeRegistry[label].config,
          ...importedConfig[label],
        };
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
export async function loadRegistry(): Promise<void> {
  loadRegistryFromStorage();
  await registerCoreNodes();
}
