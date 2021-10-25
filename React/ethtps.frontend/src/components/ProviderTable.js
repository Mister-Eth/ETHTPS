import * as React from 'react';
import globalApi from '../services/common';
import { DataGrid } from '@mui/x-data-grid';

class ProviderTable extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            rows: []
        }
    }

    columns = [
        { field: 'providerName', headerName: 'Name', width: 130 },
        { field: 'type', headerName: 'Type', width: 130 },
        {
          field: 'tps',
          headerName: 'TPS',
          type: 'number',
          width: 130,
        }
      ];

    render(){
        return <>
        <h4>Overview</h4>
        <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={this.state.rows}
        columns={this.columns}
        ptpsSize={15}
        rowsPerPageOptions={[]}
        paging={false}
      />
    </div>
        </>;
    }

    createRow(x, i){
        return  { id: i, type: x.type, providerName: x.name, tps: 0 };
    }

    async componentDidMount(){
        let providers = await globalApi.getProviders();
        this.setState({rows: providers.map(this.createRow)});
     }
}    

export default ProviderTable;