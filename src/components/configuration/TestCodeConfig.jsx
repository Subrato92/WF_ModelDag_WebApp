"use client"
import { type } from 'os';
import React, {useCallback, useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

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

    }, [metadata, onChangeMetadata]);

    const updateConfig = useCallback( (field_name, value) => {
        var updatedConfig = {...config};
        updatedConfig[field_name] = value;

        onChangeConfig(updatedConfig);

    }, [config, onChangeConfig]);

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

    var input_fields = [
        { name: 'Transponder', id: 'transponder', type: 'transponderNode' },
        { name: 'SMMP Url', id: 'url', type: 'smmp_url' },
        { name: 'Model', id: 'model', type: 'model' },
        { name: 'Train Data', id: 'train_data', type: 'dataNode' },
        { name: 'Test Data', id: 'test_data', type: 'dataNode' },
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
                Arguments
                
                <div style={{display: 'flex', flexDirection: 'column', margin: '4px 0px'}}>
                    {input_fields.map((input_field, idx) => <div key={idx} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <span>{input_field.name}</span>
                        <div style={{flex: '1 1 10%'}}></div>
                        <div 
                            style={{
                                border: '1px solid black', 
                                padding: '6px', 
                                height: '35px', 
                                width: '60%', 
                                margin: '4px 6px', 
                                borderRadius: '4px',
                                display: 'flex',
                                flexDirection: 'row'
                            }}
                            onDrop={(event) => {
                                event.preventDefault();
                                console.log("dropped Item: ", event.dataTransfer);
                                console.log("dropped Item Meta: ", event.dataTransfer.getData("meta"));
                                var nodeMeta = JSON.parse(event.dataTransfer.getData("meta"));
                                
                                if(input_field.type != nodeMeta.type){
                                    setException("Required node type: "+ input_field.type+". Received "+ nodeMeta.type);
                                }else{
                                    document.getElementById(input_field.id+"_value").value = nodeMeta.value;
                                    var field_metaData = {};
                                    field_metaData.type = nodeMeta.type;
                                    field_metaData.data = nodeMeta.data;
                                    console.log('setting field Meta: ', field_metaData);
                                    updateMetadata("input_field_"+input_field.id, field_metaData);
                                }
                            }}
                            onDragOver={(event)=> {
                                event.preventDefault();
                                event.dataTransfer.dropEffect = 'move';
                            }}
                        >
                            <div style={{ display: 'flex', flexDirection: 'column', width: '95%', height:'95%', overflowX: 'hidden', overflowY: 'scroll' }}>
                                <input id={input_field.id+"_value"} value={getMetafieldValue(metadata, "input_field_"+input_field.id, "data.value")} readOnly></input>
                            </div>
                            {  getMetafieldValue(metadata, "input_field_"+input_field.id, "data.value").length > 1 &&
                                <CloseIcon style={{float: 'right', color: 'var(--wf-red)', fontSize: '16px'}} onClick={(e) => updateMetadata("input_field_"+input_field.id, {})}/>
                            }
                        </div>
                    </div>)}
                    
                </div>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', margin: '8px 4px'}}>
                Fill in the parameters
                <div style={{display: 'grid', gridTemplateColumns: 'auto auto', gap: '4px', margin: '4px 0px'}}>
                    {params.map((param, idx) => <input 
                            key={idx} 
                            placeholder={param.name} 
                            type={param.type} 
                            style={{ padding: '4px', border: '1px solid grey', borderRadius: '4px'}}
                            onChange={(e) => updateConfig(param.name, e.target.value)}
                            value={config.hasOwnProperty(param.name) ? config[param.name] : ""}
                        />)}
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

    if( metadata == null || metadata == undefined || field_name == undefined || field_name.trim().length==0 )
        return "";

    var fieldMeta = metadata.hasOwnProperty(field_id) ? metadata[field_id] : {};
    var obj = fieldMeta;

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