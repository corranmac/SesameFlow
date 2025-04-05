import { Handle } from '@xyflow/react';
import { useState, useMemo, useCallback } from "react";
import { HoverCard } from '@ark-ui/react/hover-card';
import { Portal } from '@ark-ui/react/portal';
import { Tabs } from '@ark-ui/react/tabs';
import { MdHistory, MdStar } from "react-icons/md";
import classNames from "clsx";

const CreationMenu = ({ nodeTypes,recentNodeTypes, handlePosition, createNode }) => {
  const [activeTab, setActiveTab] = useState("favorites");
  const favouriteNodeTypes = ["OA-sink", "Search Fields", "Open Access", "Publication", "Authorship", "Concepts"];
  let nodetypes = nodeTypes.slice(10) ?? []
  return (
    <Tabs.Root value={activeTab} onValueChange={(e) => setActiveTab(e.value)} className="mh-60 w-30 translate-x-1/2" >
      <Tabs.List className="flex stretch">
        <Tabs.Trigger value="favorites" className={`tabTrigger ${activeTab === "favorites" ? "bg-gray-50" : "!bg-gray-200"}`}>
          <MdStar className="w-3 h-3" />
        </Tabs.Trigger>
        <Tabs.Trigger value="recent" className={`tabTrigger ${activeTab === "recent" ? "bg-gray-50" : "!bg-gray-200"}`}>
          <MdHistory className="w-3 h-3" />
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="recent" className="tabContent !height-[20px]">
        {nodetypes.map((nodeType, index) => (
          <div onClick={() => createNode(handlePosition, nodeType)} key={index} className="hover:bg-white p-1 cursor-pointer">
            {nodeType}
          </div>
        ))}
      </Tabs.Content>
      <Tabs.Content value="favorites" className="tabContent !height-[20px]">
        {favouriteNodeTypes.map((nodeType, index) => (
          <div onClick={() => createNode(handlePosition, nodeType)} key={index} className="hover:bg-white p-1 cursor-pointer">
            {nodeType}
          </div>
        ))}
      </Tabs.Content>
    </Tabs.Root>
  );
};

export const HoverComponent = ({ children, handlePosition, createNode, recentNodeTypes,nodeTypes }) => (
  <HoverCard.Root>
    <HoverCard.Trigger>{children}</HoverCard.Trigger>
    <Portal>
      <HoverCard.Positioner>
        <HoverCard.Content>
          <HoverCard.Arrow>
            <HoverCard.ArrowTip />
          </HoverCard.Arrow>
            <CreationMenu handlePosition={handlePosition} createNode={createNode} recentNodeTypes={recentNodeTypes} nodeTypes={nodeTypes} />
        </HoverCard.Content>
      </HoverCard.Positioner>
    </Portal>
  </HoverCard.Root>
);

export const HandleComponent = ({ handleId, position, type, id, connectState, createNode, recentNodeTypes,nodeTypes }) => {
  const [hover, setHover] = useState(false);
  const className = classNames("flex", {
    "pr-10": handleId === "incomingL",
    "pb-10": handleId === "incomingT",
    "pl-10": handleId === "outgoingR",
    "pt-10": handleId === "outgoingB",
  });

  const style = useMemo(() => 
    connectState === "connectable" 
      ? {
          borderColor: hover ? "blue" : "black",
          opacity: hover ? 0.6 : 0.5,
          backgroundColor: "white",
          borderRadius: "0.5rem",
          width: "3rem",
          height: "3rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
          color: "grey",
          transition: "all 0.2s ease-in-out",
        } 
      : {}, 
    [connectState, hover]
  );

  return (
    <Handle
      style={style}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      type={type}
      position={position}
      id={handleId}
    >
      {connectState === "connectable" && (
        <HoverComponent handlePosition={position} createNode={createNode} recentNodeTypes={recentNodeTypes} nodeTypes={nodeTypes}>
          <div className="w-[2rem] text-black text-bold h-[2rem] border-1 border-gray-200 hover:border-blue-600 text-2xl rounded-md justify-center hover:bg-blue-200">
            ＋
          </div>
        </HoverComponent>
      )}
    </Handle>
  );
};