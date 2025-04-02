import React from 'react';

import RootNode from "./root"

const BasicNode = ({ children, filterType}) => {

  return(
    <RootNode incoming={true} outgoing={true}>
        <div className="flex row">
          <div className="node-group bg-orange-100">
              {filterType.groupLabel}
          </div>
            {children}
      </div>
    </RootNode>);
};

export default React.memo(BasicNode);