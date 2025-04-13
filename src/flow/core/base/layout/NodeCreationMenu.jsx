import { Tabs } from "@ark-ui/react";
import React, { useState, useContext } from "react";
import { MdStar, MdHistory } from "react-icons/md";
import { AppContext } from '@flowcore/utils/nodecontext';
import {Tag} from '@sesameflow'

const NodeCreationMenu = ({
  handlePosition,
  createNode,
}) => {
  const [activeTab, setActiveTab] = useState("recent");
  const {nodeTypes,recentNodeTypes} = useContext(AppContext);

  return (
    <Tabs.Root
      value={activeTab}
      onValueChange={(e) => setActiveTab(e.value)}
      className="w-50 translate-x-1/2 !max-h-[300px !overflow-hidden"
    >
      <Tabs.List className="flex">
      <Tabs.Trigger
          value="recent"
          className={`tabTrigger ${
            activeTab === "recent" ? "bg-gray-50" : "!bg-gray-200"
          }`}
        >
          <MdHistory className="w-3 h-3" />
        </Tabs.Trigger>
        <Tabs.Trigger
          value="favorites"
          className={`tabTrigger ${
            activeTab === "favorites" ? "bg-gray-50" : "!bg-gray-200"
          }`}
        >
          <MdStar className="w-3 h-3" />
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="recent" className="tabContent">
      {recentNodeTypes.map((nodeType, index) => (
          <div
            onClick={() => createNode(handlePosition, nodeType)}
            key={index}
            className="hover:bg-white p-1 cursor-pointer flex flex-row "
          >
            <div className="bg-blue-200 p-1 rounded-l-sm shadow-md justify-center align-center">
            {nodeTypes[nodeType].display_source}
            </div>
            <div className="bg-white p-1 rounded-r-sm w-full content-center shadow-md justify-center">
            {nodeTypes[nodeType].display_label}
            </div>
          </div>
        ))}
      </Tabs.Content>
      <Tabs.Content value="favorites" className="tabContent">
      {Object.keys(nodeTypes).map((nodeType, index) => (
          <div
            onClick={() => createNode(handlePosition, nodeType)}
            key={index}
            className="hover:bg-white p-1 cursor-pointer flex flex-row"
          >
            <div className="bg-blue-200 p-1 rounded-l-sm shadow-md justify-center align-center">
            {nodeTypes[nodeType].display_source}
            </div>
            <div className="bg-white p-1 rounded-r-sm w-full content-center shadow-md justify-center">
            {nodeTypes[nodeType].display_label}
            </div>
          </div>
        ))}
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default NodeCreationMenu;
