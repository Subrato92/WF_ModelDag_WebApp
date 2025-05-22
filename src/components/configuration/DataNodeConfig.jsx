"use client"
import React, {useCallback, useState} from 'react';

export default function DataNodeConfig({section, metadata, onChangeMetadata, config, onChangeConfig}){
    return (
        <React.Fragment>
            {section=="Parameters" && <Parameters metadata={metadata} onChangeMetadata={onChangeMetadata} config={config} onChangeConfig={onChangeConfig}/>}
            {section=="Description" && <Description metadata={metadata} onChangeMetadata={onChangeMetadata} config={config} onChangeConfig={onChangeConfig}/>}
        </React.Fragment>
    )

}

export function Parameters({metadata, onChangeMetadata, config, onChangeConfig}){
    const [exception, setException] = useState(null);

    const updateMetadata = useCallback( (field_name, value) => {
        var updatedMetadata = {...metadata};
        updatedMetadata[field_name] = value;

        onChangeMetadata(updatedMetadata)

    }, [metadata, onChangeMetadata]);

    const updateConfig = useCallback( (field_name, value) => {
        var updatedConfig = {...config};
        updatedConfig[field_name] = value;

        onChangeConfig(updatedConfig);

    }, [config, onChangeConfig]);

    return (
        <div style={{display: 'flex', flexDirection: 'column', fontSize: '12px'}}>
            <div style={{display: 'flex', flexDirection: 'column', margin: '8px 4px'}}>
                File Path
                <input 
                    type='text' 
                    style={{border: '1px solid black', borderRadius: '5px', padding: '2px 4px', margin: "4px 0px"}}
                    value={metadata.hasOwnProperty("path") ? metadata["path"] : ""}
                    onChange={(e) => updateMetadata("path", e.target.value)}
                    />
            </div>
            <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                {"< "}OR{" >"}
            </div>
            <div style={{display: 'flex', flexDirection: 'column', margin: '8px 4px'}}>
                Select Registered File Path
                <select 
                    name="page_size" 
                    id="page_size" 
                    style={{border: '1px solid black', borderRadius: '5px', margin: '4px 0px', padding: '8px 12px'}} 
                    value={metadata.hasOwnProperty("registered_path") ? metadata.registered_path : ""}
                    onChange={(e) => {updateMetadata("registered_path", e.target.value)}}>
                    <option value="11213">Path 11213</option>
                    <option value="11214">Path 11214</option>
                    <option value="11215">Path 11215</option>
                    <option value="11216">Path 11216</option>
                    <option value="11217">Path 11217</option>
                </select>
            </div>
        </div>
    )
}


export function Description({metadata, onChangeMetadata, config, onChangeConfig}){

    const updateMetadata = useCallback( (field_name, value) => {
        var updatedMetadata = {...metadata};
        updatedMetadata[field_name] = value;

        onChangeMetadata(updatedMetadata)

    }, [metadata, onChangeMetadata]);

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
                maxLength='200'
                onChange={(e) => updateMetadata("description", e.target.value)}
                value={metadata.hasOwnProperty("description") ? metadata.description : ""}
                />
        </div>
    )
}