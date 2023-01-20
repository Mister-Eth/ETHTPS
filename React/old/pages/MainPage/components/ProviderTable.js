import * as React from 'react';
import { formatModeName, capitalizeFirstLetter, formatSmoothingName } from '../../../../services/common';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import { TableSortLabel } from '@mui/material';
import SortableTable from './SortableTable';

class ProviderTable extends SortableTable {
  constructor(props) {
    super(props);

    this.state = {
      rows: props.providerData.map(this.createRow.bind(this)),
      data: props.data,
      providerData: props.providerData,
      allMaxData: props.allMaxData,
      mode: props.mode,
      colorDictionary: props.colorDictionary,
      allData: props.allData,
      sort: {
        asc: false,
        columnName: 'max',
        isMaxTheoreticalSelected: false
      },
      smoothing: props.smoothing
    }
  }

  dynamicSort(property) {
    var sortOrder = (this.state.sort.asc ? 1 : -1);
    if (this.state.mode !== 'tps' && this.state.sort.columnName === 'theoreticalMaxTPS') {
      this.state.sort.columnName = "max";
    }
    else if (this.state.mode === 'tps' && this.state.sort.isMaxTheoreticalSelected) {
      this.state.sort.columnName = "theoreticalMaxTPS";
    }
    switch (property) {
      case 'max':
        return function (a, b) {
          //this.state.allMaxData[this.state.mode][row.name].value
          let x = 0;
          if (this.state.allMaxData[this.state.mode][a.name] !== undefined) {
            x = this.state.allMaxData[this.state.mode][a.name].value;
          }
          let y = 0;
          if (this.state.allMaxData[this.state.mode][b.name] !== undefined) {
            y = this.state.allMaxData[this.state.mode][b.name].value;
          }
          var result = (x < y) ? -1 : (x > y) ? 1 : 0;
          return result * sortOrder;
        }
      case 'value':
        return function (a, b) {
          let x = 0;
          if (this.state.data[a.name] !== undefined && this.state.data[a.name][0] !== null) {
            x = this.state.data[a.name][0].value;
          }
          let y = 0;
          if (this.state.data[b.name] !== undefined && this.state.data[b.name][0] !== null) {
            y = this.state.data[b.name][0].value;
          }
          var result = (x < y) ? -1 : (x > y) ? 1 : 0;
          return result * sortOrder;
        }
      case 'no':
        return function (a, b) {
          var result = (parseInt(a[property]) < parseInt(b[property])) ? -1 : (parseInt(a[property]) > parseInt(b[property])) ? 1 : 0;
          return result * sortOrder;
        }
      case 'name':
        return function (a, b) {
          var result = (a[property].toUpperCase() < b[property].toUpperCase()) ? -1 : (a[property].toUpperCase() > b[property].toUpperCase()) ? 1 : 0;
          return result * sortOrder;
        }
      default:
        return function (a, b) {
          var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
          return result * sortOrder;
        }
    }
  }

  sortTableBy(columnName, noSwitch = false) {
    let state = this.state;
    state.sort.isMaxTheoreticalSelected = columnName === 'theoreticalMaxTPS';
    if (columnName !== state.sort.columnName) {
      state.sort.columnName = columnName;
    }
    else if (!noSwitch) {
      state.sort.asc = !state.sort.asc;
    }
    this.setState(state);
  }

  noDataFilter = function (x) {
    return this.state.data[x.name] !== undefined && this.state.data[x.name][0] !== null && (this.state.allMaxData[this.state.mode][x.name] !== undefined);
  }

