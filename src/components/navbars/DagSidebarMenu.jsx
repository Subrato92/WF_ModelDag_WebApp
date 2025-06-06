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
import DataObjectIcon from '@mui/icons-material/DataObject';
import BookmarkSharpIcon from '@mui/icons-material/BookmarkSharp';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import AppsIcon from '@mui/icons-material/Apps';
import { useRouter } from 'next/navigation';

export default function DagSidebarMenu() {
    const router = useRouter();
    const [_1, setNodeId, _2, _3, isOpen, setIsOpen, toggleOpen] = useDragNDrop();
    

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

    const onCreate = useCallback(() => {

    }, [])

    const onCancel = useCallback(() => {
        router.push('/pipeline')
    }, [])
    
    return (
        <div id="toolbarContainer" className={styles.toolbarContainer}>
            <div id="toolbarHeader" className={styles.toolbarHeader}>
                <AppsIcon sx={{fontSize: '24px'}}/>
                {isOpen && <div style={{ fontSize: '13px', fontWeight: '550'}}>COMPONENTS</div> }
                {isOpen &&
                    <ChevronLeftIcon className={styles.toolbarButtonClose} fontSize="medium" onClick= {() => toggleOpen()}/>
                }
                {!isOpen &&
                    <ChevronRightIcon className={styles.toolbarButtonOpen} fontSize="medium" onClick= {() => toggleOpen()}/>
                }
            </div>
            <div className={styles.toolbar}>
                <div className={isOpen ? styles.item : styles.roundedItem} >
                    <div className={styles.nodes} id="transponderNode" onDragStart={(e) => onDragStart(e)} draggable>
                        <DeveloperBoardIcon sx={{fontSize: '24px', transform: 'rotate(180deg)'}}/> {isOpen && 'Transponder'}
                    </div>
                    {!isOpen && <span className={styles.tooltip}>Transponder</span>}
                </div>
                <div className={isOpen ? styles.item : styles.roundedItem}>
                    <div className={styles.nodes} id="dataNode" onDragStart={(e) => onDragStart(e)} draggable>
                        <DescriptionIcon sx={{fontSize: '24px'}}/> {isOpen && 'Data Node'} 
                    </div>
                    {!isOpen && <span className={styles.tooltip}>Data Node</span>}
                </div>
                <div className={isOpen ? styles.item : styles.roundedItem}>
                    <div className={styles.nodes} id="testsuiteNode" onDragStart={(e) => onDragStart(e)} draggable>
                        <AssessmentIcon sx={{fontSize: '24px'}}/> {isOpen && 'Test Suite'}
                    </div>
                    {!isOpen && <span className={styles.tooltip}>Test Suite</span>}
                </div>
                <div className={isOpen ? styles.item : styles.roundedItem}>
                    <div className={styles.nodes} id="testcodeNode" onDragStart={(e) => onDragStart(e)} draggable>
                        <AnalyticsOutlinedIcon sx={{fontSize: '24px'}}/> {isOpen && 'Test Code'} 
                    </div>
                    {!isOpen && <span className={styles.tooltip}>Test Code</span>}
                </div>
                <div className={isOpen ? styles.item : styles.roundedItem}>
                    <div className={styles.nodes} id="codeblockNode" onDragStart={(e) => onDragStart(e)} draggable>
                        <DataObjectIcon sx={{fontSize: '24px'}}/> {isOpen && 'Code Block'} 
                    </div>
                    {!isOpen && <span className={styles.tooltip}>Code Block</span>}
                </div>
                <div style={{ width: '100%', height: "75px", borderBottom: '1px solid grey', marginBottom: '10px' }}></div>
                <div className={isOpen ? styles.item : styles.roundedItem} onClick={onCreate}>
                    <div className={styles.nodes} id="create">
                        <BookmarkSharpIcon sx={{fontSize: '24px'}}/> {isOpen && 'Create'} 
                    </div>
                    {!isOpen && <span className={styles.tooltip}>Create</span>}
                </div>
                <div className={isOpen ? styles.item : styles.roundedItem} onClick={onCancel}>
                    <div className={styles.nodes} id="cancel" >
                        <CloseSharpIcon sx={{fontSize: '24px'}}/> {isOpen && 'Cancel'} 
                    </div>
                    {!isOpen && <span className={styles.tooltip}>Cancel</span>}
                </div>
            </div>
        </div>
    )
}