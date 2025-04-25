import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react'; 
import Style from './Node.module.css';
import DataObjectIcon from '@mui/icons-material/DataObject';
import { useDragNDrop } from '@/components/contexts/DragNDrop';
//192.168.68.105

export default memo(({ data, isConnectable }) => { 

    const state = useDragNDrop();
    let theme = state[2];
    console.log(theme);

    let styleClass = Style.container_light;
    let iconStyleClass = Style.codeblock_icon_light;

    if (theme != "LIGHT") {
        styleClass = Style.container_dark;
        iconStyleClass = Style.codeblock_icon_dark;
    }
    
    return ( 
        <div>
            <div style={{ height: '35px'}}>

            </div>
            <div className={styleClass} style={{ width: '80px', height: '80px', borderRadius: '50% 10% 50% 10%'}}>
                <Handle
                    type="source"
                    position={Position.Right}
                    onConnect={(params) => console.log('handle onconnect', params)} 
                    isConnectable={isConnectable}
                />
                
                <DataObjectIcon className={iconStyleClass} sx={{fontSize: '40px'}}/> 

                <Handle
                    type="target"
                    position={Position.Left} 
                    id="a" 
                    isConnectable={isConnectable}
                />
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px', fontWeight: 'bold', marginTop: '3px'}}>
                Code Block
            </div>
            {/*
                <select className={Style.select} id="model_id" name="cars" style={{width: '100%', border: '1px solid black', padding: '5px', fontSize: '10px'}}>
                    <option value="12">Suite 12321</option>
                    <option value="13">Suite 17212</option>
                </select>
            */}
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '10px', marginBottom: '5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%'}}>
                CB 17721
            </div>
            
        </div>
    );
});