import { Box,Flex,Button } from "@chakra-ui/react"
import React, { createContext, useContext, useCallback, useState} from 'react';
import useFlowStore from "@flowstate/store"
import { useShallow } from 'zustand/react/shallow';
import Canvas from "@flowcore/Canvas"

// Create the context to ensure only the current flow can be 
// accessed outside of the Flow Workspace
const FlowManagerContext = createContext(null);
  

const initialNodes=[
    {
        id: '0',
        type: 'OpenAlex',
        position: { x: 0, y: 0 },
        data: { value: 123 },
    },
    { 
        id: 'PZqlVzR4Y5W_m7ouhq2Q8',
        type: 'Core',
        data: { filter: '' },
        position: { x: 88, y: 356 },
    },
]
export const FlowWorkspace = React.memo(() => {
    const [flowVisible, setFlowVisible] = useState(true);

    const { flows, currentFlowId, createFlow, setCurrentFlow, renameCurrentFlow, currentFlow } = useFlowStore();

    // Memoizing the onCreate function with useCallback
    const onCreate = useCallback(() => {
        createFlow("flow1", initialNodes, []);
        setCurrentFlow("flow1");
        setFlowVisible(true);
    });

    return (
        <Flex>
            <FlowManagerContext.Provider value={{ isParent: true }}>
                <h1>{flowVisible && <Canvas />}</h1>
            </FlowManagerContext.Provider>
        </Flex>
    );
});


// Custom hook to access the context
export const useFlowManagerContext = () => {
    return useContext(FlowManagerContext);
};
