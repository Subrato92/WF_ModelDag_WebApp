
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
        { name:'Name', id: '1'},
        { name:'Description', id: '2'},
        { name:'Task Id', id: '3'},
        { name:'Owner', id: '4'},
        { name:'Last Updated On', id: '5'},
        { name:'Actions', id: '6'}
    ]

    var rows = [
        {'1':'Sum1', '2':'$180', '3':'11513','4':'Sum1', '5':'zby', '6':'123'},
        {'1':'Sum2', '2':'$180', '3':'11513','4':'Sum2', '5':'zby', '6':'123'},
        {'1':'Sum3', '2':'$180', '3':'11513','4':'Sum31', '5':'zby', '6':'123'}
    ]

    const onView = (pipeline) => {
        router.push('/pipeline/new')
    }

    const onClick = (pipeline) => {
        router.push('/pipeline/new')
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