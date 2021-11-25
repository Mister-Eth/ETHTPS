import * as React from 'react';
import { formatModeName, capitalizeFirstLetter } from '../../../../services/common';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import { TableSortLabel } from '@mui/material';

class ProviderTable extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            rows: props.providerData.map(this.createRow.bind(this)),
            data: props.data,
            providerData: props.providerData,
            allMaxData: props.allMaxData,
            mode: props.mode,
            colorDictionary: props.colorDictionary,
            allData: props.allData,
            sort:{
              asc: true,
              columnName: 'No'
            }
        }
    }

    sortTableBy(columnName){
      let state = this.state;
      if (columnName !== state.sort.columnName){
        state.sort.columnName = columnName;
        state.sort.asc = true;
      }
      else{
        state.sort.asc = !state.sort.asc;
      }
      this.setState(state);
      console.log(`${columnName} ${state.sort.asc}`);
    }

    render(){
      if (this.state.colorDictionary === undefined){
        return <></>
      }
        return <>
        <div>
        <TableContainer component={Paper} style={{overflowX:'auto'}}>
      <Table size={"small"} style={{minWidth: '750px'}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width={10} align="left">
            <TableSortLabel
                active={this.state.sort.columnName === 'No'}
                direction={(this.state.sort.asc?'asc':'desc')}
                onClick={()=>this.sortTableBy('No')}>
                <div className={'lh b'}>
                    No.
                </div>
            </TableSortLabel>
            </TableCell>
            <TableCell width={150} align="left">
            <TableSortLabel
                active={this.state.sort.columnName === 'Name'}
                direction={(this.state.sort.asc?'asc':'desc')}
                onClick={()=>this.sortTableBy('Name')}>
                <div className={'lh b'}>
                    Name
                </div>
            </TableSortLabel>
            </TableCell>
            <TableCell width={10} align="left">
            <TableSortLabel
                active={this.state.sort.columnName === 'Value'}
                direction={(this.state.sort.asc?'asc':'desc')}
                onClick={()=>this.sortTableBy('Value')}>
                <div className={'lh b'}>
                    {capitalizeFirstLetter(formatModeName(this.state.mode))}
                </div>
            </TableSortLabel>
            </TableCell>
            <TableCell width={80} align="left">
            <TableSortLabel
                active={this.state.sort.columnName === 'Max'}
                direction={(this.state.sort.asc?'asc':'desc')}
                onClick={()=>this.sortTableBy('Max')}>
                  <div className={'lh b'}>
                      Max recorded {formatModeName(this.state.mode)}
                  </div>
                  </TableSortLabel>
              </TableCell>
            {(this.state.mode === 'tps')?<> 
            <TableCell width={20} align="left">
            <TableSortLabel
                active={this.state.sort.columnName === 'TheoreticalMax'}
                direction={(this.state.sort.asc?'asc':'desc')}
                onClick={()=>this.sortTableBy('TheoreticalMax')}>
                <div className={'lh b'}>
                    Theoretical max TPS
                </div>
                </TableSortLabel>
            </TableCell>
            </>:<></>}
            <TableCell width={150} align="left">
            <TableSortLabel
                active={this.state.sort.columnName === 'Type'}
                direction={(this.state.sort.asc?'asc':'desc')}
                onClick={()=>this.sortTableBy('Type')}>
                <div className={'lh b'}>
                    Type
                </div>
                </TableSortLabel>
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
                      <Link style={{color: this.state.colorDictionary[row.name]}} to={`/Network/${row.name}`}>
                       <img className={'provider-icon'} src={`/provider-icons/${row.name}.png`} />
                         {row.name}
                      </Link>
                    </div>
              </TableCell>
              <TableCell align="left">
                <div className={'l1'}>
                  {(this.state.data[row.name] !== undefined)?this.format(this.state.data[row.name][0].value):0}
                  </div>
              </TableCell>
              <TableCell align="left">
              <div className={'l1'}>
                {(this.state.allMaxData[this.state.mode][row.name] !== undefined)?this.getMaxRow(this.state.allMaxData[this.state.mode][row.name].value, row.name):0}
              </div>
              </TableCell>
              {(this.state.mode === 'tps')?<>
                <TableCell align="left">
                  <div className={'l1'}>
                    {this.format(row.theoreticalMaxTPS)}
                  </div>
                </TableCell>
              </>:<></>}
        
              <TableCell align="left">
                <div className={((row.type == "Sidechain" || row.type === "Validium")?'l1':'l1 green')}>
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
    <p>
      {(this.state.mode !== 'tps')?'Some projects don\'t provide gas data. In this case, missing max data is estimated.':""}
    </p>
    </div>
        </>;
    }

    getMaxRow(value, name){
      if (value === 0 && this.state.mode === 'gps'){
        return <div className={'l1 tooltip'} style={{color:'#ff3300'}}>
          {this.format(this.state.allMaxData['tps'][name].value * 21000)}
          <span className={'tooltiptext'}>This number is estimated</span>
          </div>
      }
      else if (value === 0 && this.state.mode === 'gasAdjustedTPS'){
        return <div className={'l1 tooltip'} style={{color:'#ff3300'}}>
          {this.format(this.state.allMaxData['tps'][name].value)}
          <span className={'tooltiptext'}>This number is estimated</span>
          </div>
      }
      return this.format(value);
    }
    
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    format(num){
      
      if (num >= 1000) { //Don't show any decimals for numbers larger than 1,000; this improves readability
        return (Math.round((num + Number.EPSILON))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
      }
       return (Math.round((num + Number.EPSILON) * 100) / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    createRow(x, i){
        return  { no: (i + 1) + ".", name: x.name, type: x.type, theoreticalMaxTPS: x.theoreticalMaxTPS };
    }

    componentDidUpdate(previousProps, previousState){
        if (previousProps.providerData !== this.props.providerData){
            this.setState({providerData: this.props.providerData});
        }
        if (previousProps.data !== this.props.data){
            this.setState({data: this.props.data});
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
        if (previousProps.allMaxData !== this.props.allMaxData){
          this.setState({allMaxData: this.props.allMaxData});
        }
        if (previousProps.mode !== this.props.mode){
          this.setState({mode: this.props.mode});
        }
        if (previousProps.allData !== this.props.allData){
          this.setState({allData: this.props.allData});
        }
      }
}    

export default ProviderTable;