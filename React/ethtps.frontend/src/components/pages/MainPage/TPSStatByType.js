import * as React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import TreemapInstantTPSStat from '../../TreemapInstantTPSStat';
import { BrowserView, MobileView } from 'react-device-detect';
import TPSStatTypeSelector from './TPSStatTypeSelector';
import InstantTPSStat from '../../InstantTPSStat';
import TypeTPSStat from '../../TypeTPSStat';
import TreemapTypeTPSStat from "../../TreemapTypeTPSStat";

export default class TPSStatByType extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            split: props.split,
            excludeSidechains: props.excludeSidechains,
            colorDictionary: props.colorDictionary,
            instantTPS: props.instantTPS,
            providerData: props.providerData,
            stat: 'network',
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
    }

    onStatChanged(stat){
        this.setState({stat: stat});
    }

    render(){
        let title = '';
        let stat = <></>;
        switch(this.state.stat){
            case 'network':
                title = 'Each section of the bar below represents the throughput of a network. Data gets updated automatically.';
                stat = <>
                <MobileView>
                    <InstantTPSStat
                        data={this.state.instantTPS} 
                        colorDictionary={this.state.colorDictionary} 
                        providerData={this.state.providerData}/>  
                </MobileView>
                <BrowserView>
                    <TreemapInstantTPSStat
                        data={this.state.instantTPS} 
                        colorDictionary={this.state.colorDictionary} 
                        providerData={this.state.providerData}/>  
                </BrowserView>
                </>
                break;
            case 'networkType':
                title = 'Each section of the bar below represents the throughput of a network type. Data gets updated automatically.';
                stat = <>
                <MobileView>
                    <TypeTPSStat
                        data={this.state.instantTPS} 
                        colorDictionary={this.state.providerTypeColorDictionary} 
                        providerData={this.state.providerData}/>  
                </MobileView>
                <BrowserView>
                    <TreemapTypeTPSStat
                        data={this.state.instantTPS} 
                        colorDictionary={this.state.providerTypeColorDictionary} 
                        providerData={this.state.providerData}/>  
                </BrowserView>
                </>
                break;
            case 'gasAdjustedTPS':

                break;
        }
        return <>
        <p>
            {title}
        </p>
        {stat}
      <p>
        Show:
      </p>
            <TPSStatTypeSelector onChange={this.onStatChanged.bind(this)} split={this.state.split}/>
        </>
    }
}