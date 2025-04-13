import React, {
  useState,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import {
  ReactFlow,
  Controls,
  useReactFlow,
  Background,
  useOnViewportChange,
  Node,
  Edge,
  ConnectionLineType,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';

import { getRegisteredNodeTypes, loadRegistry } from '@flow/registry/flowNodeRegistry';
import { nanoid } from 'nanoid';

import { AppContext } from '@flowcore/utils/nodecontext';
import useFlowStore from '@flowstate/store';
import { NodeMenu } from '@flow/layout/NodeMenu';

// Load node types
loadRegistry();
const initialNodeTypes = getRegisteredNodeTypes();

interface FlowEditorProps {
  nodesIn: Node[];
  edgesIn: Edge[];
}

type HandlePosition = 'left' | 'right' | 'top' | 'bottom';

export const FlowEditor = ({ nodesIn, edgesIn }:FlowEditorProps) => {
  const reactFlowWrapper = useRef<HTMLDivElement | null>(null);

  const {
    viewport,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    addEdge,
    setViewport,
    updateNodeTypes,
  } = useFlowStore();

  useMemo(() => {
    updateNodeTypes(Object.keys(initialNodeTypes));
  }, []);

  const nodes = nodesIn;
  const edges = edgesIn;
  const recentNodeTypes = useMemo(()=>[...new Set(nodes.map((node) => node.type))].slice(-10),[]);

  const [nodeMenuVisible, setNodeMenuVisible] = useState(false);
  const reactFlow = useReactFlow();

  const onCreateNode = useCallback(
    (nodeId: string, handlePosition: HandlePosition, type: string) => {
      if (!Object.keys(initialNodeTypes).includes(type)) return;

      const internalNode = reactFlow.getNodes().find((node) => node.id === nodeId);
      if (!internalNode || !internalNode.measured) return;

      let { x, y } = internalNode.position;
      const { width: w, height: h } = internalNode.measured;

      const xgap = 40;
      const ygap = 40;
      const newId = nanoid();

      if (handlePosition === 'right') x += xgap + w;
      if (handlePosition === 'left') x -= xgap + w;
      if (handlePosition === 'top') y -= ygap + h;
      if (handlePosition === 'bottom') y += ygap + h;

      addNode({ id: newId, type, position: { x, y }, data: {} });

      const baseEdge = {
        id: nanoid(),
        source: '',
        sourceHandle: '',
        target: '',
        targetHandle: '',
      };

      switch (handlePosition) {
        case 'left':
          Object.assign(baseEdge, {
            source: newId,
            sourceHandle: 'outgoingR',
            target: nodeId,
            targetHandle: 'incomingL',
          });
          break;
        case 'right':
          Object.assign(baseEdge, {
            source: nodeId,
            sourceHandle: 'outgoingR',
            target: newId,
            targetHandle: 'incomingL',
          });
          break;
        case 'top':
          Object.assign(baseEdge, {
            source: newId,
            sourceHandle: 'outgoingB',
            target: nodeId,
            targetHandle: 'incomingT',
          });
          break;
        case 'bottom':
          Object.assign(baseEdge, {
            source: nodeId,
            sourceHandle: 'outgoingB',
            target: newId,
            targetHandle: 'incomingT',
          });
          break;
      }

      addEdge(baseEdge);
    },
    [addEdge, addNode, reactFlow]
  );

  useOnViewportChange({
    onEnd: (newViewport) => setViewport(newViewport),
  });

  return (
    <div className="flow">
      <NodeMenu nodeMenuVisible={nodeMenuVisible} setNodeMenuVisible={setNodeMenuVisible} />
      <div ref={reactFlowWrapper} className="reactflow-wrapper">
        <AppContext.Provider value={{createNodeContext:onCreateNode, nodeTypes:initialNodeTypes,recentNodeTypes:recentNodeTypes}}>
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
            snapGrid={[4, 4]}
            minZoom={0.2}
            connectionLineType={ConnectionLineType.SmoothStep}
          >
            <Controls />
            <Background gap={16} />
          </ReactFlow>
        </AppContext.Provider>
      </div>
    </div>
  );
};
