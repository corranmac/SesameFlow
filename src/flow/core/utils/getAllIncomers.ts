import { getIncomers, Edge, Node } from '@xyflow/react';

// Types for context and flow manager
interface GetAllIncomersProps {
    id: string;
    nodes: Node[];
    edges: Edge[];
    visited?: Set<string>;
}

// Recursive function to get all incomers for a node
const getAllIncomers = ({
    id,
    nodes,
    edges,
    visited = new Set(),
}: GetAllIncomersProps): Node[] => {

    const node = nodes.find((node) => node.id === id);
    if (!node || visited.has(id)) return [];

    visited.add(id);
    const incomers = getIncomers(node, nodes, edges);

    // Recursively gather incomers without redundant nodes
    let allIncomers: Node[] = [];
    for (const incomer of incomers) {
        allIncomers = allIncomers.concat(incomer, getAllIncomers({ id: incomer.id, nodes, edges, visited }));
    }

    return allIncomers;
};

export default getAllIncomers;
