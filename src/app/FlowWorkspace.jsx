import React, { createContext, useContext, useCallback,useEffect, useState, useMemo} from 'react';
import useFlowStore from "@flowstate/store"
import { useShallow } from 'zustand/react/shallow';
import Canvas from "@flowcore/FlowCanvas"
import { Card,ProjectCard, FlowDeleteDialogue, Dialog } from '@sesameflow';
import { nanoid } from 'nanoid';

// Create the context to ensure only the current flow can be 
// accessed outside of the Flow Workspace
const FlowManagerContext = createContext({
    isParent: false,
    loadFlow: () => {},
    createFlow: () => {},
    deleteFlow: () => {},
    updateFlowMetadata: () => {},
    currentFlow: null,
    flowVisible: false,
    flowMetadata: {}
  });
  


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

const BreadCrumbs = ({flowVisible,flowName,setFlowVisible}) =>{
    return(
    <nav className="flex" aria-label="Breadcrumb">
    <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        <li className="inline-flex items-center">
        <a onClick={()=>setFlowVisible(false)} className="cursor-pointer inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
            <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
            </svg>
            Workspace
        </a>
        </li>
        {flowVisible &&<li>
        <div className="flex items-center">
            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
            <a className="cursor-pointer ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                {flowName}
            </a>
        </div>
        </li>}
    </ol>
    </nav>)
}

const NodeMenu = ({nodeMenuVisible,setNodeMenuVisible})=>{
    const handleCreate = useCallback((name, description) => {
        let metadata = { 'name': name, 'description': description };
        useCreateFlow(metadata);
    }, [useCreateFlow]);    

    return(
        <Dialog 
        isOpen={nodeMenuVisible} 
        setIsOpen={setNodeMenuVisible}
        closeText="Close"
        title="Add Node"
        >
            <div className="flex flex-col mt-2 gap-2">
                
            </div>
        </Dialog>
    )
}

const FlowCreateDialog = ({useCreateFlow,showAddDialogue,setShowAddDialogue})=>{
    const [flowName,setFlowName] = useState("")
    const [flowDescription,setFlowDescription] = useState("")

    const handleCreate = useCallback((name, description) => {
        let metadata = { 'name': name, 'description': description };
        useCreateFlow(metadata);
    }, [useCreateFlow]);    

    return(
        <Dialog 
        isOpen={showAddDialogue} 
        setIsOpen={setShowAddDialogue}
        closeText="Cancel"
        title="Create New Flow"
        submitButton={<button onClick={()=>handleCreate(flowName,flowDescription)} 
                       disabled={flowName===""} className="submit-button">
                        Create</button>}        
        >
            <div className="flex flex-col mt-2 gap-2">
                <div>
                <label for="flowName"><span className="text-red-400">*</span> Name:</label>
                <input name="flowName" className="standard-input" value={flowName} onChange={(e)=>setFlowName(e.target.value)}></input>
                {flowName==="" && <span className="text-sm text-red-400 italic"> * A name for your flow is required</span>}
                </div>
                <div>
                <label for="flowDescription">  Description:</label>
                <input name="flowDescription" className="standard-input" value={flowDescription} onChange={(e)=>setFlowDescription(e.target.value)}></input>
                </div>
            </div>
        </Dialog>
    )
}

