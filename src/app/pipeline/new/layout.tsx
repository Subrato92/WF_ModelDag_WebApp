import DagSidebarMenu from "@/components/navbars/DagSidebarMenu";
import { ReactFlowProvider } from "@xyflow/react";
import { DragNDropProvider } from "@/components/contexts/DragNDrop";
export default function NewPipelineLayout({children} : {children: React.ReactNode}) {
    return (
        <ReactFlowProvider>
            <DragNDropProvider>
                <div style={{display: 'flex', flexDirection: 'row', width: '100vw', marginBottom: '0px'}}>
                    <DagSidebarMenu/>
                    <div style={{flexGrow: 1}}>
                        {children}
                    </div>
                </div>
            </DragNDropProvider>
        </ReactFlowProvider>
    )
}