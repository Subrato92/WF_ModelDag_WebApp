import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react'; 
import Style from './ModelNode.module.css';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';

export default memo(({ data, isConnectable }) => { 
    
    return ( 
        <div style={{width: '200px', borderRadius: '15%', border: '2px solid black', padding: '10px', backgroundColor: '#f0f0f0'}}>
            <Handle
                type="source"
                position={Position.Right}
                onConnect={(params) => console.log('handle onconnect', params)} 
                isConnectable={isConnectable}
            />
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2px'}}>
                <DeveloperBoardIcon sx={{fontSize: '40px', transform: 'rotate(180deg)'}}/> 
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px', fontWeight: 'bold', marginBottom: '5px'}}>
                Transponder
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '10px', marginBottom: '5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%'}}>
                smmp://some-end-point.com/some-path
            </div>
            {/* 
            <input type='text' id='url' placeholder='Enter SMMP URL' style={{border: '1px grey solid', borderRadius: '5%', padding: '5px', fontSize: '12px', width: '100%'}}></input>
            */}
            <Handle
                type="target"
                position={Position.Left} 
                id="a" 
                isConnectable={isConnectable}
            />
        </div>
    );
});