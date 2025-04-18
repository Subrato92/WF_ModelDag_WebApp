"use client"

import { useCallback, useState } from "react";
import { useDragNDrop } from "@/components/contexts/DragNDrop";
import styles from "./DagSidebarMenu.module.css";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function DagSidebarMenu() {
    const [_, setNodeId] = useDragNDrop();
    const [isOpen, setIsOpen] = useState(true);

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

    const toggleOpen = useCallback(() => {
        setIsOpen(!isOpen);
        if(isOpen) {
            document.getElementById('toolbarContainer').classList.add(styles.toolbarContainerShrink);
            document.getElementById('toolbarHeader').classList.add(styles.toolbarHeaderShrink);
        }else{
            document.getElementById('toolbarContainer').classList.remove(styles.toolbarContainerShrink);
            document.getElementById('toolbarHeader').classList.remove(styles.toolbarHeaderShrink);
        }
        
    }, [isOpen]);
    
    return (
        <div id="toolbarContainer" className={styles.toolbarContainer}>
            <div id="toolbarHeader" className={styles.toolbarHeader}>
                <div style={{ fontWeight: '550'}}>Blocks</div>
                {isOpen &&
                    <ChevronLeftIcon className={styles.toolbarButtonClose} fontSize="small" onClick= {() => toggleOpen()}/>
                }
                {!isOpen &&
                    <ChevronRightIcon className={styles.toolbarButtonOpen} fontSize="small" onClick= {() => toggleOpen()}/>
                }
            </div>
            <div className={styles.toolbar}>
                <div>
                    <div className={styles.nodes} id="transponderNode" onDragStart={(e) => onDragStart(e)} draggable>
                        {isOpen ? 'Transponder' : 'T'}
                    </div>
                    {!isOpen && <span className={styles.tooltip}>Transponder</span>}
                </div>
                <div>
                    <div className={styles.nodes} id="testsuiteNode" onDragStart={(e) => onDragStart(e)} draggable>
                        {isOpen ? 'Test Suite' : 'T S'}
                    </div>
                    {!isOpen && <span className={styles.tooltip}>Test Suite</span>}
                </div>
                <div>
                    <div className={styles.nodes} id="testcode" onDragStart={(e) => onDragStart(e)} draggable>
                        {isOpen ? 'Test Code' : 'T C'}
                    </div>
                    {!isOpen && <span className={styles.tooltip}>Test Code</span>}
                </div>
            </div>
        </div>
    )
}