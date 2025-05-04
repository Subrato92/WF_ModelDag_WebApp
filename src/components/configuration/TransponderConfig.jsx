"use client"
import React from 'react';

export default function TransponderConfig({section}){
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
                SMMP URL
                <input type='url' style={{border: '1px solid black', borderRadius: '5px', padding: '2px 4px', margin: "4px 0px"}}/>
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