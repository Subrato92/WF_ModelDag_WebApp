"use client"
import React, {useState} from 'react';
import style from './Inputnode.module.css';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Image from "next/image";

export default function TransponderInputNode({key, nodeMeta}){
    const [expand, setExpand] = useState(false);

    console.log("nodeMeta: ", nodeMeta);

    var components = [
        { name: "SMMP URL", type: 'smmp_url', data: { subtype: "url", value: "smmp://url" }},
        { name: "Model", type: 'model', data: { subtype: "model", value: "11615 Regression Model" }},
        { name: "Test Data", type: 'dataNode', data: { subtype: "test_data", value: "hdfs//:test_data_path" }},
        { name: "Train Data", type: 'dataNode', data: { subtype: "train_data", value: "hdfs//:train_data_path" }}
    ]

    return (
        <div 
            key={key} 
            className={style.draggableNode} 
            onDragStart={(event) => { 
                //event.preventDefault();
                if(!expand){
                    event.dataTransfer.effectAllowed = 'move';
                    var componentNodeMeta = {...nodeMeta}
                    componentNodeMeta.data = { value: "smmp://transponder_url", subtype: "Transponder" };
                    event.dataTransfer.setData("meta", JSON.stringify(componentNodeMeta));
                }
            }}
            draggable={!expand}>
            <div style={{ width: '100%', borderBottom: '1px solid black'}}> 
                <span style={{ padding: '8px 4px'}}>
                    Transponder Node
                </span>
                {
                    expand ? 
                        <KeyboardArrowUpIcon style={{ fontSize: '16px', float: 'right'}} onClick={()=> setExpand(false)}/> : 
                        <KeyboardArrowDownIcon style={{ fontSize: '16px', float: 'right'}} onClick={()=> setExpand(true)}/>
                }
            </div>
            { expand &&
                <div>
                    {components.map((component, idx) => 
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