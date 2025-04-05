import React, { useCallback } from 'react';

import BasicNode from "@flowcore/base/nodes/ProviderType"
import useFlowStore from '@flowstate/store';


const BaseTerm = ({ id,data }) => {
  const { updateNodeData } = useFlowStore((state) => ({
    updateNodeData: state.updateNodeData,
  }));
  const handleChange = useCallback((event) => {
    updateNodeData(id, { filter_value: event.target.value, filter:"abstract.search" });
  }, [id, updateNodeData]);

  return (
    <BasicNode type={"Open Alex"} group={BaseTerm.group} key={id}>
        <div className="flex flex-row text-2xl w-[40vw]">
          <p>Base Term</p>
          <input
            placeholder=""
            className="filter-input"
            value={data.filter_value || ""}
            onChange={handleChange}
          />
        </div>
    </BasicNode>
  );
};

// Define the node type
BaseTerm.source = 'OpenAlex';
BaseTerm.source_short = 'OA';
BaseTerm.group = 'Repository';
BaseTerm.label = 'base_term';
BaseTerm.type = 'Input';


export default BaseTerm;

