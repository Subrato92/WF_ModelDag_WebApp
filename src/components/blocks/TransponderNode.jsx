import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react'; 
import Style from './ModelNode.module.css';

export default memo(({ data, isConnectable }) => { 
    
    return ( 
        <div style={{width: '200px', borderRadius: '15%', border: '1px solid black', padding: '10px'}}>
            <Handle
                type="source"
                position={Position.Right}
                onConnect={(params) => console.log('handle onconnect', params)} 
                isConnectable={isConnectable}
            />
            <div>
                Transponder
            </div>
            <label htmlFor="url">SMMP URL:</label><br/>
            <input type='text' id='url' style={{border: '1px grey solid', borderRadius: '5%'}}></input>
        </div>
    );
});