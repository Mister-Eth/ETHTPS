import * as React from 'react';
import { globalApi, providerExclusionList, liveTPSObservable } from '../services/common';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

class ProviderTable extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            rows: [],
            instantTPSData:[],
            excludeSidechains: false,
            providerData: []
        }
    }

    render(){
        return <>
        <div>
        <TableContainer component={Paper} style={{overflowX:'auto'}}>
      <Table size={"small"} style={{minWidth: '550px'}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width={10} align="left">
                <div className={'l1 b'}>
                    No.
                </div>
            </TableCell>
            <TableCell width={150} align="left">
                <div className={'l1 b'}>
                    Name
                </div>
            </TableCell>
            <TableCell width={10} align="left">
                <div className={'l1 b'}>
                    TPS
                </div>
            </TableCell>
            <TableCell width={10} align="left">
                <div className={'l1 b'}>
                    Max TPS
                </div>
            </TableCell>
            <TableCell width={150} align="left">
                <div className={'l1 b'}>
                    Type
                </div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.rows.filter(x => (this.state.excludeSidechains)?this.state.providerData.filter(y=>y.name===x.name && y.type === "Sidechain").length === 0:true).map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">
              <div className={'l1'}></div>
                  {row.no}
              </TableCell>
              <TableCell align="left">
                    <div className={'l1'}>
                        <a style={{color: this.state.colorDictionary[row.name]}} href={`/${row.name}`}>
                            <img className={'provider-icon'} src={`/provider-icons/${row.name}.png`} />
                            {row.name}
                        </a>
                    </div>
              </TableCell>
              <TableCell align="left">
                <div className={'l1'}>
                  {(this.state.instantTPSData[row.name] !== undefined)?this.to2DecimalPlaces(this.state.instantTPSData[row.name][0].tps):0}
                  </div>
              </TableCell>
              <TableCell align="left">
              <div className={'l1'}>
                {(row.maxTPS < row.tps)?row.tps:row.maxTPS}
              </div>
              </TableCell>
              <TableCell align="left">
                <div className={((row.type == "Sidechain")?'l1':'l1 green')}>
                  {row.type}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
        </>;
    }

    to2DecimalPlaces(number){
        let value = Math.round(number * 100) / 100;
        value = value.toString();
        value = value.substr(0, value.indexOf('.') + 3);
        return value;
    }

    createRow(x, i){
        return  { no: (i + 1) + ".", name: x.name, type: x.type, maxTPS: this.to2DecimalPlaces(x.maxTPS) };
    }

    componentDidUpdate(previousProps, previousState){
        if (previousProps.providerData !== this.props.providerData){
            this.setState({providerData: this.props.providerData});
        }
        if (previousProps.instantTPSData !== this.props.instantTPSData){
            this.setState({instantTPSData: this.props.instantTPSData});
        }
        if (previousProps.providerData !== this.props.providerData){
            this.setState({rows: this.props.providerData.map(this.createRow.bind(this))});
        }
        if (previousProps.colorDictionary !== this.props.colorDictionary){
            this.setState({colorDictionary: this.props.colorDictionary});
        }
        if (previousProps.excludeSidechains !== this.props.excludeSidechains){
            this.setState({excludeSidechains: this.props.excludeSidechains});
        }
      }
}    

export default ProviderTable;