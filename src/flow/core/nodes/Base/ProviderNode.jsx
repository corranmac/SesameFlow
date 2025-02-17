import React from 'react';

import { Box,Tag,Flex } from "@chakra-ui/react"
import RootNode from "./RootNode"

const BasicNode = ({ children, type, group, ...props }) => {
    
    return(
    <RootNode incoming={false} outgoing={true} {...props}>
        <Tag.Root 
          backgroundColor="rgba(255, 230, 199)" 
          borderWidth="1px"
          borderRightColor="black"
          style={{writingMode:"sideways-lr"}}
          >
            <Tag.Label textStyle="2xl">{group}</Tag.Label>
          </Tag.Root>
          <Flex p={2} w="42vw" gap={7} direction="column" alignItems="center">
            <Box textStyle="5xl">{type}</Box>
            <Flex>{children}</Flex>
          </Flex>
    </RootNode>);
};

export default BasicNode;