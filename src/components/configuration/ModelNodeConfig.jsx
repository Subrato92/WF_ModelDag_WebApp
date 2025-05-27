"use client"
import React, {useState, useCallback} from 'react';

export default function ModelNodeConfig({section, metadata, onChangeMetadata, config, onChangeConfig}){

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
                SMMP URL
                <input 
                    type='url' 
                    style={{border: '1px solid black', borderRadius: '5px', padding: '2px 4px', margin: "4px 0px"}}
                    value={metadata.hasOwnProperty("url") ? metadata["url"] : ""}
                    onChange={(e) => updateMetadata("url", e.target.value)}
                />
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