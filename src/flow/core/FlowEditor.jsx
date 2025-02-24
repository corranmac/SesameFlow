import React, { useState, useMemo,useRef, useCallback,useEffect } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  useViewport,
  MiniMap,
  Controls,
  useReactFlow,
  Background,
  useOnViewportChange,
  useInternalNode
} from '@xyflow/react';

import { DnDProvider, useDnD } from './utils/useDragAndDrop';
import '@xyflow/react/dist/style.css';
import { getRegisteredNodeTypes, loadRegistry } from '@flow/registry/flowNodeRegistry.js';

import { nanoid } from 'nanoid'

import {nodeCreationContext} from "@flowcore/utils/nodecontext"

import useFlowStore from "@flowstate/store"
import { useShallow } from 'zustand/react/shallow';

loadRegistry();
const nodeTypes = getRegisteredNodeTypes();

const FlowEditor = ({nodesIn,edgesIn,...props }) => {
  const reactFlowWrapper = useRef(null);
  // First, get the active flow state
  const {
    viewport,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    setViewport,
    clearStore,
  } = useFlowStore()

  const nodes = nodesIn
  const edges = edgesIn
  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

  /// Handle the node creation button click event, set the position of the handle, its node and the menu state
  const [createFrom, setCreateFrom] = useState({})

  const openNodeMenu = (handlePosition, nodePosition) => {
    setCreateFrom({handlePosition,nodePosition})
  };
  const reactFlow = useReactFlow();


  const onCreateNode = useCallback((nodeId,handlePosition,type)=>{
    let internalNode = reactFlow.getNodes().find((node)=>(node.id==nodeId))
    let x = internalNode.position.x;
    let y = internalNode.position.y;
    
    const w = internalNode.measured.width;
    const h = internalNode.measured.height;
    const xgap = 50;
    const ygap = 20;

    if (handlePosition === "right") x = x + xgap + w;
    if (handlePosition === "left") x = x - xgap - w;
    if (handlePosition === "top") y = y - ygap - h;
    if (handlePosition === "bottom") y = y + ygap + h;
    addNode({'id':nanoid(),'type':type,'position':{'x':x,'y':y},'data':{}})}
  )
  
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
                  {!Object.keys(createFrom).length === 0 && (
                <div 
                  style={{position: "absolute", inset:0,backgroundColor:"black",opacity:0.5,zIndex:4, pointerEvents:"auto"}}
                  onClick={() => setCreateFrom()} // Optional: close on backdrop click
                ></div>
              )}
      <div ref={reactFlowWrapper} className="reactflow-wrapper">
        <nodeCreationContext.Provider value={onCreateNode}>
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
              <Controls />
              <Background color="#aaa" gap={16} />
            </ReactFlow>
        </nodeCreationContext.Provider>
      </div>
      </div>
  );
};

export default ({nodes,edges}) => (
  <ReactFlowProvider>
    <DnDProvider>
      <FlowEditor nodesIn={nodes} edgesIn={edges}/>
    </DnDProvider>
  </ReactFlowProvider>
);