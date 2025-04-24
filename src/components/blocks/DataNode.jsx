import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react'; 
import Style from './ModelNode.module.css';
import DescriptionIcon from '@mui/icons-material/Description';

export default memo(({ data, isConnectable }) => { 
    
    return ( 
        <div>
            <div style={{ height: '25px'}}>

            </div>
            <div style={{width: '80px', height: '80px', borderRadius: '50%', border: '1px solid black', padding: '10px', background: 'linear-gradient(111deg,rgba(88, 88, 88, 1) 14%, rgba(48, 48, 48, 1) 51%)', display: 'flex', 
                flexDirection: 'row', 
                alignItems: 'center', 
                justifyContent: 'center'}}>
                <Handle
                    type="source"
                    position={Position.Right}
                    onConnect={(params) => console.log('handle onconnect', params)} 
                    isConnectable={isConnectable}
                />
            
                <DescriptionIcon sx={{fontSize: '40px', color: '#00CCFF'}}/> 
                
            </div>

            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px', fontWeight: 'bold', marginBottom: '0px', marginTop: '3px'}}>
                Data
            </div>
            
        </div>
    );
});