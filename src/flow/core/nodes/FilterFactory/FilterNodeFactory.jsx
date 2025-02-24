import { useMemo,memo,useCallback,useState } from "react";
import { groups } from "./filters";
import useFlowStore from '@flowstate/store';
import BasicNode from "@flowcore/nodes/Base/filtertype"
import { useNodesData } from '@xyflow/react';

const BooleanInput = ({id, data}) =>{
  const {updateNodeData} = useFlowStore((state) => state.updateNodeData);

  const handleChange = useCallback((event) => {
    updateNodeData(id, { filter_value: event.target.value });
  }, [data]);

  const options = ['true','false']

  return(
    <>
      <select
        value={data.filter_value}
        onChange={handleChange}
        className="filter-input"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}

const TermInput = ({id,data}) =>{
  const {updateNodeData} = useFlowStore((state) => state.updateNodeData);
  const handleChange = useCallback((event) => {
    updateNodeData(id, { filter_value: event.target.value });
  }, [data]);
  return(
    <>
      <input className="filter-input" defaultValue={data.filter_value} onChange={handleChange}/>
    </>
  );
}

const RangeInput = ({id,data}) =>{
  const updateNodeData = useFlowStore((state) => state.updateNodeData);
  return(<>Hi</>);
}


const FilterSelection = ({ id, group, itemsCollection, dragging, data }) => {
  const {updateNodeData} = useFlowStore((state) => state.updateNodeData);
  const nodeData = useNodesData(id);

  const handleChange = useCallback((value) => {
    updateNodeData(id, { filter: value.target.value, filter_value: "" });
  }, [id, updateNodeData]);

  const Selects = useMemo(() => {
    return itemsCollection.items.map((item) => (
      <option
        key={item.value} // Add a key for better React performance
        value={item.value}
        className="p-2 cursor-pointer hover:bg-gray-200"
      >
        {item.label}
      </option>
    ));
  }, [group, itemsCollection]);  

  return (
      <select id="select-filter" 
      defaultValue={nodeData.data.filter}
      onChange={handleChange}
      className="filter-input">
          {Selects}
      </select>
  );
};


const FilterNode = (props) => {
  const { id, type, groupLabel, itemsCollection, data } = props;
  
  const filterType = itemsCollection.items.find((item) => item.value === data.filter) || itemsCollection.items[0];
  return (
    <BasicNode type={groupLabel} lazyMount={true} group="Filter">
      <div className="node-content">
        <FilterSelection {...props}/>
        {filterType?.inputType === 'boolean' ? (
          <BooleanInput {...props} />
        ) : filterType?.inputType === 'range' ? (
          <RangeInput {...props} />
        ) : filterType ? (
          <TermInput {...props} />
        ) : null}
      </div>
    </BasicNode>
  );
};

export const factory = () => {
  return groups.map(({ group, groupLabel, items }) => {
    const nodeType = "Filter";  // e.g., 'AuthorshipFilterNode'
    const itemsCollection = {
      items: items
    };
    // Create a specific component for this node type
    const SpecificFilterNode = (props) => (
      <FilterNode
        {...props}
        group={group}
        groupLabel={groupLabel}
        itemsCollection={itemsCollection}
        nodeType = {nodeType}
      />
    );

    SpecificFilterNode.group = nodeType

    return {
      type: groupLabel,
      component: SpecificFilterNode,
    };
  });
};