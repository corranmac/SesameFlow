import { useMemo,memo } from "react";
import { SelectItem, SelectItemGroup,SelectRoot,SelectContent,SelectLabel,SelectTrigger,SelectValueText } from "@/components/ui/select";
import { groups } from "./filters";
import BasicNode from "../Base/FilterNode"
import { createListCollection,Input,Field,Flex } from "@chakra-ui/react"
import useStore from '@flowstate/store';


const BooleanInput = ({id, data}) =>{
  const updateNodeData = useStore((state) => state.updateNodeData);
  const itemsCollection = createListCollection({
    items: ['True','False']
  });

  return(
    <SelectRoot collection={itemsCollection} value={data.filter_value} onValueChange={(event) => updateNodeData(id, {filter_value:event.value})}>
    <SelectTrigger>
      <SelectValueText placeholder="value" />
    </SelectTrigger>
    <SelectContent>
      {itemsCollection.items.map((option) => (
                  <SelectItem item={option} key={option}>
                    {option}
                  </SelectItem>
                ))}
    </SelectContent>
  </SelectRoot>
  );
}

const TermInput = ({id,data}) =>{
  const updateNodeData = useStore((state) => state.updateNodeData);
  return(
    <Field.Root>
      <Input placeholder="value" defaultValue={data.filter_value} onChange={(event) => updateNodeData(id, {filter_value:event.target.value})}/>
    </Field.Root>
  );
}

const RangeInput = ({id,data}) =>{
  const updateNodeData = useStore((state) => state.updateNodeData);
  return(<>Hi</>);
}


const FilterSelection = ({ id, group, itemsCollection, dragging, data }) => {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const Selects = useMemo(() => {
    return (
      <SelectItemGroup key={group} overflowY="auto" maxHeight="30vh">
        {itemsCollection.items.map((item) => (
          <SelectItem item={item} key={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectItemGroup>
    );
  }, [group, itemsCollection]);

  return (
      <SelectRoot minW="24vw" variant="subtle" value={data.filter} onValueChange={(event) => updateNodeData(id, {filter:event.value, filter_value:""})} collection={ itemsCollection } >
        <SelectTrigger>
          <SelectValueText placeholder="Filter" />
        </SelectTrigger>
        <SelectContent>{!dragging && Selects}</SelectContent>
      </SelectRoot>
  );
};

// FilterNode component without static properties
const FilterNode = (props) => {
  const { id, groupLabel, itemsCollection, data } = props;
  
  var filterType = itemsCollection.items.find((item) => item.value === data.filter[0]);
  return (
    <BasicNode type={groupLabel} lazyMount={true} group="Filter">
      <Flex w="100%" direction="column" gap={2} alignItems="stretch">
        <FilterSelection {...props}/>
        {filterType?.inputType === 'boolean' ? (
          <BooleanInput {...props} />
        ) : filterType?.inputType === 'range' ? (
          <RangeInput {...props} />
        ) : filterType ? (
          <TermInput {...props} />
        ) : null}
      </Flex>
    </BasicNode>
  );
};

export const factory = () => {
  return groups.map(({ group, groupLabel, items }) => {
    const nodeType = "Filter";  // e.g., 'AuthorshipFilterNode'
    const itemsCollection = createListCollection({
      items: items
    });
    // Create a specific component for this node type
    const SpecificFilterNode = memo((props) => (
      <FilterNode
        {...props}
        group={group}
        groupLabel={groupLabel}
        itemsCollection={itemsCollection}
        nodeType = {nodeType}
      />
    ));

    SpecificFilterNode.group = nodeType

    return {
      type: groupLabel,
      component: SpecificFilterNode,
    };
  });
};