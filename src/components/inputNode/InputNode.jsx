"use client"
import React, {useState} from 'react';
import style from './Inputnode.module.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Image from "next/image";

export default function InputNode({nodeMeta}){
    const [expand, setExpand] = useState(false);

    console.log("nodeMeta: ", nodeMeta);

    var subComponent_map = {
        transponderNode: [
            { name: "SMMP URL", type: 'smmp_url', data: { subtype: "url", value: "smmp://url" }},
            { name: "Model", type: 'model', data: { subtype: "model", value: "11615 Regression Model" }},
            { name: "Test Data", type: 'dataNode', data: { subtype: "test_data", value: "hdfs//:test_data_path" }},
            { name: "Train Data", type: 'dataNode', data: { subtype: "train_data", value: "hdfs//:train_data_path" }}
        ]
    }

    var subComponents = [];
    if(subComponent_map.hasOwnProperty(nodeMeta.type))
        subComponents = subComponent_map[nodeMeta.type]

    var components = {
        transponderNode: {name: "Transponder Node", data: { value: "smmp://transponder_url", subtype: "Transponder" }},
        dataNode: {name: "Data Node", data: { value: "hdfs://some_file_path", subtype: "testData" }},
        testsuiteNode: {name: "Test-Suite Node", data: { value: "Suite 12321", subtype: "testsuiteNode" }},
        testcodeNode: {name: "Test-Code Node", data: { value: "TestCode 123221", subtype: "testcodeNode" }},
        codeblockNode: {name: "CodeBlock Node", data: { value: "CodeBlock 12321", subtype: "codeblockNode" }},
    }

    return (
        <div 
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
                    {subComponents.map((component, idx) => 
                        <div 
                            key={idx} 
                            className={style.components} 
                            onDragStart={(event) => { 
                                //event.preventDefault();
                                event.dataTransfer.effectAllowed = 'move';
                                
                                var componentNodeMeta = {...nodeMeta}
                                componentNodeMeta.type = component.type;
                                componentNodeMeta.data = component.data;

                                event.dataTransfer.setData("meta", JSON.stringify(componentNodeMeta));
                            }}
                            draggable>
                            <div style={{flex: '1 1 10%'}}>
                                {component.name}
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