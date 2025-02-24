import React,{useState} from 'react';
import { useDnD } from '@flowcore/utils/draganddrop';
import { getRegisteredNodeTypes } from '@flow/registry/NodeRegistry';


export const nodeselects = () => {
  const [_, setType] = useDnD();
  const nodeTypes = getRegisteredNodeTypes(); // Get registered nodes
  const [value, setValue] = useState(["Repositorys"])

  // Group nodes by their `.group` property
  const groupedNodes = Object.entries(nodeTypes).reduce((acc, [nodeType, component]) => {
    const group = component?.group+"s" || 'Ungrouped'; // Default group if none specified
    if (!acc[group]) acc[group] = [];
    acc[group].push({ nodeType, label: component.label || nodeType });
    return acc;
  }, {});
 
  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
 
  return (
    <AccordionRoot overflowY="auto" maxHeight="80vh" value={value} onValueChange={(e) => setValue(e.value)} variant={"outline"} collapsible={true} multiple={true}>
      {Object.entries(groupedNodes).map(([groupName, nodes]) => (
        <AccordionItem key={groupName} value={groupName}>
          <AccordionItemTrigger>
          <h4>{groupName}</h4>
          </AccordionItemTrigger>
          <AccordionItemContent overflowY="auto" maxHeight="40vh">
          {nodes.map(({ nodeType, label }) => (
            <Box
              key={nodeType}
              onDragStart={(event) => onDragStart(event, nodeType)}
              draggable
              borderColor="grey"
              textAlign="center"
              borderRadius="5px"
              margin="4px"
              borderWidth="1px"
            >
              {label}
            </Box>
          ))}
          </AccordionItemContent>
        </AccordionItem>
        ))
      }
      </AccordionRoot>
  );
};