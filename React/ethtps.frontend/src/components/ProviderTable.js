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

    createData(name, calories, fat, carbs, protein) {
        return { name, calories, fat, carbs, protein };
      }

    render(){
        return <>
        <h3>Projects</h3>
        <div style={{ height: 400, width: '100%' }}>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 300 }} size={"small"} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell width={10} align="left">No. </TableCell>
            <TableCell width={150} align="left">Name</TableCell>
            <TableCell width={10} align="left">TPS</TableCell>
            <TableCell width={150} align="left">Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.no}</TableCell>
              <TableCell align="left">
                    <a href={`/${row.name}`}>
                        <img className={'provider-icon'} src={`/provider-icons/${row.name}.png`} />
                        {row.name}
                    </a>
              </TableCell>
              <TableCell align="left">{row.tps}</TableCell>
              <TableCell align="left">{row.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
        </>;
    }

    createRow(x, i){
        return  { no: (i + 1) + ".", name: x.name, type: x.type, tps: 0 };
    }

    
    getTPS(data, provider) {
        for(let tpsEntry of data){
            if (tpsEntry.provider === provider){
                return tpsEntry.tps;
            }
        }
        return 0;
    }

    updateChart(x){
        let rows = this.state.rows;
        for(let row of rows) {
            let tps = Math.round(this.getTPS(x, row.name) * 100) / 100;
            tps = tps.toString();
            tps = tps.substr(0, tps.indexOf('.') + 3);
            row.tps = tps;
        }
        this.setState({rows: rows});
    }

    async componentDidMount(){
        let providers = await globalApi.getProviders();
        this.setState({rows: providers.map(this.createRow)});

        liveTPSObservable.registerOnTPSChanged(this.updateChart.bind(this));
     }
}    

export default ProviderTable;