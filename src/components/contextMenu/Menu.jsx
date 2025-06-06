import React, { useCallback } from 'react';
import { useReactFlow } from '@xyflow/react';
import style from './MenuStyle.module.css'

export default function Menu({
    id, top, left, ...props
}) {
  const { getNode, setNodes, addNodes, setEdges } = useReactFlow();

  const duplicateNode = useCallback(() => {
      const node = getNode(id);

      const position = {
        x: node.position.x + 50,
        y: node.position.y + 150,
      };

      addNodes({
        ...node,
        selected: false,
        dragging: false,
        id: `${node.id}-copy`,
        position,
      });
  }, [id, getNode, addNodes]);

  const deleteNode = useCallback(() => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id));
  }, [id, setNodes, setEdges]);

  return (
    <div
      style={{ top, left}}
      className={style.context_menu}
      {...props}
    >
      <p style={{ margin: '0.5em' }}>
        <small>node: {id}</small>
      </p>
      <button onClick={duplicateNode} >duplicate</button>
      <button onClick={deleteNode}>delete</button>
    </div>
  );
}
