import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react'; 
import Style from './ModelNode.module.css';
import DescriptionIcon from '@mui/icons-material/Description';

export default memo(({ data, isConnectable }) => { 
    
    return ( 
        <div style={{width: '80px', height: '80px', borderRadius: '50%', border: '1px solid black', padding: '10px', backgroundColor: '#f0f0f0'}}>
            <Handle
                type="source"
                position={Position.Right}
                onConnect={(params) => console.log('handle onconnect', params)} 
                isConnectable={isConnectable}
            />
            <div style={{width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <DescriptionIcon sx={{fontSize: '30px'}}/> 
                <div style={{fontSize: '14px', fontWeight: 'bold', marginBottom: '5px'}}>
                    Data
                </div>
            </div>
            
        </div>
    );
});