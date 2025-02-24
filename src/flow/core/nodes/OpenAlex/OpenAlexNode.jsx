import React, { useCallback } from 'react';

import { Field,Input,HStack, useConst } from "@chakra-ui/react"
import BasicNode from "@flowcore/nodes/Base/providertype"
import useFlowStore from '@flowstate/store';

const OpenAlex = ({ id,data }) => {
  const { updateNodeData } = useFlowStore((state) => ({
    updateNodeData: state.updateNodeData,
  }));
  const handleChange = useCallback((event) => {
    updateNodeData(id, { filter_value: event.target.value });
  }, [id, updateNodeData]);

  return (
    <BasicNode type={OpenAlex.type} group={OpenAlex.group} key={id}>
      <Field.Root>
        <HStack>
          <Field.Label textStyle="lg">Base Term</Field.Label>
          <Input
            textStyle="xl"
            placeholder="term"
            value={data.filter_value}
            onChange={handleChange}
          />
        </HStack>
      </Field.Root>
    </BasicNode>
  );
};

// Define the node type
OpenAlex.type = 'OpenAlex';
OpenAlex.group = 'Repository';

export default OpenAlex;

