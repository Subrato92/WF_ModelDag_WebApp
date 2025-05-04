'use client'
import React from 'react';
import Style from './styles/TableStyle.module.css';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export default function Table ( {headers, rows, onView, onEdit, onDelete}){
    return (
        <div className={Style.container}>
            <div className={Style.table}>
                <div className={Style.table_header}>
                    {
                        headers.map((header, idx) => 
                            <div key={idx} className={Style.header__item}>{header.name}</div>
                        )
                    }
                </div>
                <div className="table-content">
                    { rows.map((row, idx) => 
                        <div key={idx} className={Style.table_row}>	
                            {headers.map((header, idx) =>  {
                                if(header.name == 'Actions')
                                    return (
                                        <div key={idx} className={Style.table_data}>
                                            <span style={{fontSize: '12px', background: '#c0c0c0', padding: '8px 8px', borderRadius: '15%', margin: '0px 6px' }} onClick={() => onView(row)}>
                                                <RemoveRedEyeOutlinedIcon style={{fontSize: '16px', margin: '0px 2px'}}/> View
                                            </span>
                                            <ModeEditOutlineOutlinedIcon className={Style.action_item} style={{fontSize: '16px', margin: '0px 6px'}} onClick={() => onEdit(row)}/>
                                            <DeleteOutlineOutlinedIcon className={Style.action_item} style={{fontSize: '16px', margin: '0px 6px'}} onClick={() => onDelete(row)}/>
                                        </div>
                                    )
                                return <div key={idx} className={Style.table_data}>{row[header.id]}</div>
                            })}
                        </div>	
                    )}
                </div>
            </div>
            <div className={Style.table_footer}>
                <div className={Style.footer__item}>1 - 10 of 15  <ChevronLeftIcon style={{margin: '0px 6px'}}/> <KeyboardArrowRightIcon style={{margin: '0px 6px'}}/> </div>
                <div className={Style.footer__item}>Row Per Page : 
                    <select name="page_size" id="page_size" style={{margin: '0px 8px'}}>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="75">75</option>
                        <option value="100">100</option>
                    </select>
                </div>
            </div>
        </div>
    )
}