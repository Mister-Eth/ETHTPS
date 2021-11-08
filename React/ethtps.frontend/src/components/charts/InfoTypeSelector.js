import * as React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { render } from "@testing-library/react";

export default class InfoTypeSelector extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {
            infoType: 'tps'
        }
    }

    handleInfoTypeChange = (event, newAlignment) => {
        if (newAlignment !== null){
            this.setState({infoType: newAlignment})
            if (this.props.onChange !== undefined){
                this.props.onChange(newAlignment);
            }
        }
    };

    render(){
        return <ToggleButtonGroup
            color="primary"
            value={this.state.infoType}
            exclusive
            onChange={this.handleInfoTypeChange}>
            <ToggleButton value="tps">tps</ToggleButton>
            <ToggleButton value="gps">gps</ToggleButton>
        </ToggleButtonGroup>
    }
}