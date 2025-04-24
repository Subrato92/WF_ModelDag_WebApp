import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react'; 
import Style from './ModelNode.module.css';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';

export default memo(({ data, isConnectable }) => { 
    
    return ( 
        <div>
            <div style={{ height: '35px'}}>

            </div>
            <div style={{width: '100px', height: '100px', borderRadius: '15%', border: '1px solid #606060', padding: '10px', backgroundColor: '#f0f0f0', display: 'flex', 
                flexDirection: 'row', 
                alignItems: 'center', 
                justifyContent: 'center'}}>
                <Handle
                    type="source"
                    position={Position.Right}
                    onConnect={(params) => console.log('handle onconnect', params)} 
                    isConnectable={isConnectable}
                />
                <DeveloperBoardIcon sx={{fontSize: '60px', color: '#d71e28', transform: 'rotate(180deg)'}}/> 
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