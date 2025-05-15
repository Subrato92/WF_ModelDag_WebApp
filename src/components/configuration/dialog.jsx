"use client"
import React, {useCallback, useState} from 'react';
import styles from './dialog.module.css';
import EditIcon from '@mui/icons-material/Edit';
import TransponderConfig from './TransponderConfig';
import DataNodeConfig from './DataNodeConfig';
import TestSuiteConfig from './TestSuiteConfig';
import TestCodeConfig from './TestCodeConfig';

const selected_tab_style = {
    paddingBottom: '5px', 
    borderBottom: '2px solid #d71e28'
}

export default function Dialog({isOpen, selectedNode, sourceNodes, onClose, onUpdate}){

    const [selectedTab, setSelectedtab] = useState("Parameters");
    const [nodeMetadata, setNodeMetadata] = useState(selectedNode && selectedNode.data.hasOwnProperty("metadata") ? selectedNode.data.metadata : {});
    const [nodeConfig, setNodeConfig] = useState(selectedNode && selectedNode.data.hasOwnProperty("config") ? selectedNode.data.config : {});

    return (
        <dialog className={styles.nodeConfigDialog} open={isOpen} 
            onClick={(e) => {
                if (e.target.nodeName === 'DIALOG') {
                    onClose();
                    setSelectedtab("Parameters");
                }
            }}>
            <div className={styles.dialogContent}>
                <div className={styles.dialogItem}>
                    Input
                    { 
                        sourceNodes.map((sourceNode, idx) => 
                            <div key={idx} className={styles.draggableNode} draggable>
                                <span>
                                    {sourceNode.type}
                                </span>
                            </div>
                        )
                    }
                    
                </div>
                <div className={styles.dialogSectionConfigure}>
                    <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <EditIcon sx={{fontSize: '18px', marginRight: '10px', color: '#d71e28'}}/>
                        {selectedNode && selectedNode.type == 'transponderNode' && 'Configure Transponder'}
                        {selectedNode && selectedNode.type == 'testsuiteNode' && 'Configure Testsuite'}
                        {selectedNode && selectedNode.type == 'dataNode' && 'Configure Data'}
                        {selectedNode && selectedNode.type == 'testcodeNode' && 'Configure Testcode'}
                        {selectedNode && selectedNode.type == 'codeblockNode' && 'Configure Codeblock'}
                    </div>
                    <div style={{marginTop: '10px', display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <button className={styles.tab} style={selectedTab=="Parameters"? selected_tab_style: {}} onClick={()=>setSelectedtab("Parameters")}>
                            Parameters
                        </button>
                        <button className={styles.tab} style={selectedTab=="Description"? selected_tab_style: {}} onClick={()=>setSelectedtab("Description")}>
                            Description
                        </button>
                    </div>
                    <div style={{ margin:'0px auto 5px auto', height: '1px', backgroundColor: 'grey', width: '100%', borderRadius: '5px'}}></div>

                    {selectedNode && getConfig(selectedNode.type, selectedTab, nodeMetadata, setNodeMetadata, nodeConfig, setNodeConfig)}
                    
                    <div style={{ position: 'fixed', bottom: '5px', width: '95%', display: 'flex', justifyContent: 'flex-end'}}>
                        <button 
                            style={{margin: '10px 10px', border: '1px solid #d71e28', borderRadius: '5px', padding: '5px 10px', fontSize: '14px'}} 
                            onClick={()=>{
                                onClose();
                                setSelectedtab("Parameters");
                            }}
                        >
                            Close
                        </button>

                        <button 
                            style={{margin: '10px 10px', backgroundColor: '#d71e28', color: 'white', borderRadius: '5px', padding: '5px 10px', fontSize: '14px'}} 
                            onClick={() => {
                                onUpdate(nodeMetadata, nodeConfig);
                                setSelectedtab("Parameters");
                            }}
                        >
                            Update
                        </button>

                    </div>
                </div>
                {/*
                    <div className={styles.dialogItem} style={{paddingLeft: '10px'}}>
                        Output
                    </div>
                */}
            </div>
        </dialog>
    )
}


function getConfig(type, section, metadata, onChangeMetadata, config, onChangeConfig){
    if(type == 'transponderNode')
        return <TransponderConfig section={section} metadata={metadata} onChangeMetadata={onChangeMetadata} config={config} onChangeConfig={onChangeConfig}/>

    if(type == 'dataNode')
        return <DataNodeConfig section={section} metadata={metadata} onChangeMetadata={onChangeMetadata} config={config} onChangeConfig={onChangeConfig}/>

    if(type == 'testsuiteNode')
        return <TestSuiteConfig section={section} metadata={metadata} onChangeMetadata={onChangeMetadata} config={config} onChangeConfig={onChangeConfig}/>

    if(type == 'testcodeNode')
        return <TestCodeConfig section={section} metadata={metadata} onChangeMetadata={onChangeMetadata} config={config} onChangeConfig={onChangeConfig}/>
}