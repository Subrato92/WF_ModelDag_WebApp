"use client"
import { type } from 'os';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';

export default function TestCodeConfig({section}){
    return (
        <React.Fragment>
            {section=="Parameters" && <Parameters/>}
            {section=="Description" && <Description/>}
        </React.Fragment>
    )
}

export function Parameters(){

    var params = [
        { name: 'handle_missing_values', type: 'text' },
        { name: 'max_outlier', type: 'text' },
        { name: 'num_decimals', type: 'text' },
        { name: 'max_cats', type: 'text' },
        { name: 'max_miss_pct', type: 'text' },
        { name: 'min_cv', type: 'text' },
        { name: 'p_val', type: 'text' },
        { name: 'predictors', type: 'text' },
        { name: 'correction', type: 'text' },
        { name: 'outlier_datasets', type: 'text' },
        { name: 'drift_datasets', type: 'text' },
        { name: 'special_missing_codes', type: 'text' }
    ]

    return (
        <div style={{display: 'flex', flexDirection: 'column', fontSize: '12px', height: '77%', overflowY: 'scroll', overflowX: 'hidden'}}>
            <div style={{display: 'flex', flexDirection: 'column', margin: '8px 4px'}}>
                Select Signed-off Test Code
                <select name="page_size" id="page_size" style={{border: '1px solid black', borderRadius: '5px', margin: '4px 0px', padding: '8px 12px'}}>
                    <option value="11213">Code 11213</option>
                    <option value="11214">Code 11214</option>
                    <option value="11215">Code 11215</option>
                    <option value="11216">Code 11216</option>
                    <option value="11217">Code 11217</option>
                </select>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', margin: '8px 4px'}}>
                Map the fields
                <div style={{display: 'flex', flexDirection: 'column', margin: '4px 0px'}}>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <span>Model Base</span>
                        <div style={{flex: '1 1 10%'}}></div>
                        <div style={{border: '1px solid black', padding: '6px', height: '35px', width: '60%', margin: '4px 6px', borderRadius: '4px'}}>

                        </div>
                    </div>
                    
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', margin: '8px 4px'}}>
                Fill in the parameters
                <div style={{display: 'grid', gridTemplateColumns: 'auto auto', gap: '4px', margin: '4px 0px'}}>
                    {params.map((param, idx) => <input key={idx} placeholder={param.name} type={param.type} style={{ padding: '4px', border: '1px solid grey', borderRadius: '4px'}}/>)}
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', margin: '8px 4px'}}>
                Criterion
                <div style={{display: 'flex', flexDirection: 'row', margin: '4px 0px'}}>
                    <input placeholder='Criteria Name' type='text' style={{ padding: '4px', border: '1px solid grey', borderRadius: '4px', margin: '4px', marginLeft: '0px'}}/>
                    <select name="operator" id="operator" style={{border: '1px solid black', borderRadius: '5px', margin: '4px', padding: '8px 12px'}}>
                        <option value="11213"> {'<'} </option>
                        <option value="11214"> {'>'} </option>
                        <option value="11215"> {'='} </option>
                    </select>
                    <input placeholder='Criteria Value' type='text' style={{ padding: '4px', border: '1px solid grey', borderRadius: '4px', margin: '4px'}}/>
                </div>
                <button style={{border: '1px solid grey', borderRadius: '4px', padding: '4px', width: '175px', justifyContent: 'center', alignItems: 'baseline'}}> 
                    <AddIcon style={{ fontSize: '14px'}}/>
                    Add New Criteria
                </button>
            </div>
        </div>
    )
}


export function Description(){
    return (
        <div style={{display: 'flex', flexDirection: 'column', fontSize: '12px'}}>
            <textarea 
                style={{
                    border: '1px solid black', 
                    borderRadius: '5px', 
                    padding: '2px 8px', 
                    margin: "8px 4px",
                    minHeight: "100px"
                }} 
                row='20' 
                placeholder='Provide some description...' 
                maxLength='200'/>
        </div>
    )
}