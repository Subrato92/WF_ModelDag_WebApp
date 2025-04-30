"use client"
import { createContext, useContext, useState } from "react";

const DragNDropContext = createContext([null, (_)=>{}]);

export const useDragNDrop = () => {
    return useContext(DragNDropContext);
}

export const DragNDropProvider = ({children}) => {
    const [nodeType, setNodeType] = useState(null);
    const [theme, setTheme] = useState("LIGHT");
    
    return (
        <DragNDropContext.Provider value={[nodeType, setNodeType, theme, setTheme]}>
            {children}
        </DragNDropContext.Provider>
    )
}