  render() {
    if (this.state.colorDictionary === undefined || this.state.data === undefined) {
      return <></>
    }
    let noDataProviders = this.state.rows.filter(x => !this.noDataFilter(x)).sort(this.dynamicSort(this.state.sort.columnName).bind(this));
    let noDataRows = <></>;
    if (noDataProviders.length > 0) {
      noDataRows = <>
        <TableRow>
          <TableCell align="left">

          </TableCell>
          <TableCell align="left">
            <div className={'l1 b'}>
              Coming soon
            </div>
          </TableCell>
          <TableCell align="left">

          </TableCell>
          <TableCell align="left">

          </TableCell>
          <TableCell align="left">

          </TableCell>
        </TableRow>
        {noDataProviders.map((row, i) => <TableRow>
          <TableCell align="left">
            {this.state.rows.length - noDataProviders.length + i + 1}
          </TableCell>
          <TableCell align="left">
            <div className={'l1 box'}>
              <Link style={{ color: this.state.colorDictionary[row.name] }} to={`/Network/${row.name}`}>
                <img className={'provider-icon'} src={`/provider-icons/${row.name}.png`} />
                {row.name}
              </Link>
            </div>
          </TableCell>
          <TableCell align="left">

          </TableCell>
          <TableCell align="left">

          </TableCell>
          <TableCell align="left">
            <div className={(!(row.type == "Mainnet" || row.type === "Optimistic rollup" || row.type === "ZK rollup") ? 'l1' : 'l1 green')}>
              {row.type}
            </div>
          </TableCell>
        </TableRow>)}
      </>
    }
    let tableBody = <></>
    if (this.state.data !== undefined) {
      tableBody = <TableBody>
        {this.state.rows.filter(this.noDataFilter.bind(this)).sort(this.dynamicSort(this.state.sort.columnName).bind(this)).map((row, i) => (
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
                <Link style={{ color: this.state.colorDictionary[row.name] }} to={`/Network/${row.name}`}>
                  <img className={'provider-icon'} src={`/provider-icons/${row.name}.png`} />
                  {row.name}
                </Link>
              </div>
            </TableCell>
            <TableCell align="left">
              <div className={'l1'}>
                {this.format(this.state.data[row.name][0].value)}
              </div>
            </TableCell>
            <TableCell align="left">
              <div className={'l1'}>
                {this.getMaxRow(this.state.allMaxData[this.state.mode][row.name].value, row.name)}
              </div>
            </TableCell>
            <TableCell align="left">
              <div className={(!(row.type == "Mainnet" || row.type === "Optimistic rollup" || row.type === "ZK rollup") ? 'l1' : 'l1 green')}>
                {row.type}
              </div>
            </TableCell>
          </TableRow>
        ))}
        {noDataRows}
      </TableBody>;
    }
    return <>
      <div>
        <TableContainer component={Paper} style={{ overflowX: 'auto' }}>
          <Table size={"small"} style={{ minWidth: '800px' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell width={10} align="left">
                  <TableSortLabel
                    active={this.state.sort.columnName === 'no'}
                    direction={(this.state.sort.asc ? 'asc' : 'desc')}
                    onClick={() => this.sortTableBy('no')}>
                    <div className={'lh b'}>
                      No.
                    </div>
                  </TableSortLabel>
                </TableCell>
                <TableCell width={150} align="left">
                  <TableSortLabel
                    active={this.state.sort.columnName === 'name'}
                    direction={(this.state.sort.asc ? 'asc' : 'desc')}
                    onClick={() => this.sortTableBy('name')}>
                    <div className={'lh b'}>
                      Name
                    </div>
                  </TableSortLabel>
                </TableCell>
                <TableCell width={10} align="left">
                  <TableSortLabel
                    active={this.state.sort.columnName === 'value'}
                    direction={(this.state.sort.asc ? 'asc' : 'desc')}
                    onClick={() => this.sortTableBy('value')}>
                    <div className={'lh b'}>
                      {(this.state.smoothing !== "Instant") ?
                        "Average " + formatSmoothingName(this.state.smoothing) + " " + capitalizeFirstLetter(formatModeName(this.state.mode))
                        : capitalizeFirstLetter(formatModeName(this.state.mode))}
                    </div>
                  </TableSortLabel>
                </TableCell>
                <TableCell width={80} align="left">
                  <TableSortLabel
                    active={this.state.sort.columnName === 'max'}
                    direction={(this.state.sort.asc ? 'asc' : 'desc')}
                    onClick={() => this.sortTableBy('max')}>
                    <div className={'lh b'}>
                      Max recorded {formatModeName(this.state.mode)}
                    </div>
                  </TableSortLabel>
                </TableCell>
                <TableCell width={150} align="left">
                  <TableSortLabel
                    active={this.state.sort.columnName === 'type'}
                    direction={(this.state.sort.asc ? 'asc' : 'desc')}
                    onClick={() => this.sortTableBy('type')}>
                    <div className={'lh b'}>
                      Type
                    </div>
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            {tableBody}
          </Table>
        </TableContainer>
        <p>
          Click on a network's name in the table above to visit a page showing more details about the project, including historical TPS and gas data.
        </p>
        <p>
          {(this.state.mode !== 'tps') ? 'Some projects don\'t provide gas data. In this case, missing max data is estimated.' : ""}
        </p>
      </div>
    </>;
  }

  getMaxRow(value, name) {
    if (value === 0 && this.state.mode === 'gps') {
      return <div className={'l1 tooltip'} style={{ color: '#ff3300' }}>
        {this.format(this.state.allMaxData['tps'][name].value * 21000)}
        <span className={'tooltiptext'}>This number is estimated</span>
      </div>
    }
    else if (value === 0 && this.state.mode === 'gasAdjustedTPS') {
      return <div className={'l1 tooltip'} style={{ color: '#ff3300' }}>
        {this.format(this.state.allMaxData['tps'][name].value)}
        <span className={'tooltiptext'}>This number is estimated</span>
      </div>
    }
    let blockNo = this.state.allMaxData['tps'][name].blockNumber;
    if (blockNo !== undefined) {
      let text = "Seen  " + this.state.allMaxData['tps'][name].date;
      if (blockNo > 0){
        text = "Seen at block " + this.state.allMaxData['tps'][name].blockNumber;
      }
      return <>
        <div className={'l1 tooltip'} style={{ color: '#003300' }}>
          {this.format(value)}
          <span className={'tooltiptext'}>{text}</span>
        </div>
      </>;
    }
    return this.format(value);
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  format(num) {

    if (num >= 1000) { //Don't show any decimals for numbers larger than 1,000; this improves readability
      return (Math.round((num + Number.EPSILON))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return (Math.round((num + Number.EPSILON) * 100) / 100).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  createRow(x, i) {
    return {
      no: (i + 1) + ".",
      name: x.name,
      type: x.type,
      theoreticalMaxTPS: x.theoreticalMaxTPS,
      value: 0,
      max: 0
    };
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.providerData !== this.props.providerData) {
      this.setState({ providerData: this.props.providerData });
    }
    if (previousProps.data !== this.props.data && this.props.data !== undefined && Object.keys(this.props.data).length > 0) {
      this.setState({ data: this.props.data });
    }
    if (previousProps.providerData !== this.props.providerData) {
      this.setState({ rows: this.props.providerData.map(this.createRow.bind(this)) });
    }
    if (previousProps.colorDictionary !== this.props.colorDictionary) {
      this.setState({ colorDictionary: this.props.colorDictionary });
    }
    if (previousProps.excludeSidechains !== this.props.excludeSidechains) {
      this.setState({ excludeSidechains: this.props.excludeSidechains });
    }
    if (previousProps.allMaxData !== this.props.allMaxData) {
      this.setState({ allMaxData: this.props.allMaxData });
    }
    if (previousProps.mode !== this.props.mode) {
      this.setState({ mode: this.props.mode });
    }
    if (previousProps.allData !== this.props.allData) {
      this.setState({ allData: this.props.allData });
    }
    if (previousProps.smoothing !== this.props.smoothing) {
      this.setState({ smoothing: this.props.smoothing });
    }
  }
}

export default ProviderTable;