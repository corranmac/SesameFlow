import React, { useState, useMemo,useRef, useCallback,useEffect } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  useViewport,
  MiniMap,
  Controls,
  useReactFlow,
  Background,
  useOnViewportChange 
} from '@xyflow/react';
import { DnDProvider, useDnD } from './utils/draganddrop';
import Sidebar from './SideBar';
import '@xyflow/react/dist/style.css';

import { getRegisteredNodeTypes, loadRegistry } from '../registry/NodeRegistry';

import { useShallow } from 'zustand/react/shallow';
import useStore from '@flowstate/store';
import { nanoid } from 'nanoid'

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  viewport: state.viewport,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  addNode: state.addNode,
  setViewport: state.setViewport,
});


loadRegistry();
const nodeTypes_ = getRegisteredNodeTypes();

const FlowEditor = (props) => {
  const reactFlowWrapper = useRef(null);
  const { nodes, edges, viewport, onNodesChange, onEdgesChange, onConnect,addNode,setViewport } = useStore(
    useShallow(selector),
  );
  const nodeTypes = useMemo(()=>nodeTypes_,[nodeTypes_]);
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();
  
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  useOnViewportChange({
    onEnd: (newviewport) => setViewport(newviewport),
  });

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      // check if the dropped element is valid
      if (!type) {
        return;
      } 

      // project was renamed to screenToFlowPosition
      // and you don't need to subtract the reactFlowBounds.left/top anymore
      // details: https://reactflow.dev/whats-new/2023-11-10
      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: nanoid(),
        type,
        position,
        data: { filter: "filter" },
      };
 
      addNode(newNode);
    },
    [screenToFlowPosition, type],
  );

  return (
    <div className="flow">
      <Sidebar />
      <div ref={reactFlowWrapper} className="reactflow-wrapper">
            <ReactFlow nodes={nodes} 
            defaultViewport={viewport}
            edges={edges} 
            nodeTypes={nodeTypes} 
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            snapToGrid
            snapGrid={[4,4]}
            minZoom={0.2}
            connectionLineType={"smoothstep"}
            >
              <MiniMap />
              <Controls />
              <Background color="#aaa" gap={16} />
            </ReactFlow>
      </div>
      </div>
  );
};

export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <FlowEditor />
    </DnDProvider>
  </ReactFlowProvider>
);