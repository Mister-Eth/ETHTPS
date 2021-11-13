import gasIcon from '../assets/gas.png'
import numberIcon from '../assets/number_two_icon_178223.png';
import React from 'react';
import '../App.css';

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

    render(){
        let image = {};
        switch(this.state.mode){
            case 'tps':
                image = <img className={'small-img top-right'} title={'Gas mode'} src={gasIcon} onClick={this.gpsSelected.bind(this)}/>;
                break;
            default:
                image = <img className={'small-img top-right'} title={'TPS mode'} src={numberIcon} onClick={this.valueSelected.bind(this)}/>;
                break;
        }
        return <>
            {image}
        </>;
    }
}