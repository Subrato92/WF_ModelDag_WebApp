"use client"
import { createContext, useContext, useState, useCallback } from "react";
import styles from "@/components/navbars/DagSidebarMenu.module.css";

const DragNDropContext = createContext([null, (_)=>{}]);

export const useDragNDrop = () => {
    return useContext(DragNDropContext);
}

export const DragNDropProvider = ({children}) => {
    const [nodeType, setNodeType] = useState(null);
    const [theme, setTheme] = useState("LIGHT");
    const [isOpen, setIsOpen] = useState(true);

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
        <DragNDropContext.Provider value={[nodeType, setNodeType, theme, setTheme, isOpen, setIsOpen, toggleOpen]}>
            {children}
        </DragNDropContext.Provider>
    )
}