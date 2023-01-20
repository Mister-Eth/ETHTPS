import gasIcon from '../../../assets/gas inv.png'
import numberIcon from '../../../assets/number_two_icon_178223.png';
import gasAdjustedIcon from '../../../assets/gas-adj.png';
import React from 'react';
import '../../../App.css';
import { formatModeName, capitalizeFirstLetter } from '../../../services/common'

export default class ModeSelector extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            mode: props.defaultMode,
            showGradient: true
        }
    }

    gpsSelected(){
        this.props.onChange('gps');
        this.setState({mode: 'gps'});
        this.hideGradient();
    }

    tpsSelected(){
        this.props.onChange('tps');
        this.setState({mode: 'tps'});
        this.hideGradient();
    }

    gasAdjustedSelected(){
        this.props.onChange('gasAdjustedTPS');
        this.setState({mode: 'gasAdjustedTPS'});
        this.hideGradient();
    }

    hideGradient(){
        if (this.state.showGradient){
            this.setState({showGradient: false})
        }
    }

    render(){
        let image = {};
        let para;
        let text = capitalizeFirstLetter(formatModeName(this.state.mode)) + ' mode';
        let style = {cursor:'pointer'};
        switch(this.state.mode){
            case 'tps':
                image = <img className={'small-img'} title={'Gas mode'} src={gasIcon} onClick={this.gpsSelected.bind(this)}/>;
                para = <p className={'inline'} style={style} onClick={this.gpsSelected.bind(this)}>{text}</p>;
                break;
            case 'gps':
                image = <img className={'small-img'} title={'Gas-adjusted TPS mode'} src={gasAdjustedIcon} onClick={this.gasAdjustedSelected.bind(this)}/>;
                para = <p className={'inline'} style={style} onClick={this.gasAdjustedSelected.bind(this)}>{text}</p>;
                break;
            case 'gasAdjustedTPS':
                image = <img className={'small-img'} title={'TPS mode'} src={numberIcon} onClick={this.tpsSelected.bind(this)}/>;
                para = <p className={'inline'} style={style} onClick={this.tpsSelected.bind(this)}>{text}</p>;
                break;
        }
        return <>
            <div style={style} className={'top-right box inline' + (this.state.showGradient?" gradient-border" : "")}>
                {image}
            </div>
        </>;
    }
}