import React from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
} from '@xyflow/react';
import useFlowStore from '@flowstate/store';
import { MdOutlineQueryStats } from "react-icons/md";

export default function FilterQueryEdge({
  id,
  sourceX,
  sourceY,
  source,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) {
  const { setEdges } = useFlowStore((state)=>({edges:node.edges,setEdges:node.setEdges}));
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
 
  const onEdgeClick = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };
 
  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
      <div
          className="button-edge__label nodrag nopan"
          style={{
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          }}
        >
          <button className="button-edge__button" onClick={onEdgeClick}>
            <MdOutlineQueryStats/>
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}