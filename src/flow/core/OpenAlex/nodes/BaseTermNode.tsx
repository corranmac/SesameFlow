import React, { useCallback } from 'react';
import BasicNode from '@flowcore/base/nodes/ProviderType';
import useFlowStore from '@flowstate/store';

// Define the interface for props
interface BaseTermProps {
  id: string;
  data: {
    filter_value: string;
  };
}

// Define the interface for the static properties
interface BaseTermStatic {
  label: string;
  display_label: string;
  source: string;
  display_source: string;
  group: string;
  type: string;
}

// Combine both the props and the static properties interface
type BaseTermType = React.FC<BaseTermProps> & BaseTermStatic;

const BaseTerm: BaseTermType = ({ id, data }) => {
  const { updateNodeData } = useFlowStore((state: { updateNodeData: (id: string, data: { filter_value: string; filter: string }) => void }) => ({
    updateNodeData: state.updateNodeData,
  }));

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      updateNodeData(id, { filter_value: event.target.value, filter: 'abstract.search' });
    },
    [id, updateNodeData]
  );

  return (
    <BasicNode type="Open Alex" group={BaseTerm.group} key={id}>
      <div className="flex flex-row text-2xl w-[40vw]">
        <p>Base Term</p>
        <input
          placeholder=""
          className="filter-input"
          value={data.filter_value || ''}
          onChange={handleChange}
        />
      </div>
    </BasicNode>
  );
};


// Assign static properties to the component
BaseTerm.label = 'base_term';
BaseTerm.display_label = "Base_Term";
BaseTerm.source = 'OpenAlex';
BaseTerm.display_source = 'OA';
BaseTerm.group = 'Repository';
BaseTerm.type = 'Input';

export default BaseTerm;

