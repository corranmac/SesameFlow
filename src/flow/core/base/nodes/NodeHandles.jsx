import { Handle } from '@xyflow/react';
import { useState, useMemo, useCallback } from "react";
import { HoverCard } from '@ark-ui/react/hover-card';
import { Portal } from '@ark-ui/react/portal';
import { Tabs } from '@ark-ui/react/tabs';
import { MdHistory, MdStar } from "react-icons/md";
import classNames from "clsx";
import NodeCreationMenu from '@flowcore/base/layout/NodeCreationMenu';

export const HoverComponent = ({ children, handlePosition, createNode, recentNodeTypes,nodeTypes }) => (
  
  <HoverCard.Root>
    <HoverCard.Trigger>{children}</HoverCard.Trigger>
    <Portal>
      <HoverCard.Positioner>
        <HoverCard.Content>
          <HoverCard.Arrow>
            <HoverCard.ArrowTip />
          </HoverCard.Arrow>
            <NodeCreationMenu handlePosition={handlePosition} createNode={createNode} recentNodeTypes={recentNodeTypes} nodeTypes={nodeTypes} />
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