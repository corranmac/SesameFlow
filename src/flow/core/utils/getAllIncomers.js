import useFlowStore from '@flowstate/store';
import { getIncomers } from '@xyflow/react';

const getAllIncomers = (id, nodes, edges, visited = new Set()) => {
    const node = nodes.find((node) => node.id === id);
    if (!node || visited.has(id)) return [];

    visited.add(id);
    const incomers = getIncomers(node, nodes, edges);
    
    return incomers.reduce(
        (all, incomer) => [...all, incomer, ...getAllIncomers(incomer.id, nodes, edges, visited)],
        []
    );
};


export default getAllIncomers;