const WorkSpace = ({useCreateFlow,useDeleteFlow,loadFlow,flowMetadata})=>{
    const [showDelDialogue,setShowDelDialogue] = useState(false)
    const [showAddDialogue,setShowAddDialogue] = useState(false)
    const [flowForDel,setFlowForDel] = useState("")

    const handleShowDelDialog = useCallback((flowId)=>{
        setFlowForDel(flowId)
        setShowDelDialogue(true)
    })

    return(
        <div className="flex flex-col items-center gap-5 h-100">
            <h1 className="text-4xl">Research Flows</h1>
            <FlowDeleteDialogue showDialogue={showDelDialogue} setShowDialogue={setShowDelDialogue} flowForDel={flowForDel} onDelete={()=>{useDeleteFlow(flowForDel);console.log("deleting"); setShowDelDialogue(false)}}/>
            <div className="w-full mx-auto p-4 bg-gray-100 rounded-lg shadow-md h-full overflow-y-auto">
                <div className="grid grid-cols-3 gap-6 overflow-y-auto p-2">
                    <Card onClick={()=>setShowAddDialogue(true)} className="w-full items-center !bg-blue-200/20 cursor-pointer hover:!bg-blue-200" key="newNode" title="">
                        <div className="text-8xl">+</div>
                    </Card>
                    {flowMetadata !== undefined && Object.entries(flowMetadata).map(([flowID, flow]) => (
                    <ProjectCard setShowDialogue={()=>handleShowDelDialog(flowID)} onClick={()=>loadFlow(flowID)} key={flowID} name={flow?.name || ""} description={flow?.description || ""} flowID={flowID}>
                        {flowID}
                    </ProjectCard>
                    ))}
                </div>
            </div>
            <FlowCreateDialog useCreateFlow={useCreateFlow} showAddDialogue={showAddDialogue} setShowAddDialogue={setShowAddDialogue} />
        </div>
    )
}

const selector = (state) => ({
    flows: state.flows,
    currentFlowId: state.currentFlowId,
    createFlow: state.createFlow,
    setCurrentFlow: state.setCurrentFlow,
    renameCurrentFlow: state.renameCurrentFlow,
    deleteFlow: state.deleteFlow,
    currentFlow: state.currentFlow,
    onNodesChange: state.onNodesChange,
    onEdgesChange: state.onEdgesChange,
    onConnect: state.onConnect,
    addNode: state.addNode,
    setViewport: state.setViewport,
    clearStore: state.clearStore,
    updateNodeData: state.updateNodeData
  });

export const FlowWorkspace = React.memo(() => {
    const [flowVisible, setFlowVisible] = useState(false);

    const { flows, flowMetadata, updateFlowMetadata, currentFlowId, createFlow, deleteFlow, setCurrentFlow, renameCurrentFlow, currentFlow } = useFlowStore(useShallow(selector));
    const nodes = useMemo(() => flows[currentFlowId]?.nodes ?? [], [flows, currentFlowId]);
    const edges = useMemo(() => flows[currentFlowId]?.edges ?? [], [flows, currentFlowId]);    

    const currentFlowMetadata = useMemo(()=>flowMetadata[currentFlowId],[flowMetadata,currentFlowId])
    
    const loadFlow = (flowID)=>{
        setCurrentFlow(flowID);
        setFlowVisible(true);
    }

    const useCreateFlow = (metadata) => {
        let flowID = nanoid()
        createFlow(flowID, metadata, initialNodes, []);
        setCurrentFlow(flowID);
        setFlowVisible(true);
    };

    const useDeleteFlow = (flowID) => {
        deleteFlow(flowID)
    }


    return (
        <div className="flex flex-col px-7 py-2 mb-20 gap-2 overflow-y-hidden">
            {!flowVisible && 
            <WorkSpace useCreateFlow={useCreateFlow} useDeleteFlow={useDeleteFlow} loadFlow={loadFlow} flowMetadata={flowMetadata}/>
            }
            <FlowManagerContext.Provider value={{ isParent: true }}>
                <div className="w-[90vw]">
                {flowVisible && nodes.length > 0 && (
                <div>
                    <BreadCrumbs flowName={currentFlowMetadata.name} flowVisible={flowVisible} setFlowVisible={setFlowVisible} />
                    <Canvas nodes={nodes} edges={edges} />
                </div>
                )}
                </div>
            </FlowManagerContext.Provider>
        </div>
    );
});

// Custom hook to access the context
export const useFlowManagerContext = () => {
    return useContext(FlowManagerContext);
};
