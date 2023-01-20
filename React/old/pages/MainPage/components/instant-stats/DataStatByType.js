import * as React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TreemapInstantDataStat from './treemaps/TreemapInstantDataStat';
import { BrowserView, MobileView } from 'react-device-detect';
import StatTypeSelector from './StatTypeSelector';
import InstantDataStat from './bar/InstantDataStat'
import TypeDataStat from './bar/TypeDataStat';
import TreemapTypeDataStat from "./treemaps/TreemapTypeDataStat";
import TotalDataSummaryStat from "./bar/TotalDataSummaryStat";

export default class DataStatByType extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            split: props.split,
            excludeSidechains: props.excludeSidechains,
            colorDictionary: props.colorDictionary,
            data: props.data,
            providerData: props.providerData,
            stat: 'network',
            mode: props.mode,
            providerTypeColorDictionary: props.providerTypeColorDictionary,
            allData: props.allData,
            smoothing: props.smoothing
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
        if (previousProps.data !== this.props.data){      
            this.setState({data: this.props.data})
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
        if (previousProps.allData !== this.props.allData){
           this.setState({allData: this.props.allData});
        }
        if (previousProps.smoothing !== this.props.smoothing){
           this.setState({smoothing: this.props.smoothing});
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
                <MobileView>
                    <InstantDataStat
                        data={this.state.data} 
                        colorDictionary={this.state.colorDictionary} 
                        mode={this.state.mode}
                        providerData={this.state.providerData}/>  
                </MobileView>
                <BrowserView>
                    <TreemapInstantDataStat
                        data={this.state.data} 
                        colorDictionary={this.state.colorDictionary} 
                        mode={this.state.mode}
                        providerData={this.state.providerData}/>  
                </BrowserView>
                </>
                break;
            case 'networkType':
                title = 'Each section of the chart below represents the total throughput of all networks of a certain type. Data gets updated automatically.';
                stat = <>
                <MobileView>
                    <TypeDataStat
                        data={this.state.data} 
                        colorDictionary={this.state.providerTypeColorDictionary} 
                        mode={this.state.mode}
                        providerData={this.state.providerData}/>  
                </MobileView>
                <BrowserView>
                    <TreemapTypeDataStat
                        data={this.state.data} 
                        colorDictionary={this.state.providerTypeColorDictionary} 
                        mode={this.state.mode}
                        providerData={this.state.providerData}/>  
                </BrowserView>
                </>
                break;
        }
        return <>
        <TotalDataSummaryStat
             smoothing={this.state.smoothing}
             providerData={this.state.providerData}
             mode={this.state.mode}
             data={this.state.data}/>
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