import React, {
  useState,
  useMemo,
  useRef,
  useCallback,
  useEffect,
  useLayoutEffect
} from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Controls,
  useReactFlow,
  Background,
  useOnViewportChange,
  Panel
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import {
  getRegisteredNodeTypes,
  loadRegistry,
} from "@flow/registry/flowNodeRegistry";

import { nanoid } from "nanoid";

import { nodeCreationContext } from "@flowcore/utils/nodecontext";

import useFlowStore from "@flowstate/store";
import { NodeMenu } from "@flow/layout/NodeMenu";

loadRegistry();
const initialNodeTypes = getRegisteredNodeTypes();


export const FlowEditor = ({ nodesIn, edgesIn, ...props }) => {
  const reactFlowWrapper = useRef(null);

  const {
    viewport,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    updateNodePosition,
    addEdge,
    setViewport,
    clearStore,
    updateNodeTypes,
    nodeTypes,
    setNodes,
    setEdges
  } = useFlowStore();

  useMemo(() => updateNodeTypes(Object.keys(initialNodeTypes)), []);

  console.log(initialNodeTypes);

  const nodes = nodesIn;
  const edges = edgesIn;

  const [nodeMenuVisible, setNodeMenuVisible] = useState(false);

  const reactFlow = useReactFlow();

  const onCreateNode = useCallback((nodeId, handlePosition, type) => {
    if (!Object.keys(initialNodeTypes).includes(type)) {
      return;
    }

    //Find source nodes internal props
    let internalNode = reactFlow.getNodes().find((node) => node.id == nodeId);

    let x = internalNode.position.x;
    let y = internalNode.position.y;

    const w = internalNode.measured.width;
    const h = internalNode.measured.height;

    const xgap = 40;
    const ygap = 40;
    const newId = nanoid();

    if (handlePosition === "right") {
      x = x + xgap + w;
    }
    if (handlePosition === "left") {
      x = x - xgap - w;
    }
    if (handlePosition === "top") {
      y = y - ygap - h;
    }
    if (handlePosition === "bottom") {
      y = y + ygap + h;
    }

    addNode({ id: newId, type: type, position: { x: x, y: y }, data: {} });

    if (handlePosition === "left") {
      addEdge({
        source: newId,
        sourceHandle: "outgoingR",
        target: nodeId,
        targetHandle: "incomingL",
      });
    }
    if (handlePosition === "right") {
      addEdge({
        source: nodeId,
        sourceHandle: "outgoingR",
        target: newId,
        targetHandle: "incomingL",
      });
    }
    if (handlePosition === "top") {
      addEdge({
        source: newId,
        sourceHandle: "outgoingB",
        target: nodeId,
        targetHandle: "incomingT",
      });
    }
    if (handlePosition === "bottom") {
      addEdge({
        id: nanoid(),
        source: nodeId,
        sourceHandle: "outgoingB",
        target: newId,
        targetHandle: "incomingT",
      });
    }
  });

  useOnViewportChange({
    onEnd: (newviewport) => setViewport(newviewport),
  });

  return (
    <div className="flow">
      <NodeMenu
        nodeMenuVisible={nodeMenuVisible}
        setNodeMenuVisible={setNodeMenuVisible}
      />
      <div ref={reactFlowWrapper} className="reactflow-wrapper">
        <nodeCreationContext.Provider value={onCreateNode}>
          <ReactFlow
            nodes={nodes}
            defaultViewport={viewport}
            edges={edges}
            nodeTypes={initialNodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeOrigin={[0.5, 0.5]}
            snapToGrid
            snapGrid={[8, 8]}
            minZoom={0.2}
            connectionLineType={"smoothstep"}
          >
            <Controls />
            <Background gap={8} />
          </ReactFlow>
        </nodeCreationContext.Provider>
      </div>
    </div>
  );
};
