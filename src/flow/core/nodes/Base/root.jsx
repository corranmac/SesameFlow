import React, { useEffect, useState, useContext,useMemo,useCallback } from 'react';
import { Position, useNodeConnections,useNodeId,useInternalNode} from '@xyflow/react';
import { HandleComponent } from './NodeHandles';
import useFlowStore from "@flowstate/store"
import { nodeCreationContext } from '@flowcore/utils/nodecontext';

  const RootNode = ({ children, incoming, outgoing }) => {

    const memoizedChildren = React.useMemo(() => children, [children]);

    const [connectionVisibility, setConnectionVisibility] = useState({"incomingL":false,"incomingT":false,"outgoingR":false,"outgoingB":false});
    
    const nodeId = useNodeId();
    const connections = useNodeConnections({ id:nodeId });
    
    const { nodes } = useFlowStore((state) => ({
      nodes: state.nodes,
    }));

    const recentNodeTypes = [...new Set(nodes.map(node => node.type))].slice(-10);

    const createNodeContext = useContext(nodeCreationContext);
    
    const createNode = (handlePosition, type) => {
      createNodeContext(nodeId, handlePosition, type);
    };

    useEffect(() => {
      const handleIds = ['incomingL', 'incomingT', 'outgoingR', 'outgoingB'];
      
      const newVisibility = handleIds.reduce((acc, handleId) => {
        acc[handleId] = connections.some(
          conn => ( conn.targetHandle === handleId || conn.sourceHandle === handleId && conn.source === nodeId)
        );
        return acc;
      }, {});
      
      setConnectionVisibility(newVisibility);
    }, [connections, nodeId]);
  
    const handleList = [
      { position: Position.Left, type: 'target', id: 'incomingL' },
      { position: Position.Right, type: 'source', id: 'outgoingR' },
      { position: Position.Top, type: 'target', id: 'incomingT' },
      { position: Position.Bottom, type: 'source', id: 'outgoingB' },
    ];

          // Memoize the Handles rendering function
    const Handles = useMemo(() => {
      return handleList.map(({ position, type, id }) => {
        const connectState = connectionVisibility[id];
        return (
          (type === 'target' && incoming || type === 'source' && outgoing) && (
            <HandleComponent
              key={id}
              position={position}
              type={type}
              handleId={id}
              connectState={connectState}
              createNode={createNode}
              recentNodeTypes={recentNodeTypes}
            />
          )
        );
      });
    }, [handleList, connectionVisibility, incoming, outgoing]);

    const pPaddingStyles = {
      position: "relative",
      width:"100%",
      top: connectionVisibility['incomingT'] ? "3rem" : "0",
      left: connectionVisibility['incomingL'] ? "3rem" : "0",
      right: connectionVisibility['outgoingR'] ? "3rem" : "0",
      bottom: connectionVisibility['outgoingB'] ? "3rem" : "0",
    };

    const cPaddingStyles = {
      paddingTop: connectionVisibility['incomingT'] ? 0 : "3rem",
      paddingLeft: connectionVisibility['incomingL'] ? 0 : "3rem",
      paddingRight: connectionVisibility['outgoingR'] ? 0 : "3rem",
      paddingBottom: connectionVisibility['outgoingB'] ? 0 : "3rem",
    };

    return (
      <div style={pPaddingStyles}>
          {Handles}
          <div style={cPaddingStyles}>
            <div className="border-1 bg-white border-black-400 rounded-md">
              {memoizedChildren}
            </div>
          </div>
      </div>
    );
  };

export default React.memo(RootNode);