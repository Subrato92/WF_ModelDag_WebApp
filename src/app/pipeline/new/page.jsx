"use client"

import { ReactFlow, Background, Controls, MarkerType, ReactFlowProvider } from "@xyflow/react"; 
import { useState, useCallback, useRef } from 'react'; 
import { useEdgesState, useNodesState, addEdge, useReactFlow } from "@xyflow/react"; 
import styles from './PageStyle.module.css';

import '@xyflow/react/dist/style.css';
import TransponderNode from '@/components/blocks/TransponderNode';
import TestsuiteNode from "@/components/blocks/TestsuiteNode";
import Menu from "@/components/contextMenu/Menu";

import { DragNDropProvider, useDragNDrop } from "@/components/contexts/DragNDrop";
import DagSidebarMenu from "@/components/navbars/DagSidebarMenu";

const initialEdges = [];
/*
    {
        id: '2',
        type: 'testsuiteNode', 
        data: { label: 'Test Code' }, 
        position: { x: 350, y: 350 },
        isConnectable: true
    },
    {
        id: '4', 
        type: 'transponderNode', 
        data: { label: "Model Node" },
        position: { x: 200, y: 200 },
        isConnectable: true
    },
    {
        id: '3',
        data: { label: 'Data Node' }, 
        position: { x: 100, y: 100 },
    },
    {
        id: '5',
        data: { label: 'Another Test Code' },
        position: { x: 450, y: 450 },
    }

*/
const initialNodes = [];

const nodeTypes = {
    transponderNode: TransponderNode,
    testsuiteNode: TestsuiteNode
}

function Flow() {

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [nodeCount, setNodeCount] = useState(0);

    const [menuContext, setMenuContext] = useState(null);
    const { screenToFlowPosition } = useReactFlow();

    const [nodeType] = useDragNDrop();

    const getId = useCallback(
        () => {
            setNodeCount(nodeCount + 1);
            return `node_${nodeCount}`;
        }, 
        [nodeCount]
    );

    const ref = useRef(null);

    const onConnect = useCallback(
        (params) => {
            console.log('edge params: ', params);
            params = {
                ...params,
                type: 'smoothstep',
                markerEnd: {
                    type: MarkerType.ArrowClosed,
                    width: 20,
                    height: 20,
                },
            }
            setEdges ((eds) => addEdge(params, eds))},
        []
    );

    const onNodeContextMenu = useCallback(
        (event, node) => {
            // Prevent native context menu from showing
            event.preventDefault();
        
            // Calculate position of the context menu. We want to make sure it
            // doesn't get positioned off-screen.
            const pane = ref.current.getBoundingClientRect();
            console.log('pane: ', pane)
            console.log('event: ', event)
            setMenuContext({
                id: node.id,
                top: event.clientY - 75,
                left: event.clientX - 250,
            });
        },
        [setMenuContext],
    );

    const onPaneClick = useCallback(() => setMenuContext(null), [setMenuContext]);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);
    
    const onDrop = useCallback(
        (event) => {
            event.preventDefault();
        
            // check if the dropped element is valid
            if (!nodeType) {
                return;
            }
        
            // project was renamed to screenToFlowPosition
            // and you don't need to subtract the reactFlowBounds.left/top anymore
            // details: https://reactflow.dev/whats-new/2023-11-10
            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const newNode = {
                id: getId(),
                type: nodeType,
                position,
                data: { label: `${nodeType} node` },
                isConnectable: true
            };

            console.log('newNode: ', newNode);
        
            setNodes((nds) => nds.concat(newNode));
        },
        [nodeType, nodeCount],
    );

    return(
        <div className={styles.grid_container}>
            <div className={styles.header}>
                MODEL PIPELINE COMPOSER
            </div>
            <DagSidebarMenu/>
            <div className={styles.canvas}>
                <ReactFlow
                    ref={ref}
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect} 
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    nodeTypes ={nodeTypes}
                    onNodeContextMenu={onNodeContextMenu}
                    style={{ height: '100vh', width:'100vw' }}>
                    <Background />
                    {menuContext && <Menu onClick={onPaneClick} {...menuContext} />}
                    <Controls/>
                </ReactFlow>
            </div>
        </div>
    );
}

export default function FlowComponent (){
    return (
        <ReactFlowProvider>
            <DragNDropProvider>
                <Flow/>
            </DragNDropProvider>
        </ReactFlowProvider>
    )
}