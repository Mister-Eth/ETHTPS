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
              asc: false,
              columnName: (props.mode === 'tps')?'theoreticalMaxTPS':'max',
              isMaxTheoreticalSelected: true
            }
        }
    }

    dynamicSort(property) {
      var sortOrder = (this.state.sort.asc?1:-1);
      if (this.state.mode !== 'tps' && this.state.sort.columnName === 'theoreticalMaxTPS'){
        this.state.sort.columnName = "max";
      }
      else if (this.state.mode === 'tps' && this.state.sort.isMaxTheoreticalSelected){
        this.state.sort.columnName = "theoreticalMaxTPS";
      }
      switch(property){
        case 'max':
          return function (a,b) {
            //this.state.allMaxData[this.state.mode][row.name].value
            let x = this.state.allMaxData[this.state.mode][a.name].value;
            let y = this.state.allMaxData[this.state.mode][b.name].value;
            var result = (x < y) ? -1 : (x > y) ? 1 : 0;
            return result * sortOrder;
        }
        case 'value':
          return function (a,b) {
            let x = this.state.data[a.name][0].value;
            let y = this.state.data[b.name][0].value;
            var result = (x < y) ? -1 : (x > y) ? 1 : 0;
            return result * sortOrder;
        }
        case 'no':
          return function (a,b) {
            var result = (parseInt(a[property]) < parseInt(b[property])) ? -1 : (parseInt(a[property]) > parseInt(b[property])) ? 1 : 0;
            return result * sortOrder;
        }
        default:
          return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
      }
  }

    sortTableBy(columnName, noSwitch = false){
      let state = this.state;
      state.sort.isMaxTheoreticalSelected = columnName === 'theoreticalMaxTPS';
      if (columnName !== state.sort.columnName){
        state.sort.columnName = columnName;
      }
      else if (!noSwitch){
        state.sort.asc = !state.sort.asc;
      }
      this.setState(state);
    }

    render(){
      if (this.state.colorDictionary === undefined){
        return <></>
      }
      
        return <>
        <div>
        <TableContainer component={Paper} style={{overflowX:'auto'}}>
      <Table size={"small"} style={{minWidth: '800px'}} aria-label="simple table">
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
            <TableCell width={10} align="left">
            <TableSortLabel
                active={this.state.sort.columnName === 'value'}
                direction={(this.state.sort.asc?'asc':'desc')}
                onClick={()=>this.sortTableBy('value')}>
                <div className={'lh b'}>
                    {capitalizeFirstLetter(formatModeName(this.state.mode))}
                </div>
            </TableSortLabel>
            </TableCell>
            <TableCell width={80} align="left">
            <TableSortLabel
                active={this.state.sort.columnName === 'max'}
                direction={(this.state.sort.asc?'asc':'desc')}
                onClick={()=>this.sortTableBy('max')}>
                  <div className={'lh b'}>
                      Max recorded {formatModeName(this.state.mode)}
                  </div>
                  </TableSortLabel>
              </TableCell>
            {(this.state.mode === 'tps')?<> 
            <TableCell width={20} align="left">
            <TableSortLabel
                active={this.state.sort.columnName === 'theoreticalMaxTPS'}
                direction={(this.state.sort.asc?'asc':'desc')}
                onClick={()=>this.sortTableBy('theoreticalMaxTPS')}>
                <div className={'lh b'}>
                    Theoretical max TPS
                </div>
                </TableSortLabel>
            </TableCell>
            </>:<></>}
            <TableCell width={150} align="left">
            <TableSortLabel
                active={this.state.sort.columnName === 'type'}
                direction={(this.state.sort.asc?'asc':'desc')}
                onClick={()=>this.sortTableBy('type')}>
                <div className={'lh b'}>
                    Type
                </div>
                </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.rows.sort(this.dynamicSort(this.state.sort.columnName).bind(this)).map((row, i) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">
              <div className={'l1'}></div>
                  {i + 1}
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
        return  { 
            no: (i + 1) + ".", 
            name: x.name, 
            type: x.type, 
            theoreticalMaxTPS: x.theoreticalMaxTPS,
            value: 0,
            max: 0
          };
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