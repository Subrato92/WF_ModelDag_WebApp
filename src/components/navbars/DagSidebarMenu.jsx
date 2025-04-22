"use client"

import { useCallback, useState } from "react";
import { useDragNDrop } from "@/components/contexts/DragNDrop";
import styles from "./DagSidebarMenu.module.css";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DescriptionIcon from '@mui/icons-material/Description';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';

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
                <div style={{ fontSize: '13px', fontWeight: '550'}}>BLOCKS</div>
                {isOpen &&
                    <ChevronLeftIcon className={styles.toolbarButtonClose} fontSize="small" onClick= {() => toggleOpen()}/>
                }
                {!isOpen &&
                    <ChevronRightIcon className={styles.toolbarButtonOpen} fontSize="small" onClick= {() => toggleOpen()}/>
                }
            </div>
            <div className={styles.toolbar}>
                <div className={!isOpen && styles.roundedBorder} >
                    <div className={styles.nodes} id="transponderNode" onDragStart={(e) => onDragStart(e)} draggable>
                        <DeveloperBoardIcon sx={{fontSize: '24px', transform: 'rotate(180deg)'}}/> {isOpen && 'Transponder'}
                    </div>
                    {!isOpen && <span className={styles.tooltip}>Transponder</span>}
                </div>
                <div className={!isOpen && styles.roundedBorder}>
                    <div className={styles.nodes} id="testsuiteNode" onDragStart={(e) => onDragStart(e)} draggable>
                        <AssessmentIcon sx={{fontSize: '24px'}}/> {isOpen && 'Test Suite'}
                    </div>
                    {!isOpen && <span className={styles.tooltip}>Test Suite</span>}
                </div>
                <div className={!isOpen && styles.roundedBorder}>
                    <div className={styles.nodes} id="dataNode" onDragStart={(e) => onDragStart(e)} draggable>
                        <DescriptionIcon sx={{fontSize: '24px'}}/> {isOpen && 'Data Node'} 
                    </div>
                    {!isOpen && <span className={styles.tooltip}>Test Code</span>}
                </div>
                <div className={!isOpen && styles.roundedBorder}>
                    <div className={styles.nodes} id="testcodeNode" onDragStart={(e) => onDragStart(e)} draggable>
                        <AnalyticsOutlinedIcon sx={{fontSize: '24px'}}/> {isOpen && 'Test Code'} 
                    </div>
                    {!isOpen && <span className={styles.tooltip}>Test Code</span>}
                </div>
            </div>
        </div>
    )
}