"use client"
import React from 'react';

export default function TestSuiteConfig({section}){
    return (
        <React.Fragment>
            {section=="Parameters" && <Parameters/>}
            {section=="Description" && <Description/>}
        </React.Fragment>
    )

}

export function Parameters(){
    return (
        <div style={{display: 'flex', flexDirection: 'column', fontSize: '12px'}}>
            <div style={{display: 'flex', flexDirection: 'column', margin: '8px 4px'}}>
                Select Signed-off Test Suite
                <select name="page_size" id="page_size" style={{border: '1px solid black', borderRadius: '5px', margin: '4px 0px', padding: '8px 12px'}}>
                    <option value="11213">Suite 11213</option>
                    <option value="11214">Suite 11214</option>
                    <option value="11215">Suite 11215</option>
                    <option value="11216">Suite 11216</option>
                    <option value="11217">Suite 11217</option>
                </select>
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