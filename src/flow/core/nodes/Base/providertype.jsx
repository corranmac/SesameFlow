import React, {useMemo} from 'react';

import { Box,Text,Flex, useConst } from "@chakra-ui/react"
import RootNode from "./root"

const BasicNode = ({ children, group }) => {
  const nodeGroup = useConst(group);
  const memoizedStyle = useMemo(() => ({ writingMode: "sideways-lr" }), []);
  
  return (
    <RootNode incoming={false} outgoing={true}>
      <div
      className= "!important [font-size:50px] bg-blue-400 border-1 border-r-black [writing-mode:sideways-lr]"
      >
        {nodeGroup}
      </div>
      <Flex p={2} w="42vw" gap={7} direction="column" alignItems="center">
        <Text textStyle="5xl">{nodeGroup}</Text>
        <Flex>{children}</Flex> {/* No need for useMemo on children unless necessary */}
      </Flex>
    </RootNode>
  );
};

export default BasicNode;
