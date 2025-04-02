// src/components/Canvas.jsx
import React, {useState,createContext} from 'react';
import {FlowEditor} from '@flow/layout/FlowEditor';
import ErrorBoundary from './ErrorBoundary';
import {
  ReactFlowProvider,
} from '@xyflow/react';

import { DnDProvider, useDnD } from "@flowcore/utils/useDragAndDrop";

const NodeMenuContext = createContext(null);

const Canvas = ({nodes,edges}) => {
  
  const [nodeMenuVisible, setNodeMenuVisible] = useState();

  return (
    <>
      <ErrorBoundary>
        <ReactFlowProvider>
          <FlowEditor nodesIn={nodes} edgesIn={edges}/>
        </ReactFlowProvider>
      </ErrorBoundary>
    </>
  );
};

export default Canvas; // Ensure there is a default export
