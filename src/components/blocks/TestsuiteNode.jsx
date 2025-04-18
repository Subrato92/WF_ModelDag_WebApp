import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react'; 
import Style from './ModelNode.module.css';

export default memo(({ data, isConnectable }) => { 
    
    return ( 
        <div style={{width: '200px', borderRadius: '5%', border: '2px solid black', padding: '10px'}}>
            <Handle
                type="source"
                position={Position.Right}
                onConnect={(params) => console.log('handle onconnect', params)} 
                isConnectable={isConnectable}
            />
            <div style={{fontSize: '14px', fontWeight: 'bold', marginBottom: '5px'}}>
                Test Suite
            </div>
            <select className={Style.select} id="model_id" name="cars" style={{width: '100%', border: '1px solid black', padding: '5px', fontSize: '10px'}}>
                <option value="12">Suite 12321</option>
                <option value="13">Suite 17212</option>
            </select>
            <Handle
                type="target"
                position={Position.Left} 
                id="a" 
                isConnectable={isConnectable}
            />
        </div>
    );
});