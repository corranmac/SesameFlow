import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import {
  type Edge,
  type Node,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  type Viewport,
} from '@xyflow/react';
import { persist, createJSONStorage } from 'zustand/middleware'

const initialEdges = [] as Edge[];

const initialNodes = [
  {
    id: '0',
    type: 'OpenAlex',
    position: { x: 0, y: 0 },
    data: { value: 123 },
  },
] as Node[];

const viewport = { x: 0, y: 0, zoom: 1 }


type AppState = {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange<Node>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  viewport: Viewport;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<AppState>()(
  persist((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  viewport: viewport,
  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge({ ...connection, type: 'smoothstep' }, get().edges),
    });
  },
  setNodes: (nodes) => {
    set({ nodes });
  },
  setEdges: (edges) => {
    set({ edges });
  },
  addNode: (newNode: Node) => {
    set({
      nodes: [...get().nodes, newNode],
    })
  },
  setViewport: (viewport: Viewport) =>{
    set({viewport})
  },
  updateNodeData: (nodeId, newData) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...newData } }
          : node
      ),
    }))
}
}),
{name:'storage',storage: createJSONStorage(() => sessionStorage)}));
 
export default useStore;