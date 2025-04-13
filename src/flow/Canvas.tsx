// src/components/Canvas.jsx
import React, { useState, createContext } from "react";
import { FlowEditor } from '@flow/Editor';
import ErrorBoundary from "./ErrorBoundary";
import { Edge, Node, ReactFlowProvider } from "@xyflow/react";


interface CanvasProps {
  nodes: Node[];
  edges: Edge[];
}

const Canvas = ({ nodes, edges }:CanvasProps) => {
  const [nodeMenuVisible, setNodeMenuVisible] = useState();

  return (
    <>
      <ErrorBoundary>
        <ReactFlowProvider>
          <FlowEditor nodesIn={nodes} edgesIn={edges} />
        </ReactFlowProvider>
      </ErrorBoundary>
    </>
  );
};

export default Canvas; // Ensure there is a default export
