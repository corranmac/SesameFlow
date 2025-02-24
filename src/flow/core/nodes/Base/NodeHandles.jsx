import { Handle} from '@xyflow/react';
import {useState, useMemo, useContext, useCallback} from "react"
import { nanoid } from 'nanoid';
import { HoverCard } from '@ark-ui/react/hover-card'
import { Portal } from '@ark-ui/react/portal'

import { Tabs } from '@ark-ui/react/tabs'
import { MdHistory,MdStar } from "react-icons/md";

const NodeCreationHover = ({recentNodeTypes,handlePosition,createNode}) => {
    const [activeTab, setActiveTab] = useState("recent")

    const useCreateNode = useCallback((type)=>{
        createNode(handlePosition,type)
       }
    )
    
    return(
        <Tabs.Root value={activeTab} onValueChange={(e) => setActiveTab(e.value)} className="mh-60">
        <Tabs.List className="flex">
          <Tabs.Trigger
            value="recent"
            className={`flex !border-t-1 !border-l-1 !border-r-1 rounded-t-sm !border-gray-400 items-center gap-2 px-4 pt-2 text-gray-600 hover:text-gray-900 border-transparent
            ${activeTab === "recent" ? "bg-gray-50" : "!bg-gray-200"}`}
          >
            <MdHistory className="w-3 h-3" />
          </Tabs.Trigger>
          <Tabs.Trigger
            value="favorites"
            className={`flex !border-t-1 !border-l-1 !border-r-1 rounded-t-sm !border-gray-400 items-center gap-2 px-4 pt-2 text-gray-600 hover:text-gray-900 border-transparent
            ${activeTab === "favorites" ? "bg-gray-50" : "!bg-gray-200"}`}
            >
            <MdStar className="w-3 h-3" />
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content
          value="recent"
          className="p-1 h-full !border-gray-400 bg-gray-50 !border-b-1 !border-l-1 !border-r-1 rounded-b-sm"
        >
          {recentNodeTypes.map((nodeType,index)=>(
            <div onClick={()=>useCreateNode(nodeType)} key={index} className="hover:bg-white p-1 cursor-pointer">
                {nodeType}
            </div>
          ))}
        </Tabs.Content>
        <Tabs.Content
          value="favorites"
          className="p-1 h-full !border-gray-400 bg-gray-50 !border-b-1 !border-l-1 !border-r-1 rounded-b-sm"
        >
          Faves
        </Tabs.Content>
      </Tabs.Root>
    )
}

export const HoverComponent = ({children,handlePosition,createNode,recentNodeTypes}) => {
    return(
  <HoverCard.Root>
    <HoverCard.Trigger>{children}</HoverCard.Trigger>
    <Portal>
      <HoverCard.Positioner>
        <HoverCard.Content>
          <HoverCard.Arrow>
            <HoverCard.ArrowTip />
          </HoverCard.Arrow>
          <NodeCreationHover handlePosition={handlePosition} createNode={createNode} recentNodeTypes={recentNodeTypes}/>
        </HoverCard.Content>
      </HoverCard.Positioner>
    </Portal>
  </HoverCard.Root>)
}
  
export const HandleComponent = ({ handleId, position, type, id, connectState,createNode,recentNodeTypes }) => {
    const [hover, setHover] = useState(false);
  
    // Memoize the style object to prevent it from being recreated on each render
    const style = useMemo(() => {
      if (!connectState) {
        return {
          borderColor: hover ? "blue" : "black",
          opacity: hover ? 0.6 : 0.5,
          backgroundColor: "white",
          borderRadius: "0.5rem", // 'md' typically corresponds to '0.375rem'
          width: "3rem",
          height: "3rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem", // '2xl' typically corresponds to '1.5rem' in font size
          color: "grey",
          transition: "all 0.2s ease-in-out", // For hover transition effect
        };
      }
      return {};
    }, [connectState, hover]); // Recompute the style only when connectState or hover changes
  
    return (
      <Handle
        style={style}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        type={type}
        position={position}
        id={handleId}
      >
        {!connectState &&         
        <HoverComponent handlePosition={position} createNode={createNode} recentNodeTypes={recentNodeTypes}>
            <div className="w-[2rem] text-black text-bold h-[2rem] border-1 border-gray-200 hover:border-blue-600 text-2xl rounded-md justify-center">
            ＋
            </div>
        </HoverComponent>}
      </Handle>
    );
  };