// src/components/Canvas.jsx
import React from 'react';
import FlowEditor from './FlowEditor';
import ErrorBoundary from './ErrorBoundary';
import {
  ReactFlowProvider,
} from '@xyflow/react';

const Canvas = ({nodes,edges}) => {
  
  return (
    <div className="main">
      <ErrorBoundary>
        <ReactFlowProvider>
          <FlowEditor nodes={nodes} edges={edges}/>
        </ReactFlowProvider>
      </ErrorBoundary>
    </div>
  );
};

export default Canvas; // Ensure there is a default export
