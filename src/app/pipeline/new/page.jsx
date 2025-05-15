"use client"

import { ReactFlow, Background, Controls, MarkerType, ReactFlowProvider } from "@xyflow/react"; 
import { useState, useCallback, useRef } from 'react'; 
import { useEdgesState, useNodesState, addEdge, useReactFlow } from "@xyflow/react"; 
import styles from './PageStyle.module.css';

import '@xyflow/react/dist/style.css';
import TransponderNode from '@/components/blocks/TransponderNode';
import TestsuiteNode from "@/components/blocks/TestsuiteNode";
import DataNode from "@/components/blocks/DataNode";
import TestcodeNode from "@/components/blocks/TestcodeNode";
import CodeBlockNode from "@/components/blocks/CodeBlockNode";
import Menu from "@/components/contextMenu/Menu";
import { useRouter } from 'next/navigation';

import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';

import { DragNDropProvider, useDragNDrop } from "@/components/contexts/DragNDrop";
import BottomNavBar from "@/components/core/BottomBar";

import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import Dialog from "../../../components/configuration/dialog";

const initialEdges = [];
const initialNodes = [];

const nodeTypes = {
    transponderNode: TransponderNode,
    testsuiteNode: TestsuiteNode,
    dataNode: DataNode,
    testcodeNode: TestcodeNode,
    codeblockNode: CodeBlockNode
}

function Flow() {
    const router = useRouter();

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [nodeCount, setNodeCount] = useState(0);
    const [nodeConfigDialogOpen, setNodeConfigDialogOpen] = useState(false);
    const [selectedNode, setSelectedNode] = useState(null);
    const [sourceNodes, setSourceNodes] = useState([]);

    const [menuContext, setMenuContext] = useState(null);
    const { screenToFlowPosition } = useReactFlow();
    const [nodeType, _1, _2, _3, isOpen, setIsOpen, toggleOpen] = useDragNDrop();

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

    const onNodeClick = useCallback((event, node) => {
        console.log('node clicked: event: ', event);
        console.log('node clicked: node: ', node);

        console.log('node clicked: edges: ', edges);
        console.log('node clicked: nodes: ', nodes);

        var edgesToNode = edges.filter((edge) => edge.target==node.id);
        var sourceNodeIds = []
        edgesToNode.forEach(edge => {
            sourceNodeIds.push(edge.source)
        });
        console.log('node clicked: edgesToNode: ', edgesToNode);
        console.log('node clicked: sourceNodeIds: ', sourceNodeIds);
        var contextSourceNodes = nodes.filter((node) => sourceNodeIds.includes(node.id));
        console.log('node clicked: sourceNodes: ', contextSourceNodes);
        setSourceNodes(contextSourceNodes);

        setSelectedNode(node);

        setNodeConfigDialogOpen(true);
        if(isOpen){
            setIsOpen(false);
            toggleOpen();
        }
    }, [edges, nodes, isOpen, setSourceNodes]);

    const onDialogClose = useCallback(() => {
        setNodeConfigDialogOpen(false);
        setSelectedNode(null);
    }, [setNodeConfigDialogOpen, setSelectedNode])

    const onConfigUpdate = useCallback((metadata,  config) => {
        setNodeConfigDialogOpen(false);

        var targetNodeData = {...selectedNode.data}
        targetNodeData.metadata = metadata;
        targetNodeData.config = config;

        setNodes((nds) =>
            nds.map((node) => {
                if (node.id !== selectedNode.id) {
                    return node;
                }
                console.log("Updating node:", node, ' with targetNodeData:', targetNodeData);
                return {
                    ...selectedNode,
                    data: targetNodeData,
                };
            }),
        );

        setSelectedNode(null);
    }, [selectedNode, setNodeConfigDialogOpen, setSelectedNode, setNodes])

    return(
        <div className={styles.grid_container}>
            <div className={styles.header}>
                <AccountTreeRoundedIcon sx={{fontSize: '24px', color: '#d71e28'}}/>
                <span style={{marginLeft: '10px', fontSize: '16px'}}>
                    PIPELINE COMPOSER
                </span>
            </div>
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
                    onNodeClick={onNodeClick}
                    style={{ height: '100vh', width:'100vw' }}>
                    <Background />
                    {menuContext && <Menu onClick={onPaneClick} {...menuContext} />}
                    <Controls/>
                </ReactFlow>
            </div>
            <BottomNavBar/>
            <Dialog isOpen={nodeConfigDialogOpen} selectedNode={selectedNode} sourceNodes={sourceNodes} onClose={onDialogClose} onUpdate={onConfigUpdate}/>
        </div>
    );
}

export default function FlowComponent (){
    return (
        <Flow/>
    )
}