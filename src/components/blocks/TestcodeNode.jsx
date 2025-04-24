import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react'; 
import Style from './ModelNode.module.css';
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';

export default memo(({ data, isConnectable }) => { 
    
    return ( 
        <div>
            <div style={{ height: '35px'}}>

            </div>
            <div style={{width: '80px', height: '80px', 
                borderRadius: '50% 50% 50% 10%', 
                border: '1px solid black', padding: '10px', 
                background: 'linear-gradient(111deg,rgba(88, 88, 88, 1) 14%, rgba(48, 48, 48, 1) 51%)', display: 'flex', 
                flexDirection: 'row', 
                alignItems: 'center', 
                justifyContent: 'center'}}>

                <Handle
                    type="source"
                    position={Position.Right}
                    onConnect={(params) => console.log('handle onconnect', params)} 
                    isConnectable={isConnectable}
                />
                <AnalyticsOutlinedIcon sx={{fontSize: '40px', color: '#66FF33'}}/> 
                <Handle
                    type="target"
                    position={Position.Left} 
                    id="a" 
                    isConnectable={isConnectable}
                />
            </div>
            
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px', fontWeight: 'bold', marginTop: '3px'}}>
                Test Code
            </div>
            {/*
                <select className={Style.select} id="model_id" name="cars" style={{width: '100%', border: '1px solid black', padding: '5px', fontSize: '10px'}}>
                    <option value="12">Suite 12321</option>
                    <option value="13">Suite 17212</option>
                </select>
            */}
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '10px', marginBottom: '5px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%'}}>
                TC 12321
            </div>
            
        </div>
    );
});