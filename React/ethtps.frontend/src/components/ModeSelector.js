import gasIcon from '../assets/gas.png'
import numberIcon from '../assets/number_two_icon_178223.png';
import gasAdjustedIcon from '../assets/gas-adj.png';
import React from 'react';
import '../App.css';
import { formatModeName } from '../services/common'

export default class ModeSelector extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            mode: props.defaultMode
        }
    }

    gpsSelected(){
        this.props.onChange('gps');
        this.setState({mode: 'gps'});
    }

    tpsSelected(){
        this.props.onChange('tps');
        this.setState({mode: 'tps'});
    }

    gasAdjustedSelected(){
        this.props.onChange('gasAdjustedTPS');
        this.setState({mode: 'gasAdjustedTPS'});
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    render(){
        let image = {};
        switch(this.state.mode){
            case 'tps':
                image = <img className={'small-img'} title={'Gas mode'} src={gasIcon} onClick={this.gpsSelected.bind(this)}/>;
                break;
            case 'gps':
                image = <img className={'small-img'} title={'Gas-adjusted TPS mode'} src={gasAdjustedIcon} onClick={this.gasAdjustedSelected.bind(this)}/>;
                break;
            case 'gasAdjustedTPS':
                image = <img className={'small-img'} title={'TPS mode'} src={numberIcon} onClick={this.tpsSelected.bind(this)}/>;
                break;
        }
        return <>
            <div className={'top-right box'} style={{backgroundColor:'#f1f2f2'}}>
                <p className={'inline'}>{this.capitalizeFirstLetter(formatModeName(this.state.mode)) + ' mode'}</p>
                {image}
            </div>
        </>;
    }
}