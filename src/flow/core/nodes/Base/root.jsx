import React, { useEffect, useState, useContext,useMemo } from 'react';
import { Box, Flex, Button, useConst } from '@chakra-ui/react';
import { Handle, Position, useNodeConnections,useNodeId} from '@xyflow/react';
import {EventContext} from "@flowcore/utils/eventcontext"
const CreatorComponent = ({ handlePosition }) => {
  const openNodeMenu = useContext(EventContext);
  const hPosition = useConst(handlePosition)

  return (
      <Button onClick={()=>openNodeMenu({hPosition},{x:3,y:2})} textStyle="3xl" size="6xs" backgroundColor="white" color="black">
      ＋
      </Button>
  );
};

const HandleComponent = ({ handleId, position, type, id, connectState }) => {
  const [hover, setHover] = useState(false);

  // Memoize the style object to prevent it from being recreated on each render
  const style = useMemo(() => {
    if (!connectState) {
      return {
        borderColor: hover ? "blue" : "black",
        opacity: hover ? 1 : 0.2,
        backgroundColor: "white",
        borderRadius: "0.5rem", // 'md' typically corresponds to '0.375rem'
        width: "3rem",
        height: "3rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "1.5rem", // '2xl' typically corresponds to '1.5rem' in font size
        color: "grey",
        transition: "all 0.2s ease-in-out", // For hover transition effect
      };
    }
    return {};
  }, [connectState, hover]); // Recompute the style only when connectState or hover changes

  return (
    <Handle
      style={style}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      type={type}
      position={position}
      id={handleId}
    >
      {!connectState && <CreatorComponent handlePosition={position} />}
    </Handle>
  );
};


  const RootNode = ({ children, incoming, outgoing }) => {

    const memoizedChildren = React.useMemo(() => children, [children]);

    const [connectionVisibility, setConnectionVisibility] = useState({"incomingL":false,"incomingT":false,"outgoingR":false,"outgoingB":false});
    
    const nodeId = useNodeId();
    const connections = useNodeConnections({ id:nodeId });

  
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
            />
          )
        );
      });
    }, [handleList, connectionVisibility, incoming, outgoing]);
  
    return (
      <Box 
        marginTop={connectionVisibility['incomingT']  ? 0 : 10}
        marginLeft={connectionVisibility['incomingL']  ? 0 : 10}
        marginRight={connectionVisibility['outgoingR']  ? 0 : 10}
        marginBottom={connectionVisibility['outgoingB']  ? 0 : 10}
      >
        <Flex borderWidth="1px" borderColor="black" rounded="md">
          {memoizedChildren}
        </Flex>
          {Handles}
      </Box>
    );
  };

export default React.memo(RootNode);