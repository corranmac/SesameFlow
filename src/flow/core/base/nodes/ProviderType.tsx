import React, {useMemo} from 'react';

import RootNode from "./root"

interface BasicNodeProps{
    type: any;
    children: any;
    group: string;
}

const BasicNode = ({ type,children, group }:BasicNodeProps) => {
  
  return (
    <RootNode incoming={false} outgoing={true}>
      <div className="flex absoluterow">
        <div className= "node-group bold bg-blue-200">
          {group}
        </div>
        <div className="node-content !w-[400px]">
          <h1 className="node-title">{type}</h1>
          <div className="flex">{children}</div>
        </div>
      </div>
    </RootNode>
  );
};

export default BasicNode;
