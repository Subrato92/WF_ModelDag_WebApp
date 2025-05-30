"use client"
import { type } from 'os';
import React, {useCallback, useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

import style from './dialog.module.css';

export default function TestCodeConfig({section, metadata, onChangeMetadata, config, onChangeConfig}){
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
        console.log('updatedMetadata: ', updatedMetadata, 'metadata: ', metadata);

    }, [metadata, onChangeMetadata]);

    const updateConfig = useCallback( (field_name, value) => {
        var updatedConfig = {...config};
        updatedConfig[field_name] = value;

        onChangeConfig(updatedConfig);

    }, [config, onChangeConfig]);

    var params = [
        { name: 'SMMP Url', id: 'url', type: 'smmp_url' },
        { name: 'Model', id: 'model', type: 'modelNode' },
        { name: 'Train Data', id: 'train_data', type: 'dataNode' },
        { name: 'Test Data', id: 'test_data', type: 'dataNode' },
        { name: 'Handle Missing Values', id: 'handle_missing_values', type: 'text' },
        { name: 'Max Outlier', id: 'max_outlier', type: 'text' },
        { name: 'Num Decimals', id: 'num_decimals', type: 'text' },
        { name: 'Max Cats', id: 'max_cats', type: 'text' },
        { name: 'Max Miss Pct', id: 'max_miss_pct', type: 'text' },
        { name: 'Min CV', id: 'min_cv', type: 'text' },
        { name: 'P Val', id: 'p_val', type: 'text' },
        { name: 'Predictors', id: 'predictors', type: 'text' },
        { name: 'Correction', id: 'correction', type: 'text' },
        { name: 'Outlier Datasets', id: 'outlier_datasets', type: 'text' },
        { name: 'Drift Datasets', id: 'drift_datasets', type: 'text' },
        { name: 'Special Missing Codes', id: 'special_missing_codes', type: 'text' }
    ]

    return (
        <div style={{display: 'flex', flexDirection: 'column', fontSize: '12px', height: '77%', overflowY: 'scroll', overflowX: 'hidden'}}>
            { exception &&
                <div style={{margin: '8px 4px', padding: '8px 12px', border: "1px solid var(--wf-red)", borderRadius: '5px', display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'center'}}>
                    <h4 style={{color: 'var(--wf-red)', paddingRight: '4px'}}>{'Error :'}</h4>
                    <h4 style={{flex: '1 1 50%'}}>{exception}</h4>
                    <CloseIcon style={{color: 'var(--wf-red)', fontSize: '16px'}} onClick={(e) => setException(null)}/>
                </div>
            }
            <div style={{display: 'flex', flexDirection: 'column', margin: '8px 4px'}}>
                Select Signed-off Test Code
                <select 
                    name="page_size" 
                    id="page_size" 
                    style={{border: '1px solid black', borderRadius: '5px', margin: '4px 0px', padding: '8px 12px'}} 
                    value={metadata.hasOwnProperty("testcode_id") ? metadata.testcode_id : "11213"}
                    onChange={(e) => {updateMetadata("testcode_id", e.target.value)}}>
                    <option value="11213">Code 11213</option>
                    <option value="11214">Code 11214</option>
                    <option value="11215">Code 11215</option>
                    <option value="11216">Code 11216</option>
                    <option value="11217">Code 11217</option>
                </select>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', margin: '8px 4px'}}>
                Fill in the parameters
                <div style={{display: 'grid', gridTemplateColumns: 'auto auto', gap: '4px', margin: '4px 0px'}}>
                    {params.map((input_field, idx) =>
                        <input 
                            key={idx} 
                            className={style.inputContainerField}
                            placeholder={input_field.name}
                            id={input_field.id+"_value"} 
                            type="text"
                            onDrop={(event) => {
                                event.preventDefault();
                                console.log("dropped Item: ", event.dataTransfer);
                                console.log("dropped Item Meta: ", event.dataTransfer.getData("meta"));
                                var nodeMeta = JSON.parse(event.dataTransfer.getData("meta"));
                                
                                if(input_field.type != nodeMeta.type){
                                    setException("Required node type: "+ input_field.type+". Received "+ nodeMeta.type);
                                }else{
                                    document.getElementById(input_field.id+"_value").value = nodeMeta.value;
                                    /*
                                    var field_metaData = {};
                                    field_metaData.type = nodeMeta.type;
                                    field_metaData.data = nodeMeta.data;
                                    
                                    console.log('setting field Meta: ', field_metaData);
                                    */
                                    var data = nodeMeta.data;
                                    console.log('data: ', data);
                                    if(metadata.hasOwnProperty("input_field_"+input_field.id)){
                                        updateMetadata("input_field_"+input_field.id, metadata["input_field_"+input_field.id] + " " + data.value);
                                    }else{
                                        updateMetadata("input_field_"+input_field.id, data.value);
                                    }
                                    
                                }
                            }}
                            onDragOver={(event)=> {
                                event.preventDefault();
                                event.dataTransfer.dropEffect = 'move';
                            }}
                            value={getMetafieldValue(metadata, "input_field_"+input_field.id, "")} 
                            onChange={(e) => updateMetadata("input_field_"+input_field.id, e.target.value)}/>
                    )}
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

const getMetafieldValue = (metadata, field_id, field_name) => {

    console.log('getMetafieldValue: ', metadata, field_id, field_name);

    if( metadata == null || metadata == undefined || field_name == undefined)
        return "";

    var fieldMeta = metadata.hasOwnProperty(field_id) ? metadata[field_id] : {};
    var obj = fieldMeta;

    console.log('fieldMeta: ', fieldMeta, 'field_id: ', field_id, 'field_name: ', field_name);

    if(field_name.trim().length == 0)
        return Object.keys(obj).length === 0 ? "" : obj;

    var fields = field_name.split(".");
    for(let i=0; i<fields.length; i++){
        console.log('field: ', fields[i], ', obj:', obj, 'typeof:', typeof obj);
        if(!obj.hasOwnProperty(fields[i]))
            return "";

        obj = obj[fields[i]];
    }

    return obj;
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