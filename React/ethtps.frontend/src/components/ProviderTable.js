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
            rows: []
        }
    }

    render(){
        return <>
        <h3>Projects</h3>
        <div style={{ width: '100%' }}>
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
          {this.state.rows.filter(x => x.included).map((row) => (
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
                        <a href={`/${row.name}`}>
                            <img className={'provider-icon'} src={`/provider-icons/${row.name}.png`} />
                            {row.name}
                        </a>
                    </div>
              </TableCell>
              <TableCell align="left">
                <div className={'l1'}>
                  {(row.tps == 0)?
                    <div className={"tooltip red"}>0
                        <span className={"tooltiptext"}>This network is currently doing less than 0.01 TPS</span>
                    </div>
                  :row.tps}
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

    createRow(x, i){
        return  { no: (i + 1) + ".", name: x.name, type: x.type, tps: 0, maxTPS: 0, included: true };
    }

    
    getTPS(data, provider) {
        for(let tpsEntry of data){
            if (tpsEntry.provider === provider){
                return tpsEntry.tps;
            }
        }
        return 0;
    }

    to2DecimalPlaces(number){
        let value = Math.round(number * 100) / 100;
        value = value.toString();
        value = value.substr(0, value.indexOf('.') + 3);
        return value;
    }

    updateTable(x){
        let rows = this.state.rows;
        for(let row of rows) {
            row.tps = this.to2DecimalPlaces(this.getTPS(x, row.name));
        }
        this.setState({rows: rows});
    }

    onProviderExcluded(provider){
        let rows = this.state.rows;
        for(let row of rows) {
            if (row.name == provider){
                row.included = false;
            }
        }
        this.setState({rows: rows});
    }

    onProviderIncluded(provider){
        let rows = this.state.rows;
        for(let row of rows) {
            if (row.name == provider){
                row.included = true;
            }
        }
        this.setState({rows: rows});
    }

    async updateMaxTPS(){
        let maxTPS = await globalApi.getMaxTPS("All");
        let rows = this.state.rows;
        for(let row of rows) {
            let tps = 0;
            let entries = maxTPS.filter(x => x.provider == row.name);
            if (entries != null && entries.length > 0){
                tps = entries[0].tps;
            }
            row.maxTPS = this.to2DecimalPlaces(tps);
        }
        this.setState({rows: rows});
    }

    async componentDidMount(){
        let providers = await globalApi.getProviders();
        this.setState({rows: providers.map(this.createRow)});

        liveTPSObservable.registerOnTPSChanged(this.updateTable.bind(this));
        providerExclusionList.registerOnProviderExcluded(this.onProviderExcluded.bind(this));
        providerExclusionList.registerOnProviderIncluded(this.onProviderIncluded.bind(this));
        await this.updateMaxTPS();
     }
}    

export default ProviderTable;