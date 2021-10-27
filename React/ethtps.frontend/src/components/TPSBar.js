import * as React from 'react';
import { globalApi, providerExclusionList, liveTPSObservable } from '../services/common';
//import 'chartjs-gauge';
import { Chart } from 'react-chartjs-2';

class TPSBar extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            includeSidechains: true
          };
    }

    render(){
        return <>
            TPS bar here
        </>
    }

}
export default TPSBar;