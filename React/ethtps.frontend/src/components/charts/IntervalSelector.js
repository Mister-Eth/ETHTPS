import * as React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default class IntervalSelector extends React.Component{
    constructor(props){
        super(props);
        
        let allIntervals = ['1h', '1d', '1w', '1m', '1y', 'All']
        if (props.allIntervals !== null){
            allIntervals = props.allIntervals;
        }
        this.state = {
            interval: props.interval,
            allIntervals: allIntervals
        }
    }

    componentDidUpdate(previousProps, previousState){
        if (previousProps.allIntervals !== this.props.allIntervals){
            this.setState({allIntervals: this.props.allIntervals});
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
            {this.state.allIntervals.map(x => <ToggleButton value={x}>{x}</ToggleButton>)}
        </ToggleButtonGroup>
    }
}