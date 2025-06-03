"use client"
import React, {useState, useEffect} from 'react';
import style from './Inputnode.module.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Image from "next/image";
import { type } from 'os';
import { relative } from 'path';

export default function InputNode({nodeMeta}){
    // Manages expansion of the Node
    const [expand, setExpand] = useState(false);
    // Manages expansion of the sub-components of the Node
    const [expandComponents, setExpandComponents] = useState(false);
    const [subComponents, setSubComponents] = useState([]);

    // Manages the CSS effects for Node
    useEffect(() => {
        if(expand){
            document.getElementById(`node-${nodeMeta.id}`).classList.remove(style.draggableNodeEffects);
            subComponents
            .forEach((component) => {
                if(document.getElementById(`${nodeMeta.id}_${component.name}`) && !document.getElementById(`${nodeMeta.id}_${component.name}`).classList.contains(style.draggableNodeEffects))
                    document.getElementById(`${nodeMeta.id}_${component.name}`).classList.add(style.draggableNodeEffects)
            });
        }else{
            document.getElementById(`node-${nodeMeta.id}`).classList.add(style.draggableNodeEffects);
        }
    }, [expand, nodeMeta]);


    // Manages the CSS effects for Components of the Node
    useEffect(() => {

        subComponents
            .forEach((component) => {
                if(document.getElementById(`${nodeMeta.id}_${component.name}`) && !document.getElementById(`${nodeMeta.id}_${component.name}`).classList.contains(style.draggableNodeEffects))
                    document.getElementById(`${nodeMeta.id}_${component.name}`).classList.add(style.draggableNodeEffects)
            });

        if(expandComponents){
            document.getElementById(`${expandComponents.nodeId}_${expandComponents.name}`).classList.remove(style.draggableNodeEffects);
        }

    }, [expandComponents, subComponents]);

    // console.log("nodeMeta: ", nodeMeta);
    var subComponent_map = {
        modelNode: [
            { name: "SMMP URL", type: 'smmp_url', data: { type: "url", value: "smmp://url", representation: "{ url: \"smmp://url\", value: \"smmp_url\" }" }},
            { name: "Model Object", type: 'model', data: { type: "model", value: "11615 Regression Model", representation: "{ url: \"smmp://url\", value: \"model\" }" }},
            { name: "Test Data", type: 'dataNode', data: { type: "test_data", value: "hdfs//:test_data_path", representation: "{ url: \"smmp://url\", value: \"test_data\" }" }},
            { name: "Train Data", type: 'dataNode', data: { type: "train_data", value: "hdfs//:train_data_path", representation: "{ url: \"smmp://url\", value: \"train_data\" }" }}
        ],
        testcodeNode: [
            { 
                name: "Metrics", 
                type: 'metrics', 
                data: { 
                    type: "metrics", 
                    value: "metrics", 
                    representation: "{ url: \"smmp://url\", value: \"metrics\" }", 
                    elements: [
                        {name: "accuracy", type: 'metric', data:{ value: '0.95', representation: "{ url: \"smmp://url\", value: \"metrics.accuracy\" }" }}, 
                        {name: "precision", type: 'metric', data:{value: '0.90', representation: "{ url: \"smmp://url\", value: \"metrics.precision\" }" }}, 
                        {name: "recall", type: 'metric', data:{value: '0.92', representation: "{ url: \"smmp://url\", value: \"metrics.recall\" }" }}, 
                        {name: "f1_score", type: 'metric', data:{value: '0.91', representation: "{ url: \"smmp://url\", value: \"metrics.f1_score\" }" }}
                    ]
                }
            },
            { 
                name: "Tables", 
                type: 'tables', 
                data: { 
                    type: "tables", 
                    value: "tables", 
                    representation: "{ url: \"smmp://url\", value: \"tables\" }", 
                    elements: [
                        {name: 'TableA', type: 'tables', data: { value: "table1", representation: "{ url: \"smmp://url\", value: \"tables.TableA\" }"} }, 
                        {name: 'TableB', type: 'tables', data: { value: "long_tabel_value_table2_xyz", representation: "{ url: \"smmp://url\", value: \"tables.TableB\" }"} },
                        {name: 'TableC', type: 'tables', data: { value: "table3_some", representation: "{ url: \"smmp://url\", value: \"tables.TableC\" }"} },
                        {name: 'TableD', type: 'tables', data: { value: "long_tabel_value_table4_xyz", representation: "{ url: \"smmp://url\", value: \"tables.TableD\" }"} }
                    ]
                }
            },
            { 
                name: "Images", 
                type: 'figures', 
                data: { 
                    type: "figures", 
                    value: "figures",
                    representation: "{ url: \"smmp://url\", value: \"figures\" }", 
                    elements: [
                        {name: 'FigureA', type: 'figures', data: { value: "figure_binary", representation: "{ url: \"smmp://url\", value: \"figures.FigureA\" }" }}, 
                        {name: 'FigureB', type: 'figures', data: { value: "figure_binary", representation: "{ url: \"smmp://url\", value: \"figures.FigureB\" }" }}
                    ]
                }
            }
        ]
    }

    useEffect(() => {
        if(subComponent_map.hasOwnProperty(nodeMeta.type))
            setSubComponents(subComponent_map[nodeMeta.type]);
    }, []);
    
    var components = {
        modelNode: {name: "Model Node", data: { value: "smmp://transponder_url", subtype: "Transponder" }},
        dataNode: {name: "Data Node", data: { value: "hdfs://some_file_path", subtype: "testData" }},
        testsuiteNode: {name: "Test-Suite Node", data: { value: "Suite 12321", subtype: "testsuiteNode" }},
        testcodeNode: {name: "Testcode Node", data: { value: "TestCode 123221", subtype: "testcodeNode" }},
        codeblockNode: {name: "CodeBlock Node", data: { value: "CodeBlock 12321", subtype: "codeblockNode" }},
    }

    return (
        <div 
            id={`node-${nodeMeta.id}`}
            className={style.draggableNode} 
            onDragStart={(event) => { 
                //event.preventDefault();
                if(!expand){
                    event.dataTransfer.effectAllowed = 'move';
                    var componentNodeMeta = {...nodeMeta}
                    componentNodeMeta.data = components[nodeMeta.type].data;
                    event.dataTransfer.setData("meta", JSON.stringify(componentNodeMeta));
                }
            }}
            draggable={!expand}>
            {/* Renders Node*/}
            <div style={{ width: '100%', borderBottom: '1px solid black'}}> 
                <span style={{ padding: '8px 4px'}}>
                    {components[nodeMeta.type].name}
                </span>
                {
                    subComponents.length > 0 && (
                        expand ? 
                        <KeyboardArrowUpIcon style={{ fontSize: '16px', float: 'right'}} onClick={()=> setExpand(false)}/> : 
                        <KeyboardArrowDownIcon style={{ fontSize: '16px', float: 'right'}} onClick={()=> setExpand(true)}/>
                    )
                }
                {
                    !expand && <Image
                        aria-hidden
                        src="/draggableIcon.svg"
                        alt="Globe icon"
                        width={14}
                        height={14}
                        style={{ fontSize: '16px', float: 'right', margin: '2px 4px'}}
                    />
                }
            </div>
            {/* Renders Sub-Components of the Node*/}
            { subComponents.length > 0 && expand &&
                <div>
                    {subComponents.map((subComponent, idx) => 
                        <div 
                            key={idx} 
                            id={nodeMeta.id + "_" + subComponent.name}
                            className={style.components} 
                            onDragStart={(event) => { 
                                //event.preventDefault();
                                event.dataTransfer.effectAllowed = 'move';
                                
                                var componentNodeMeta = {...nodeMeta}
                                componentNodeMeta.type = subComponent.type;
                                componentNodeMeta.data = subComponent.data;

                                event.dataTransfer.setData("meta", JSON.stringify(componentNodeMeta));
                            }}
                            draggable={(!expandComponents || expandComponents.name !== subComponent.name)}>

                            <div className={style.componentTitle}>
                                <div style={{flex: '1 1 10%'}}>
                                    {subComponent.name}
                                </div>
                                {(!expandComponents || expandComponents.name !== subComponent.name) && <Image
                                    aria-hidden
                                    src="/draggableIcon.svg"
                                    alt="Globe icon"
                                    width={14}
                                    height={14}
                                />}
                                {
                                    subComponent.data.hasOwnProperty('elements') && subComponent.data.elements.length > 0 && (
                                        expandComponents && expandComponents.name === subComponent.name ? 
                                        <KeyboardArrowUpIcon style={{ fontSize: '16px', float: 'right'}} onClick={()=> setExpandComponents(false)}/> : 
                                        <KeyboardArrowDownIcon style={{ fontSize: '16px', float: 'right'}} onClick={()=> setExpandComponents({name: subComponent.name, nodeId: nodeMeta.id})}/>
                                    )
                                }
                            </div>
                            {/* Renders Sub-Components of the Sub-Components of the Node*/}
                            {
                                expandComponents && expandComponents.name === subComponent.name && subComponent.data.hasOwnProperty('elements') && <div className={style.elementsContainer}>
                                    {   subComponent.data.elements.map((element, idx) => 
                                        <div 
                                            key={idx} 
                                            className={style.componentElement + " " + style.draggableNodeEffects}
                                            draggable={expandComponents && expandComponents.name === subComponent.name}
                                            >
                                            <div className={style.componentElementHeader}>
                                                <div style={{fontSize: '10px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: '1 1 100%'}}>{element.name}</div>
                                                <Image
                                                    aria-hidden
                                                    src="/draggableIcon.svg"
                                                    alt="Globe icon"
                                                    width={14}
                                                    height={14}
                                                />
                                            </div>
                                            <div style={{fontSize: '9px', color: 'grey', overflow: 'hidden', flex: '1 1 100%'}}>{element.data.value}</div>
                                        </div>
                                    )}
                                </div>
                            }
                        </div>)
                    }
                </div>
            }
    </div>
)}