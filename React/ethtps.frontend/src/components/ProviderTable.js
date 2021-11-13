import * as React from 'react';
import { globalApi, providerExclusionList, liveTPSObservable } from '../services/common';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";

class ProviderTable extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            rows: props.providerData.map(this.createRow.bind(this)),
            instantTPSData: props.instantTPSData,
            providerData: props.providerData,
            maxData: props.maxData,
            mode: props.mode,
            colorDictionary: props.colorDictionary
        }
    }

    render(){
      if (this.state.colorDictionary === undefined){
        return <></>
      }
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
                    {this.state.mode.toUpperCase()}
                </div>
            </TableCell>
            <TableCell width={10} align="left">
                <div className={'l1 b tooltip'}>
                    Max {this.state.mode.toUpperCase()}
                    <span className={'tooltiptext'}>This number represents the maximum recorded {this.state.mode.toUpperCase()}</span>
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
          {this.state.rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">
              <div className={'l1'}></div>
                  {row.no}
              </TableCell>
              <TableCell align="left">
                    <div className={'l1 box'}>
                      <Link style={{color: this.state.colorDictionary[row.name]}} to={`/Network?name=${row.name}`}>
                       <img className={'provider-icon'} src={`/provider-icons/${row.name}.png`} />
                         {row.name}
                      </Link>
                    </div>
              </TableCell>
              <TableCell align="left">
                <div className={'l1'}>
                  {(this.state.instantTPSData[row.name] !== undefined)?this.format(this.state.instantTPSData[row.name][0].value):0}
                  </div>
              </TableCell>
              <TableCell align="left">
              <div className={'l1'}>
                {(this.state.maxData === undefined || this.state.maxData[row.name] === undefined)?0:this.format(this.state.maxData[row.name].value)}
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
    <p>
      Click on a network's name in the table above to visit a page showing more details about the project, including historical TPS and gas data.
    </p>
    </div>
        </>;
    }

    format(num){
       return (Math.round((num + Number.EPSILON) * 100) / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    createRow(x, i){
        return  { no: (i + 1) + ".", name: x.name, type: x.type };
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
        if (previousProps.maxData !== this.props.maxData){
          this.setState({maxData: this.props.maxData});
        }
        if (previousProps.mode !== this.props.mode){
          this.setState({mode: this.props.mode});
        }
      }
}    

export default ProviderTable;