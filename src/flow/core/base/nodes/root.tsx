import React, { useEffect, useState, useContext, useMemo, useCallback } from 'react';
import { Position, useNodeConnections, useNodeId, useUpdateNodeInternals } from '@xyflow/react';
import { HandleComponent } from './NodeHandles';
import useFlowStore from "@flowstate/store";
import { AppContext } from '@flowcore/utils/nodecontext';

// Types for the connection status
interface ConnectionStatus {
  l: "connected" | "connectable" | "disabled";
  t: "connected" | "connectable" | "disabled";
  b: "connected" | "connectable" | "disabled";
  r: "connected" | "connectable" | "disabled";
}

// Types for Handle object in handleList
interface Handle {
  position: Position;
  type: 'target' | 'source';
  id: string;
  p: keyof ConnectionStatus;
}

interface RootNodeProps {
  children: React.ReactNode;
  incoming: boolean;
  outgoing: boolean;
}

const RootNode = ({ children, incoming, outgoing }:RootNodeProps) => {
  
  const nodeId = useNodeId();
  const connections = useNodeConnections({ id: nodeId  || ""});
  const updateNodeInternals = useUpdateNodeInternals();
  
  const { nodes, nodeTypes } = useFlowStore((state) => ({
    nodes: state.nodes,
    nodeTypes: state.nodeTypes,
  }));

  const {createNodeContext} = useContext(AppContext);
  
  const createNode = (handlePosition: Position, type: string) => {
    createNodeContext(nodeId, handlePosition, type);
  };

  const conStatus = useMemo<ConnectionStatus>(() => {
    const newStatus: ConnectionStatus = { l: "connectable", t: "connectable", b: "connectable", r: "connectable" };
  
    const isConnected = (handleId: string): boolean =>
      connections.some(
        (conn) =>
          (conn.targetHandle === handleId && conn.target === nodeId) ||
          (conn.sourceHandle === handleId && conn.source === nodeId)
      );

    newStatus.l = isConnected("incomingL") ? "connected" : "connectable";
    newStatus.t = isConnected("incomingT") ? "connected" : "connectable";
    newStatus.b = isConnected("outgoingB") ? "connected" : "connectable";
    newStatus.r = isConnected("outgoingR") ? "connected" : "connectable";

    // Apply the connection visibility rules
    if (newStatus.l === "connected") {
      newStatus.t = "disabled";
    }
    if (newStatus.t === "connected") {
      newStatus.l = "disabled";
    }
    if (newStatus.r === "connected") {
      newStatus.b = "disabled";
    }
    if (newStatus.b === "connected") {
      newStatus.r = "disabled";
    }

    return newStatus;
  }, [connections, nodeId]);

  const handleList: Handle[] = [
    { position: Position.Left, type: 'target', id: 'incomingL', p: 'l' },
    { position: Position.Right, type: 'source', id: 'outgoingR', p: 'r' },
    { position: Position.Top, type: 'target', id: 'incomingT', p: 't' },
    { position: Position.Bottom, type: 'source', id: 'outgoingB', p: 'b' },
  ];

  // Memoize the Handles rendering function
  const Handles = useMemo(() => {
    return handleList.map(({ position, type, id, p }) => {
      const connectState = conStatus[p];
      updateNodeInternals(nodeId);
  
      if ((type === 'target' && incoming) || (type === 'source' && outgoing)) {
        return (
          <HandleComponent
            key={id}
            position={position}
            type={type}
            handleId={id}
            createNode={createNode}
            connectState={connectState}
          />
        );
      }
  
      return <div />;
    });
  }, [connections, conStatus]);

  const memoizedChildren = React.useMemo(() => children, [children]);

  return (
    <div className="relative flex flex-col items-center">
      {/* Left Handle */}
      <div className={`absolute top-1/2 transform -translate-y-1/2 
                ${conStatus.l !== "connected" ? "left-[-50px]" : "left-[-0px]"}
                ${conStatus.l !== "connectable" ? "[visibility:hidden]" : ""}`}>
        {Handles[0]}
      </div>

      <div className="flex">
        {/* Top Handle */}
        <div className={`absolute left-1/2 transform -translate-y-1/2 
                ${conStatus.t !== "connected" ? "top-[-50px]" : "top-[-0px]"}
                ${conStatus.t !== "connectable" ? "[visibility:hidden]" : ""}`}>
          {Handles[2]}
        </div>

        <div className="node-container">
          {memoizedChildren}
        </div>

        {/* Bottom Handle */}
        <div className={`absolute left-1/2 transform -translate-x-1/2 
                ${conStatus.b !== "connected" ? "bottom-[-50px]" : "bottom-[0px]"}
                ${conStatus.b !== "connectable" ? "[visibility:hidden]" : ""}`}>
          {Handles[3]}
        </div>
      </div>

      {/* Right Handle */}
      <div className={`absolute top-1/2 transform -translate-y-1/2
                ${conStatus.r !== "connected" ? "right-[-50px]" : "right-[-0px]"}
                ${conStatus.r !== "connectable" ? "[visibility:hidden]" : ""}`}>
        {Handles[1]}
      </div>
    </div>
  );
};

export default React.memo(RootNode);
