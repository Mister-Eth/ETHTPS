import React from "react";
import { addThousandsSeparators, formatModeName } from '../../../../../../services/common'

export default class TotalDataSummaryStat extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            mode: props.mode,
            data: props.data,
            providerData: props.providerData,
            smoothing: props.smoothing
        }
    }

    componentDidUpdate(previousProps, previousState){
        if (previousProps.data !== this.props.data){
            this.setState({data: this.props.data})
        }
        if (previousProps.mode !== this.props.mode){
            this.setState({mode: this.props.mode});
        }
        if (previousProps.providerData !== this.props.providerData){
            this.setState({providerData: this.props.providerData});
        } 
        if (previousProps.smoothing !== this.props.smoothing){
            this.setState({smoothing: this.props.smoothing});
        } 
      }

    calculateTotalData(state){
        if (state.data === undefined || state.data.length === 0)
            return 20;
        
        let t = state.providerData.filter(x=>state.data[x.name] !== undefined && state.data[x.name][0] !== null).map(x=>state.data[x.name][0].value);
        if (t.length === 0){
            return 0;
        }
        return t.reduce((a, b) => a + b);
    }

    render(){
        let titlePart = "Ethereum is doing ";
        if (this.state.smoothing !== "Instant"){
            titlePart = "Over the past " + this.state.smoothing.replace('One', '').toLowerCase() + ", Ethereum did an average of "
        }
        return <>
        <center>
            <h4 className={'tooltip'}>
                 {titlePart + addThousandsSeparators(this.calculateTotalData(this.state).toString())} {formatModeName(this.state.mode)}
                <span className={'tooltiptext'}>This includes L2s, sidechains (if the box at the bottom of this section is unchecked), ZK rollups, validiums etc.</span>
            </h4>
        </center>
        </>;
    }
}