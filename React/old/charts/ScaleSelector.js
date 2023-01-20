import * as React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default class ScaleSelector extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            scale: props.scale
        }
    }

    handleScaleChange = (event, newAlignment) => {
        if (newAlignment !== null){
            this.setState({scale: newAlignment});
            if (this.props.onChange !== undefined){
                this.props.onChange(newAlignment);
            }
        }
    };

    render(){
        return <ToggleButtonGroup
            color="primary"
            value={this.state.scale}
            exclusive
            onChange={this.handleScaleChange}>
            <ToggleButton value="log">log</ToggleButton>
            <ToggleButton value="lin">lin</ToggleButton>
        </ToggleButtonGroup>
    }
}