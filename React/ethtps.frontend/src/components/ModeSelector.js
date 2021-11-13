import gasIcon from '../assets/gas.png'
import numberIcon from '../assets/number_two_icon_178223.png';
import gasAdjustedIcon from '../assets/gas-adj.png';
import React from 'react';
import '../App.css';
import { formatModeName, capitalizeFirstLetter } from '../services/common'

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

    

    render(){
        let image = {};
        let para;
        let text = capitalizeFirstLetter(formatModeName(this.state.mode)) + ' mode';
        switch(this.state.mode){
            case 'tps':
                image = <img className={'small-img'} title={'Gas mode'} src={gasIcon} onClick={this.gpsSelected.bind(this)}/>;
                para = <p className={'inline'} style={{cursor:'pointer'}} onClick={this.gpsSelected.bind(this)}>{text}</p>;
                break;
            case 'gps':
                image = <img className={'small-img'} title={'Gas-adjusted TPS mode'} src={gasAdjustedIcon} onClick={this.gasAdjustedSelected.bind(this)}/>;
                para = <p className={'inline'} style={{cursor:'pointer'}} onClick={this.gasAdjustedSelected.bind(this)}>{text}</p>;
                break;
            case 'gasAdjustedTPS':
                image = <img className={'small-img'} title={'TPS mode'} src={numberIcon} onClick={this.tpsSelected.bind(this)}/>;
                para = <p className={'inline'} style={{cursor:'pointer'}} onClick={this.tpsSelected.bind(this)}>{text}</p>;
                break;
        }
        return <>
            <div className={'top-right box inline'} style={{backgroundColor:'#f1f2f2'}}>
               
                {image}
            </div>
        </>;
    }
}