import React from 'react';

import { Box,Flex,Tag } from "@chakra-ui/react"
import {Handle,Position} from "@xyflow/react"

const RootNode = ({ children, type, group, incoming, outgoing, ...props }) => {

    return(<Box
    borderWidth="1px"
    borderColor="black"
    rounded="md">
    <Flex>
        {children}
    </Flex>
    {incoming && <Handle
        type="target"
        position={Position.Top}
        id="incomingT"
      />}
    {outgoing && <Handle
        type="source"
        position={Position.Bottom}
        id="outgoingB"
      />}
    {incoming && <Handle
        type="source"
        position={Position.Left}
        id="incomingL"
      />}
    {incoming && <Handle
        type="target"
        position={Position.Right}
        id="outgoingR"
      />}
    </Box>
    );
};

export default RootNode;