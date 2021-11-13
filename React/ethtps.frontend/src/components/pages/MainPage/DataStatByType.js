import * as React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TreemapInstantDataStat from '../../TreemapInstantDataStat';
import { BrowserView, MobileView } from 'react-device-detect';
import StatTypeSelector from './StatTypeSelector';
import InstantDataStat from '../../InstantDataStat';
import TypeDataStat from '../../TypeDataStat';
import TreemapTypeDataStat from "../../TreemapTypeDataStat";
import TotalDataSummaryStat from "../../TotalDataSummaryStat";

export default class DataStatByType extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            split: props.split,
            excludeSidechains: props.excludeSidechains,
            colorDictionary: props.colorDictionary,
            instantTPS: props.instantTPS,
            providerData: props.providerData,
            stat: 'network',
            mode: props.mode,
            providerTypeColorDictionary: props.providerTypeColorDictionary
        }
    }

    componentDidUpdate(previousProps, previousState){
        if (previousProps.split !== this.props.split){      
            this.setState({split: this.props.split})
        }
        if (previousProps.excludeSidechains !== this.props.excludeSidechains){      
            this.setState({excludeSidechains: this.props.excludeSidechains})
        }
        if (previousProps.colorDictionary !== this.props.colorDictionary){      
            this.setState({colorDictionary: this.props.colorDictionary})
        }
        if (previousProps.instantTPS !== this.props.instantTPS){      
            this.setState({instantTPS: this.props.instantTPS})
        }
        if (previousProps.providerData !== this.props.providerData){      
            this.setState({providerData: this.props.providerData})
        }
        if (previousProps.providerTypeColorDictionary !== this.props.providerTypeColorDictionary){      
            this.setState({providerTypeColorDictionary: this.props.providerTypeColorDictionary})
        }
        if (previousProps.mode !== this.props.mode){
            this.setState({mode: this.props.mode});
        }
    }

    onStatChanged(stat){
        this.setState({stat: stat});
    }

    render(){
        let title = '';
        let stat = <></>;
        switch(this.state.stat){
            case 'network':
                title = 'Each section of the chart below represents the throughput of a network. Data gets updated automatically.';
                stat = <>
                <BrowserView>
                    <InstantDataStat
                        data={this.state.instantTPS} 
                        colorDictionary={this.state.colorDictionary} 
                        mode={this.state.mode}
                        providerData={this.state.providerData}/>  
                </BrowserView>
                <BrowserView>
                    <TreemapInstantDataStat
                        data={this.state.instantTPS} 
                        colorDictionary={this.state.colorDictionary} 
                        mode={this.state.mode}
                        providerData={this.state.providerData}/>  
                </BrowserView>
                </>
                break;
            case 'networkType':
                title = 'Each section of the chart below represents the total throughput of all networks of a certain type. Data gets updated automatically.';
                stat = <>
                <BrowserView>
                    <TypeDataStat
                        data={this.state.instantTPS} 
                        colorDictionary={this.state.providerTypeColorDictionary} 
                        mode={this.state.mode}
                        providerData={this.state.providerData}/>  
                </BrowserView>
                <BrowserView>
                    <TreemapTypeDataStat
                        data={this.state.instantTPS} 
                        colorDictionary={this.state.providerTypeColorDictionary} 
                        mode={this.state.mode}
                        providerData={this.state.providerData}/>  
                </BrowserView>
                </>
                break;
            case 'gasAdjustedTPS':
                title = "Each section of the chart below represents the gas-adjusted throughput of a network. This value is calculated by dividing the total gas used by the network at any time by 21,000 gas (the gas cost of a simple ETH transfer). In other words, each section represents the theoretical number of transactions per second a network were to do if all transactions were simple ETH transfers. Data gets updated automatically.";
                break;
        }
        return <>
        <TotalDataSummaryStat
             providerData={this.state.providerData}
             mode={this.state.mode}
             data={this.state.instantTPS}/>
        <p>
            Click one of the buttons below to change the chart type
        </p>
        <StatTypeSelector onChange={this.onStatChanged.bind(this)} split={this.state.split}/>
        <p>
            {title}
        </p>
        {stat}
        </>
    }
}