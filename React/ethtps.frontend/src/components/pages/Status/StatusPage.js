import React from "react";
import { providerData } from "../../../services/defaultData";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableSortLabel } from '@mui/material';
import SortableTable from "../MainPage/components/SortableTable";
import { globalStatusApi } from "../../../services/common";
import { CircularProgress } from "@mui/material";

export default class StatusPage extends SortableTable {
    constructor(props){
        super(props);

        this.state = {
            providerData: providerData,
            statuses: {},
            sort:{
                asc: false,
                columnName: 'status'
            }
        }
    }

    componentDidMount() {
        globalStatusApi.apiStatusGetBlockInfoProviderStatusGet({provider: 'All'}, (err,data,res)=>{
            if (data !== null){
                this.setState({statuses: data});
            }
        });
    }

    render(){
        return <>
        <CompactHeader/>
       

        <h2>
            TPS updater status
        </h2>
        <TableContainer component={Paper} style={{overflowX:'auto'}}>
        <Table size={"small"} style={{minWidth: '300px'}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width={10} align="left">
            <TableSortLabel
                active={this.state.sort.columnName === 'no'}
                direction={(this.state.sort.asc?'asc':'desc')}
                onClick={()=>this.sortTableBy('no')}>
                <div className={'lh b'}>
                    No.
                </div>
            </TableSortLabel>
            </TableCell>
            <TableCell width={150} align="left">
            <TableSortLabel
                active={this.state.sort.columnName === 'name'}
                direction={(this.state.sort.asc?'asc':'desc')}
                onClick={()=>this.sortTableBy('name')}>
                <div className={'lh b'}>
                    Name
                </div>
            </TableSortLabel>
            </TableCell>
            <TableCell width={150} align="left">
            <TableSortLabel
                active={this.state.sort.columnName === 'status'}
                direction={(this.state.sort.asc?'asc':'desc')}
                onClick={()=>this.sortTableBy('status')}>
                <div className={'lh b'}>
                Status
                </div>
            </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        {this.state.providerData.sort(this.dynamicSort(this.state.sort.columnName).bind(this)).map((x, i) => <>
            <TableRow>
            <TableCell align="left">
                <div className={'l1'}></div>
                    {i + 1}
                </TableCell>
                <TableCell align="left">
                <div className={'l1'}>
                    {x.name}
                </div>
                </TableCell>
                <TableCell align="left">
                    {this.getStatusCell(this.getStatus(x.name))}
                </TableCell>
            </TableRow>
        </>)}
      </Table>
    </TableContainer>
        </>
    }

    getStatus(provider){
        if (this.state.statuses[provider] !== undefined){
            return this.state.statuses[provider].status;
        }
        else return "-";
    }

    getStatusCell(status){
        let className = 'l1';
        switch(status){
            case 'Ok':
                className += ' green';
                break;
            case 'Down':
                className += " red";
                break;
            case 'NeedsAttention':
                status = "Needs attention";
                className += " orange";
                break;
            case 'NotImplemented':
                status = 'n/a';
                break;
            default:
                status = <CircularProgress size={15}/>
                break;
        }
        return <div className={className}>
                    {status}
                </div>
    }
}