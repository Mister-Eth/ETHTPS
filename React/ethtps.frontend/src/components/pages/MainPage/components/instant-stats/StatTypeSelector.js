import * as React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default class StatTypeSelector extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            split: props.split
        }
    }

    onStatChanged = (event, newAlignment) => {
        if (newAlignment !== null){
            this.setState({split: newAlignment});
            if (this.props.onChange !== undefined){
                this.props.onChange(newAlignment);
            }
        }
    };

    render(){
        return <ToggleButtonGroup
        color="primary"
        value={this.state.split}
        exclusive
        onChange={this.onStatChanged}>
        <ToggleButton value="network">Group by network</ToggleButton>
        <ToggleButton value="networkType">Group by network type</ToggleButton>
    </ToggleButtonGroup>
    }
}