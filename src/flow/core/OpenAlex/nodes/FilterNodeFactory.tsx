import { useMemo, memo, useCallback, useState, useEffect } from "react";
import { filterTypes } from "@flowcore/OpenAlex/data/filters";
import useFlowStore,{FlowStore} from "@flowstate/store";
import BasicNode from "@flowcore/base/nodes/FilterType";
import { useNodesData, Node } from "@xyflow/react";

const BooleanInput = ({ id, data }:{id:string; data:any}) => {
  const { updateNodeData } = useFlowStore((state:FlowStore) => state.updateNodeData);

  const handleChange = useCallback(
    (e:React.ChangeEvent<HTMLSelectElement>) => {
      updateNodeData(id, { filter_value: e.target.value });
    },
    [data]
  );

  const options = ["true", "false"];

  return (
    <>
      <select
        value={data?.filter_value}
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
};

const TermInput = ({ id, data }:{id:string,data:any}) => {
  const { updateNodeData } = useFlowStore((state:FlowStore) => state.updateNodeData);
  const handleChange = useCallback(
    (e:React.ChangeEvent<HTMLInputElement>) => {
      updateNodeData(id, { filter_value: e.target.value });
    },
    [data]
  );
  return (
    <>
      <input
        className="filter-input"
        defaultValue={data?.filter_value ?? ""}
        onChange={handleChange}
      />
    </>
  );
};

const YearInput = ({ id, data }:{id:string,data:any}) => {
  const { updateNodeData } = useFlowStore((state:FlowStore) => state.updateNodeData);
  const handleChange = useCallback(
    (e:React.ChangeEvent<HTMLInputElement>) => {
      updateNodeData(id, { filter_value: e.target.value });
    },
    [data]
  );
  return (
    <>
      <input
        id="year"
        name="date"
        min="1800"
        max="2050"
        className="filter-input"
        defaultValue={data?.filter_value ?? ""}
        onChange={handleChange}
      />
    </>
  );
};

const DateInput = ({ id, data }:{id:string,data:any}) => {
  const { updateNodeData } = useFlowStore((state:FlowStore) => state.updateNodeData);
  const handleChange = useCallback(
    (e:React.ChangeEvent<HTMLInputElement>) => {
      updateNodeData(id, { filter_value: e.target.value });
    },
    [data]
  );
  return (
    <>
      <input
        id="year"
        type="date"
        min="1800-01-01"
        max="2050-01-01"
        className="filter-input"
        defaultValue={data?.filter_value ?? ""}
        onChange={handleChange}
      />
    </>
  );
};

const RangeInput = ({ id, data }:{id:string,data:any}) => {
  const { updateNodeData } = useFlowStore((state:FlowStore) => state.updateNodeData);

  const [from, setFrom] = useState(data?.filter_value?.from ?? null);
  const [to, setTo] = useState(data?.filter_value?.to ?? null);

  useEffect(() => {
    updateNodeData(id, { filter_value: { to: to, from: from } });
  }, [from, to]);

  return (
    <div className="flex flex-row w-40">
      <input
        className="filter-input"
        id="to"
        defaultValue={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <div className="!justify-text-center !text-2xl">-</div>
      <input
        className="filter-input"
        id="from"
        defaultValue={from}
        onChange={(e) => setFrom(e.target.value)}
      />
    </div>
  );
};

const FilterSelection = ({ id, filterType, itemsCollection }:{id:string,filterType:string,itemsCollection:any}) => {
  const { updateNodeData, nodes } = useFlowStore(
    (state:FlowStore) => state.updateNodeData
  );
  const nodeData = Object(nodes.find((node: Node) => node.id === id)).data;

  const handleChange = useCallback(
    (value:any) => {
      updateNodeData(id, { filter: value.target.value });
    },
    [id, updateNodeData]
  );

  useEffect(() => {
    if (!nodeData?.filter) {
      updateNodeData(id, { filter: itemsCollection.items[0].value });
    }
  }, []);

  const Selects = useMemo(() => {
    return itemsCollection.items.map((item:any) => (
      <option key={item.value} value={item.value} className="filter-option">
        {item.label}
      </option>
    ));
  }, [filterType, itemsCollection]);

  return (
    <select
      id="select-filter"
      defaultValue={nodeData?.filter ?? ""}
      onChange={handleChange}
      className="filter-input"
    >
      {Selects}
    </select>
  );
};

interface FilterNodeProps {
  filterType:string;
  filterTypeLabel:string; 
  itemsCollection:any;
  data:any;
  id:string;
  items:any;
}

const FilterNode = ({ filterTypeLabel, itemsCollection, data, id }:{filterTypeLabel:string,itemsCollection:any,data:any,id:string}) => {

  data={"filter":"abstract.search"}
  const filterType =
    itemsCollection.items.find((item) => item.value === data.filter) ??
    itemsCollection.items[0];

  return (
    <BasicNode label={filterTypeLabel} lazyMount={true} filterType={filterType}>
      <div className="node-content">
        <FilterSelection id={id} itemsCollection={itemsCollection} filterType={filterType} />
        {filterType?.inputType === "boolean" ? (
          <BooleanInput  id={id} data={data}  />
        ) : filterType?.inputType === "range" ? (
          <RangeInput  id={id} data={data}  />
        ) : filterType?.inputType === "year" ? (
          <YearInput  id={id} data={data}  />
        ) : filterType?.inputType === "date" ? (
          <DateInput  id={id} data={data}  />
        ) : filterType ? (
          <TermInput  id={id} data={data}  />
        ) : null}
      </div>
    </BasicNode>
  );
};

export const factory = () => {
  return filterTypes.map(({ filterType, filterTypeLabel, items }:FilterNodeProps) => {
    const itemsCollection = {
      items: items,
    };
    // Create a specific component for this node label
    const SpecificFilterNode = (props: FilterNodeProps) => (
      <FilterNode
        filterTypeLabel={filterTypeLabel}
        itemsCollection={itemsCollection}
        {...props}
      />
    );

    // Attach static properties
    SpecificFilterNode.label = filterType;
    SpecificFilterNode.display_label = filterTypeLabel;
    SpecificFilterNode.source = "OpenAlex";
    SpecificFilterNode.display_source = "OA";
    SpecificFilterNode.group = "Repository";
    SpecificFilterNode.type = "Input";

    return {
      label: filterTypeLabel,
      source: "OpenAlex",
      component: SpecificFilterNode,
    };
  });
};
