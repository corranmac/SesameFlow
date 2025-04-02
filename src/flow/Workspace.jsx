import Canvas from "@flow/FlowCanvas";
import BreadCrumbs from "@flow/layout/BreadCrumbs";
import CrateView from "@flow/layout/CrateView";
import { DataView } from "@flowcore/OpenAlex/views/dataview";

import { useState } from "react";
import { Tabs } from "@ark-ui/react"
import { FaBox,FaNetworkWired } from "react-icons/fa";
import { MdExtension } from "react-icons/md";

const FlowTabs = ({nodes, edges}) => {
    const [activeTab, setActiveTab] = useState("canvas");

    return(
        <Tabs.Root className="flex flex-col w-full h-full p-2 pr-[62px]" value={activeTab}
        onValueChange={(e) => setActiveTab(e.value)}>
            <Tabs.List className="flex flex-row text-sm">
                <Tabs.Trigger className={`border-2 px-2 rounded-t-xs min-w-[10vw]
                ${activeTab === "canvas" ? "border-blue-200 bg-blue-50" : ""}`} value="canvas">Canvas</Tabs.Trigger>
                <Tabs.Trigger className={`border-2 px-2 rounded-t-xs min-w-[10vw]
                ${activeTab === "data" ? "border-blue-200 bg-blue-50" : ""}`} value="data">Data</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content
                className="w-full !h-[82vh] border-t-1" // Subtract the approximate height of the tab list
                value="canvas"
            >
                {activeTab === "canvas" && <Canvas nodes={nodes} edges={edges}/>}
            </Tabs.Content>
            <Tabs.Content
                className="w-full !h-[82vh] border-t-1"
                value="data"
            >
                <DataView/>
            </Tabs.Content>
        </Tabs.Root>
    );
};

const Workspace = ({nodes, edges, currentFlowMetadata}) => {
    const [activeTab, setTab] = useState("flow");
    
    return(
        <div className="flex flex-col h-screen">
            <BreadCrumbs flowName={currentFlowMetadata.name} flowVisible={true} setFlowVisible={{}} />
            <Tabs.Root 
                className="flex flex-row flex-grow w-full h-[calc(100vh-50px)]" // Subtract the approximate height of the breadcrumbs
                orientation="horizontal" 
                value={activeTab} 
                onValueChange={(e) => setTab(e.value)}
            >
                <Tabs.List className="flex flex-col bg-gray-100 p-2 pl-0">
                    <Tabs.Trigger 
                        className={`flex flex-col items-center gap-1 text-xs p-2 ${activeTab === "flow" ? "text-blue-600" : ""}`} 
                        value="flow"
                    >
                        <FaNetworkWired className="text-xl"/>Flow
                    </Tabs.Trigger>
                    <Tabs.Trigger 
                        className={`flex flex-col items-center gap-1 text-xs p-2 ${activeTab === "ro-crate" ? "text-blue-600" : ""}`} 
                        value="ro-crate"
                    >
                        <FaBox className="text-sm"/> Crate
                    </Tabs.Trigger>
                    <Tabs.Trigger 
                        className={`flex flex-col items-center gap-1 text-xs p-2 ${activeTab === "plugins" ? "text-blue-600" : ""}`} 
                        value="plugins"
                    >
                        <MdExtension className="text-lg"/> Plugins
                    </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content className="flex-grow w-full h-full" value="flow">
                    <FlowTabs nodes={nodes} edges={edges}/>
                </Tabs.Content>
                <Tabs.Content className="flex-grow w-full h-full p-4 pt-2" value="ro-crate">
                    <CrateView flowName={currentFlowMetadata.name}/>
                </Tabs.Content>
                <Tabs.Content className="flex-grow w-full p-4 pt-2" value="plugins">
                    <h3>Plugins</h3>
                </Tabs.Content>
            </Tabs.Root>
        </div>
    );
};
export default Workspace