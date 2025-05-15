import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react'; 
import Style from './Node.module.css';
import DescriptionIcon from '@mui/icons-material/Description';
import { useDragNDrop } from '@/components/contexts/DragNDrop';

export default memo(({ data, isConnectable }) => { 
    
    const state = useDragNDrop();
    let theme = state[2];
    //console.log(theme);

    let styleClass = Style.container_light;
    let iconStyleClass = Style.data_icon_light;

    if (theme != "LIGHT") {
        styleClass = Style.container_dark;
        iconStyleClass = Style.data_icon_dark;
    }

    return ( 
        <div>
            <div style={{ height: '25px'}}>

            </div>
            <div className={styleClass} style={{width: '80px', height: '80px', borderRadius: '50%'}}>
                <Handle
                    type="source"
                    position={Position.Right}
                    onConnect={(params) => console.log('handle onconnect', params)} 
                    isConnectable={isConnectable}
                />
            
                <DescriptionIcon className={iconStyleClass} sx={{fontSize: '40px'}}/> 
            </div>

            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px', fontWeight: 'bold', marginBottom: '0px', marginTop: '3px'}}>
                Data
            </div>
            
        </div>
    );
});