import React, { useCallback } from 'react';

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
        <div className="flex flex-row gap-2 text-2xl w-[40vw]">
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
OpenAlex.type = 'OpenAlex';
OpenAlex.group = 'Repository';

export default OpenAlex;

