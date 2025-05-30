"use client"
import React, {useState, useEffect} from 'react';
import style from './Inputnode.module.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Image from "next/image";

export default function InputNode({nodeMeta}){
    const [expand, setExpand] = useState(false);

    useEffect(() => {
        if(expand){
            document.getElementById(`node-${nodeMeta.id}`).classList.remove(style.draggableNodeEffects);
        }else{
            document.getElementById(`node-${nodeMeta.id}`).classList.add(style.draggableNodeEffects);
        }
    }, [expand, nodeMeta]);

    // console.log("nodeMeta: ", nodeMeta);
    var subComponent_map = {
        modelNode: [
            { name: "SMMP URL", type: 'smmp_url', data: { subtype: "url", value: "smmp://url" }},
            { name: "Model Object", type: 'model', data: { subtype: "model", value: "11615 Regression Model" }},
            { name: "Test Data", type: 'dataNode', data: { subtype: "test_data", value: "hdfs//:test_data_path" }},
            { name: "Train Data", type: 'dataNode', data: { subtype: "train_data", value: "hdfs//:train_data_path" }}
        ],
        testcodeNode: [
            { name: "Metrics", type: 'metrics', data: { subtype: "url", value: "smmp://url" }},
            { name: "Tables", type: 'tables', data: { subtype: "model", value: "11615 Regression Model" }},
            { name: "Images", type: 'images', data: { subtype: "test_data", value: "hdfs//:test_data_path" }}
        ]
    }

    var subComponents = [];
    if(subComponent_map.hasOwnProperty(nodeMeta.type))
        subComponents = subComponent_map[nodeMeta.type]

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
            { subComponents.length > 0 && expand &&
                <div>
                    {subComponents.map((subComponent, idx) => 
                        <div 
                            key={idx} 
                            className={style.components} 
                            onDragStart={(event) => { 
                                //event.preventDefault();
                                event.dataTransfer.effectAllowed = 'move';
                                
                                var componentNodeMeta = {...nodeMeta}
                                componentNodeMeta.type = subComponent.type;
                                componentNodeMeta.data = subComponent.data;

                                event.dataTransfer.setData("meta", JSON.stringify(componentNodeMeta));
                            }}
                            draggable>
                            <div style={{flex: '1 1 10%'}}>
                                {subComponent.name}
                            </div>
                            <Image
                                aria-hidden
                                src="/draggableIcon.svg"
                                alt="Globe icon"
                                width={14}
                                height={14}
                            />
                        </div>)
                    }
                </div>
            }
    </div>
)}