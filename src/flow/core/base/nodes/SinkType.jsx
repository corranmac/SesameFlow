import React from 'react';

import RootNode from "./root"


const BasicNode = ({ type,children, group}) => {

  return(
    <RootNode incoming={true} outgoing={true}>
      <div className="flex">
        <div className= "node-group bold bg-fuchsia-200">
          {type}
        </div>
        <div className="flex flex-col w-[240px] h-[120px]">
          {children}
        </div>
      </div>
    </RootNode>);
};

export default React.memo(BasicNode);