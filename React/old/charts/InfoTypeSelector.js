import * as React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { render } from "@testing-library/react";

export default class InfoTypeSelector extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {
            mode: props.mode
        }
    }

    handleInfoTypeChange = (event, newAlignment) => {
        if (newAlignment !== null){
            this.setState({mode: newAlignment})
            if (this.props.onChange !== undefined){
                this.props.onChange(newAlignment);
            }
        }
    };

    componentDidUpdate(previousProps, previousState){
        if (previousProps.mode !== this.props.mode){     
            this.setState({mode: this.props.mode});
        }
    }

    render(){
        return <ToggleButtonGroup
            color="primary"
            value={this.state.mode}
            exclusive
            onChange={this.handleInfoTypeChange}>
            <ToggleButton value="tps">tps</ToggleButton>
            <ToggleButton value="gps">gps</ToggleButton>
            <ToggleButton value="gasAdjustedTPS">GTPS</ToggleButton>
        </ToggleButtonGroup>
    }
}