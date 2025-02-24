import React, {useMemo} from 'react';

import RootNode from "./root"

const BasicNode = ({ type,children, group }) => {
  
  return (
    <RootNode incoming={false} outgoing={true}>
      <div className="flex row">
        <div className= "node-group bg-blue-200">
          {group}
        </div>
        <div className="node-content">
          <h1 className="node-title">{type}</h1>
          <div className="flex">{children}</div>
        </div>
      </div>
    </RootNode>
  );
};

export default BasicNode;
