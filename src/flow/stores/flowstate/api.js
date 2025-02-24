import { useRef } from 'react';
import { useShallow } from 'zustand/shallow';
import useStore from '@flowstate/store';

// Custom hook to extract only required state using shallow comparison
const useFlowState = () => {
  return useStore(useShallow((state) => ({
    nodes: state.nodes,
    edges: state.edges,
    viewport: state.viewport,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    addNode: state.addNode,
    setViewport: state.setViewport,
    clearStore: state.clearStore,
  })));
};

export default useFlowState;