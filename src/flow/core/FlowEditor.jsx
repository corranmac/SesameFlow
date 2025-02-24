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

import {Button} from "@chakra-ui/react";
import { DnDProvider, useDnD } from './utils/draganddrop';
import '@xyflow/react/dist/style.css';
import { getRegisteredNodeTypes, loadRegistry } from '../registry/NodeRegistry';

import { nanoid } from 'nanoid'

import {NodeMenu} from "@flowcore/NodeMenu"
import {EventContext} from "@flowcore/utils/eventcontext"

import useFlowStore from "@flowstate/store"
import { useShallow } from 'zustand/react/shallow';

import { throttle } from 'lodash';

const THROTTLE_TIME = 2; // Adjust based on performance needs

loadRegistry();
const nodeTypes = getRegisteredNodeTypes();

const FlowEditor = (props) => {
  const reactFlowWrapper = useRef(null);
  // First, get the active flow state
  const {
    nodes,
    edges,
    viewport,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    setViewport,
    clearStore,
  } = useFlowStore(useShallow((state)=>(state.currentFlow)))

  const { screenToFlowPosition } = useReactFlow();
  const [type] = useDnD();

  /// Handle the node creation button click event, set the position of the handle, its node and the menu state
  const [createFrom, setCreateFrom] = useState({})

  const openNodeMenu = (handlePosition, nodePosition) => {
    setCreateFrom({handlePosition,nodePosition})
  };
  
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
        <EventContext.Provider value={openNodeMenu}>
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
              <NodeMenu createFrom={createFrom} setCreateFrom={setCreateFrom}/>
            </ReactFlow>
        </EventContext.Provider>
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