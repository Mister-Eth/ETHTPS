import * as React from 'react';
import IntervalSelector from './IntervalSelector';
import ScaleSelector from './ScaleSelector';

class TPSChart extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return <>
        <div>
            <IntervalSelector></IntervalSelector>
            <div>

            </div>
            <ScaleSelector></ScaleSelector>
        </div>
        </>;
    }
}    

export default TPSChart;