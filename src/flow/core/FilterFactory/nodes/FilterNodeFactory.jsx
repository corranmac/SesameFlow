import { useMemo,memo,useCallback,useState,useEffect } from "react";
import { filterTypes } from "./filters";
import useFlowStore from '@flowstate/store';
import BasicNode from "@flowcore/base/nodes/FilterType"
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
          <option key={option} value={option} className="filter-option">
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

const YearInput = ({id,data}) =>{
  const {updateNodeData} = useFlowStore((state) => state.updateNodeData);
  const handleChange = useCallback((event) => {
    updateNodeData(id, { filter_value: event.target.value });
  }, [data]);
  return(
    <>
      <input 
    label="date" 
    id="year" 
    name="date" 
    min="1800" 
    max="2050" 
    className="filter-input"
    defaultValue={data.filter_value}
    onChange={handleChange}
    />
    </>
  );
}

const DateInput = ({id,data}) =>{
  const {updateNodeData} = useFlowStore((state) => state.updateNodeData);
  const handleChange = useCallback((event) => {
    updateNodeData(id, { filter_value: event.target.value });
  }, [data]);
  return(
    <>
      <input 
    label="date" 
    id="year" 
    type="date" 
    min="1800-01-01" 
    max="2050-01-01" 
    className="filter-input"
    defaultValue={data.filter_value}
    onChange={handleChange}
    />
    </>
  );
}


const RangeInput = ({id,data}) =>{
  const {updateNodeData} = useFlowStore((state) => state.updateNodeData);

  const [from, setFrom] = useState(data.filter_value.from ?? null)
  const [to, setTo] = useState(data.filter_value.to ?? null)

  useEffect(() => {
    updateNodeData(id, { filter_value:{"to":to,"from":from} });
  }, [from,to]);

  return(
    <div className="flex flex-row w-40">
      <input className="filter-input" id="to" defaultValue={to} onChange={(event)=>setTo(e.target.value)}/>
      <div className="!justify-text-center !text-2xl">-</div>
      <input className="filter-input" id="from" defaultValue={from} onChange={(event)=>setFrom(e.target.value)}/>
    </div>
  );
}


const FilterSelection = ({ id, filterType, itemsCollection }) => {
  const {updateNodeData, nodes} = useFlowStore((state) => state.updateNodeData);
  const nodeData = Object(nodes.find((node)=>node.id===id)).data;

  const handleChange = useCallback((value) => {
    updateNodeData(id, { filter: value.target.value});
  }, [id, updateNodeData]);

  useEffect(() => {
    if (!nodeData.filter) {
      updateNodeData(id, { filter:itemsCollection.items[0].value });
    }
  }, []);

  const Selects = useMemo(() => {
    return itemsCollection.items.map((item) => (
      <option
        key={item.value} 
        value={item.value}
        className="filter-option"
      >
        {item.label}
      </option>
    ));
  }, [filterType, itemsCollection]);  

  return (
      <select id="select-filter" 
        defaultValue={nodeData.filter}
        onChange={handleChange}
        className="filter-input">
          {Selects}
      </select>
  );
};


const FilterNode = (props) => {
  const { filterTypeLabel, itemsCollection, data } = props;
  
  const filterType = itemsCollection.items.find((item) => item.value === data.filter) || itemsCollection.items[0];
  
  return (
    <BasicNode label={filterTypeLabel} lazyMount={true} filterType={filterType}>
      <div className="node-content">
        <FilterSelection {...props}/>
        {filterType?.inputType === 'boolean' ? (
          <BooleanInput {...props} />
        ) : filterType?.inputType === 'range' ? (
          <RangeInput {...props} />
        ) : filterType?.inputType === 'year' ? (
          <YearInput {...props} />
        ) : filterType?.inputType === 'date' ? (
            <DateInput {...props} />
        ) : filterType ? (
          <TermInput {...props} />
        ) : null}
      </div>
    </BasicNode>
  );
};

export const factory = () => {
  return filterTypes.map(({ filterType, filterTypeLabel, items }) => {

    const itemsCollection = {
      items: items
    };
    // Create a specific component for this node label
    const SpecificFilterNode = (props) => (
      <FilterNode
        {...props}
        filterType={filterType}
        filterTypeLabel={filterTypeLabel}
        itemsCollection={itemsCollection}
      />
    );

    return {
      source: "OpenAlex",
      source_short: 'OA',
      group: "Repository",
      type: "Input",
      label: filterType,
      component: SpecificFilterNode,
    };
  });
};