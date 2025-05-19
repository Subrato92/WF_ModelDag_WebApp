
"use client"
import AccountTreeRoundedIcon from '@mui/icons-material/AccountTreeRounded';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Styles from './Style.module.css';
import Table from '@/components/core/Table';
import { useRouter } from 'next/navigation';
import FAB from '../../components/core/FAB';
import AddSharpIcon from '@mui/icons-material/AddSharp';

export default function Pipelines() {
    const router = useRouter();

    var headers = [
        { name:'Id', id: '1'},
        { name:'Description', id: '2'},
        { name:'Task Id', id: '3'},
        { name:'Owner', id: '4'},
        { name:'Last Updated On', id: '5'},
        { name:'Actions', id: '6'}
    ]

    var rows = [
        {'1':'1', '2':'Pipeline for task 11513', '3':'11513','4':'Subrato Mondal', '5':'3rd May 2025', '6':'123'},
        {'1':'2', '2':'Pipeline for task 11514', '3':'11514','4':'Subrato Mondal', '5':'3rd May 2025', '6':'123'},
        {'1':'3', '2':'Pipeline for task 11515', '3':'11515','4':'Subrato Mondal', '5':'3rd May 2025', '6':'123'}
    ]

    const onView = (pipeline) => {
        router.push('/pipelines/new')
    }

    const onClick = (pipeline) => {
        router.push('/pipelines/new')
    }

    const onEdit = (pipeline) => {

    }

    const onDelete = (pipeline) => {

    }

    return (
        <div style={{margin:'10px', marginTop: '50px'}}>
            <div className={Styles.header}>
                <div className={Styles.header_item + " " + Styles.header_title}>
                    <AccountTreeRoundedIcon style={{margin: "auto 6px", fontSize: "30px", translate: '0px -2px' }}/>
                    <h1>PIPELINES</h1>
                </div>
                <div className={Styles.header_item + " " +Styles.header_action}>
                    <FilterAltIcon style={{fontSize: "24px"}}/>
                    Apply Filter
                </div>
            </div>
            
            <Table headers={headers} rows={rows} onView={onView} onEdit={onEdit} onDelete={onDelete}/>

            <FAB onClick={onClick}>
                <AddSharpIcon style={{fontWeight: 'bold', fontSize: '30px'}}/>
            </FAB>
        </div>
    )
}