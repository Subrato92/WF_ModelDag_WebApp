import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react'; 
import Style from './Node.module.css';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import { useDragNDrop } from '@/components/contexts/DragNDrop';

export default memo(({ data, isConnectable }) => { 

    const state = useDragNDrop();
    let theme = state[2];
    //console.log(theme);

    let styleClass = Style.container_light;
    let iconStyleClass = Style.transponder_icon_light;

    if (theme != "LIGHT") {
        styleClass = Style.container_dark;
        iconStyleClass = Style.transponder_icon_dark;
    }
    
    return ( 
        <div>
            <div style={{ height: '35px'}}>

            </div>
            <div className={styleClass} style={{width: '100px', height: '100px', borderRadius: '15%'}}>
                <Handle
                    type="source"
                    position={Position.Right}
                    onConnect={(params) => console.log('handle onconnect', params)} 
                    isConnectable={isConnectable}
                />
                <DeveloperBoardIcon className={iconStyleClass} sx={{fontSize: '60px', transform: 'rotate(180deg)'}}/> 
                <Handle
                    type="target"
                    position={Position.Left} 
                    id="a" 
                    isConnectable={isConnectable}
                />
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px', fontWeight: 'bold', marginTop: '3px'}}>
                Transponder
            </div>
            <div style={{fontSize: '10px', marginBottom: '5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100px'}}>
                smmp://some-end-point.com/some-path
            </div>
            {/* 
            <input type='text' id='url' placeholder='Enter SMMP URL' style={{border: '1px grey solid', borderRadius: '5%', padding: '5px', fontSize: '12px', width: '100%'}}></input>
            */}
            
        </div>
    );
});