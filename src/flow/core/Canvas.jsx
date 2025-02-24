// src/components/Canvas.jsx
import React from 'react';
import FlowEditor from './FlowEditor';
import ErrorBoundary from './ErrorBoundary';
import {
  ReactFlowProvider,
} from '@xyflow/react';

const Canvas = () => {
  
  return (
    <div className="main">
      <ErrorBoundary>
        <ReactFlowProvider>
          <FlowEditor />
        </ReactFlowProvider>
      </ErrorBoundary>
    </div>
  );
};

export default Canvas; // Ensure there is a default export
