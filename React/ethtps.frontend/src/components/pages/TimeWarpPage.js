import React, {setState} from 'react';
import HorizontalBarChart from '../HorizontalBarChart';
import { globalInstantDataService, formatModeName, capitalizeFirstLetter } from '../../services/common';
import { allInstantData, colorDictionary, providerData } from '../../services/defaultData';
import ModeSelector from './MainPage/ModeSelector';

export default class TimeWarpPage extends React.Component{
    constructor(props){
        super(props);

        let mode = 'tps';
        this.state = {
            data: allInstantData[mode],
            backgroundColors: [],
            colorDictionary: colorDictionary,
            providerData: providerData,
            mode: mode,
            offline: false
        }
    }

    componentDidMount(){
        globalInstantDataService.periodicallyGetInstantDataForPage('TimeWarpPage', this.updateInstantTPS.bind(this));
    }

    modeChanged(mode){
        this.setState({mode: mode});
        globalInstantDataService.getAndCallbackInstantData();
      }

    updateInstantTPS(data){
        try{
            this.setState({data: data[this.state.mode]});
          if (this.state.offline){
            this.setState({offline: false});
          }
        }
        catch (e){
          if (!this.state.offline){
            this.setState({offline: true});
          }
          console.log(e)
        }
      }

    componentDidUpdate(previousProps, previousState){
        if (previousProps.data !== this.props.data){
          this.setState({data: this.props.data})
        }
        if (previousProps.colorDictionary !== this.props.colorDictionary){
          this.setState({colorDictionary: this.props.colorDictionary});
        }
        if (previousProps.excludeSidechains !== this.props.excludeSidechains){
          this.setState({excludeSidechains: this.props.excludeSidechains});
        }
        if (previousProps.providerData !== this.props.providerData){
          this.setState({providerData: this.props.providerData});
        }
        if (previousProps.mode !== this.props.mode){
          this.setState({mode: this.props.mode});
        }
      }

    render(){
        return <>
            <div style={{display:'inline-block'}}>
                <h2 style={{display:'inline'}}>
                    {capitalizeFirstLetter(formatModeName(this.state.mode))} time warp
                </h2>
            </div>
            <ModeSelector defaultMode={this.state.mode} onChange={this.modeChanged.bind(this)}/>
            <HorizontalBarChart 
                data={this.state.data} 
                colorDictionary={this.state.colorDictionary} 
                providerData={this.state.providerData}
                mode={this.state.mode}/>
        </>;
    }
}