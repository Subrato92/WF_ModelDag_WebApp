import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react'; 
import Style from './ModelNode.module.css';
import AssessmentIcon from '@mui/icons-material/Assessment';

export default memo(({ data, isConnectable }) => { 
    
    return ( 
        <div>
            <div style={{ height: '35px'}}>

            </div>
            <div style={{ width: '80px', height: '80px', 
                borderRadius: '10% 50% 50% 10%', 
                border: '1px solid black', 
                padding: '10px', 
                backgroundColor: '#f0f0f0', 
                display: 'flex', 
                flexDirection: 'row', 
                alignItems: 'center', 
                justifyContent: 'center'}}>
                <Handle
                    type="source"
                    position={Position.Right}
                    onConnect={(params) => console.log('handle onconnect', params)} 
                    isConnectable={isConnectable}
                />
                <AssessmentIcon sx={{fontSize: '40px', color: '#339966'}}/>
                <Handle
                    type="target"
                    position={Position.Left} 
                    id="a" 
                    isConnectable={isConnectable}
                />
            </div>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px', fontWeight: 'bold', marginBottom: '0px', marginTop: '3px'}}>
                Test Suite
            </div>
            {/*
                <select className={Style.select} id="model_id" name="cars" style={{width: '100%', border: '1px solid black', padding: '5px', fontSize: '10px'}}>
                    <option value="12">Suite 12321</option>
                    <option value="13">Suite 17212</option>
                </select>
            */}
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '10px', marginBottom: '5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%'}}>
                Suite 12321
            </div>
            
        </div>
    );
});