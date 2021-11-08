import * as React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default class IntervalSelector extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            interval: '1d'
        }
    }

    handleIntervalChange = (event, newAlignment) => {
        if (newAlignment !== null){
            this.setState({interval: newAlignment});
            if (this.props.onChange !== undefined){
                this.props.onChange(newAlignment);
            }
        }
    };

    render(){
        return <ToggleButtonGroup
            color="primary"
            value={this.state.interval}
            exclusive
            onChange={this.handleIntervalChange}>
            <ToggleButton value="1h">1h</ToggleButton>
            <ToggleButton value="1d">1d</ToggleButton>
            <ToggleButton value="1w">1w</ToggleButton>
            <ToggleButton value="1m">1m</ToggleButton>
        </ToggleButtonGroup>
    }
}