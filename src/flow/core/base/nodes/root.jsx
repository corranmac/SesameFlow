import React, { useEffect, useState, useContext,useMemo,useCallback } from 'react';
import { Position, useNodeConnections,useNodeId, useUpdateNodeInternals} from '@xyflow/react';
import { HandleComponent } from './NodeHandles';
import useFlowStore from "@flowstate/store"
import { nodeCreationContext } from '@flowcore/utils/nodecontext';

  const RootNode = ({ children, incoming, outgoing }) => {
    
    const nodeId = useNodeId();
    const connections = useNodeConnections({ id:nodeId });
    const updateNodeInternals = useUpdateNodeInternals();
    
    const { nodes, nodeTypes } = useFlowStore((state) => ({
      nodes: state.nodes,
      nodeTypes: state.nodeTypes
    }));

    const recentNodeTypes = [...new Set(nodes.map(node => node.name))].slice(-10);

    const createNodeContext = useContext(nodeCreationContext);
    
    const createNode = (handlePosition, type) => {
      createNodeContext(nodeId, handlePosition, type);
    };

    const conStatus = useMemo(() => {
      const newStatus = {};
    
      const isConnected = (handleId) =>
        connections.some(
          (conn) =>
            (conn.targetHandle === handleId &&
              conn.target === nodeId) || (conn.sourceHandle === handleId && conn.source === nodeId) 
        );
    
      newStatus.l = isConnected("incomingL") ? "connected" : "connectable";
      newStatus.t = isConnected("incomingT") ? "connected" : "connectable";
      newStatus.b = isConnected("outgoingB") ? "connected" : "connectable";
      newStatus.r = isConnected("outgoingR") ? "connected" : "connectable";        
    
      // Apply the connection visibility rules
      if (newStatus.l==="connected") {
        newStatus.t = "disabled";
      }
      if (newStatus.t==="connected") {
        newStatus.l = "disabled";
      }
      if (newStatus.r==="connected") {
        newStatus.b = "disabled";
      }
      if (newStatus.b==="connected") {
        newStatus.r = "disabled";
      }
    
      return(newStatus);
    }, [connections, nodeId]);
      
    const handleList = [
      { position: Position.Left, type: 'target', id: 'incomingL', p:'l' },
      { position: Position.Right, type: 'source', id: 'outgoingR',p:'r' },
      { position: Position.Top, type: 'target', id: 'incomingT', p:'t'},
      { position: Position.Bottom, type: 'source', id: 'outgoingB', p:'b'},
    ];

          // Memoize the Handles rendering function
    const Handles = useMemo(() => {
      return handleList.map(({ position, type, id,p }) => {
        const connectState = conStatus[p];
        updateNodeInternals(nodeId)
      
        if ((type === 'target' && incoming) || (type === 'source' && outgoing)) {
          return (
            <HandleComponent
              key={id}
              position={position}
              type={type}
              handleId={id}
              createNode={createNode}
              connectState={connectState}
              nodeTypes={nodeTypes}
              recentNodeTypes={recentNodeTypes}
            />
          );
        }
        
        return <div/>;
      });
      
    }, [connections,conStatus]);

    const memoizedChildren = React.useMemo(() => children, [children]);
    
    return (
      <div className="relative flex flex-col items-center">
        {/* Left Handle */}
        <div className={`absolute top-1/2 transform -translate-y-1/2 
                  ${conStatus.l!=="connected" ? "left-[-50px]": "left-[-0px]"}
                  ${conStatus.l!=="connectable" ? "[visibility:hidden]":""}`}>
          {Handles[0]}
        </div>

        <div className="flex">
          {/* Top Handle */}
          <div className={`absolute left-1/2 transform -translate-y-1/2 
                  ${conStatus.t!=="connected" ? "top-[-50px]" : "top-[-0px]"}
                  ${conStatus.t!=="connectable" ? "[visibility:hidden]" : ""}`}>
            {Handles[2]}
          </div>

          <div className="node-container">
            {memoizedChildren}
          </div>

          {/* Bottom Handle */}
          <div className={`absolute left-1/2 transform -translate-x-1/2 
                  ${conStatus.b!=="connected" ? "bottom-[-50px]":"bottom-[0px]"}
                  ${conStatus.b!=="connectable" ? "[visibility:hidden]":""}`}>
            {Handles[3]}
          </div>
        </div>

        {/* Right Handle */}
        <div className={`absolute top-1/2 transform -translate-y-1/2
                  ${conStatus.r!=="connected" ? "right-[-50px]":"right-[-0px]"}
                  ${conStatus.r!=="connectable" ? "[visibility:hidden]":""}`}>
          {Handles[1]}
        </div>
      </div>

    );
  };

export default React.memo(RootNode);