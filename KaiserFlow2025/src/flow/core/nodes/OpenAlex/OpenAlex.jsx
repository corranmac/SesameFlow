import React from 'react';

import { Field,Input,HStack } from "@chakra-ui/react"
import BasicNode from "@flowcore/nodes/Base/ProviderNode"


const OpenAlex = ({ data }) => {
  return (
    <BasicNode type={OpenAlex.type} group={OpenAlex.group} key={OpenAlex.id}>
      <Field.Root >
        <HStack ><Field.Label textStyle="lg">Base Term</Field.Label>
        <Input textStyle="xl" placeholder="term"/></HStack>
      </Field.Root>
    </BasicNode>
  );
};

// Define the node type
OpenAlex.type = 'OpenAlex';
OpenAlex.group = 'Repository';

export default OpenAlex;
