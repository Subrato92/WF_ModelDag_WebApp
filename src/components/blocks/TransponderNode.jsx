import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react'; 
import Style from './ModelNode.module.css';

export default memo(({ data, isConnectable }) => { 
    
    return ( 
        <div style={{width: '200px', borderRadius: '15%', border: '2px solid black', padding: '10px'}}>
            <Handle
                type="source"
                position={Position.Right}
                onConnect={(params) => console.log('handle onconnect', params)} 
                isConnectable={isConnectable}
            />
            <div style={{fontSize: '14px', fontWeight: 'bold', marginBottom: '5px'}}>
                Transponder
            </div>
            <input type='text' id='url' placeholder='Enter SMMP URL' style={{border: '1px grey solid', borderRadius: '5%', padding: '5px', fontSize: '12px', width: '100%'}}></input>
        </div>
    );
});