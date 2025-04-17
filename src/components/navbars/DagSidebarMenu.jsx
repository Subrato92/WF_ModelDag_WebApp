"use client"

import { useCallback } from "react";
import { useDragNDrop } from "@/components/contexts/DragNDrop";
import styles from "./DagSidebarMenu.module.css";

export default function DagSidebarMenu() {
    const [_, setNodeId] = useDragNDrop();

    const onDragOver = useCallback((e) => {
        e.preventDefault();
        console.log('drag over', e);
    }, []);

    const onDrop = useCallback((e) => {
        e.preventDefault();
        console.log('on Drop', e);
    }, []);

    const onDragStart = useCallback((e) => {
        console.log('drag start', e);
        setNodeId(e.target.id);
        e.dataTransfer.effectAllowed = 'move';
    }, []);
    
    return (
        <div className={styles.toolbarContainer}>
            <div style={{width: '100%', textAlign: 'center' }}>
                <div style={{ fontWeight: '550', paddingBottom: '8px'}}>Building Blocks</div>
            </div>
            <div className={styles.toolbar}>
                <div id="transponderNode" onDragStart={(e) => onDragStart(e)} draggable>
                    Transponder Node
                </div>
                <div id="testsuiteNode" onDragStart={(e) => onDragStart(e)} draggable>
                    Test Suite
                </div>
                <div id="testcode" onDragStart={(e) => onDragStart(e)} draggable>
                    Test Code
                </div>
            </div>
        </div>
    )
}