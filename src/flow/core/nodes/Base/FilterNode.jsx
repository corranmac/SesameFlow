import React from 'react';

import { Box,Tag,Flex } from "@chakra-ui/react"
import RootNode from "./RootNode"

const BasicNode = ({ children, type, group, ...props }) => {
    return(
    <RootNode incoming={true} outgoing={true} {...props}>
      <Flex minH = "20vh" alignItems="stretch" justifyContent="stretch">
          <Tag.Root 
            backgroundColor="#c3fcf1" 
            borderWidth="1px"
            borderRightColor="black"
            style={{writingMode:"sideways-lr"}}
            justifyContent="center"
          >
            <Tag.Label flexDir="column" textStyle="xl">
              {type}</Tag.Label>
          </Tag.Root>
          <Flex p={2}>
            {children}
          </Flex>
      </Flex>
    </RootNode>);
};

export default BasicNode;