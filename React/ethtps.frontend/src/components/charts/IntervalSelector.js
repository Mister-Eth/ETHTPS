import * as React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default class IntervalSelector extends React.Component{
    constructor(props){
        super(props);
        
        let allIntervals = ['1h', '1d', '1w', '1m', '1y', 'All']
        if (props.allIntervals === null || props.allIntervals === undefined){
            allIntervals = props.allIntervals;
        }
        this.state = {
            interval: props.interval,
            allIntervals: allIntervals,
            years: props.years
        }
    }

    componentDidUpdate(previousProps, previousState){
        if (previousProps.allIntervals !== this.props.allIntervals){
            this.setState({allIntervals: this.props.allIntervals});
            if (this.props.allIntervals.indexOf(this.props.interval) === -1 && this.props.allIntervals.length > 0){
                let firstInterval = this.props.allIntervals[0];
                this.setState({interval: firstInterval});
                this.handleIntervalChange(null, firstInterval);
            }
        }
        if (previousProps.years !== this.props.years){
            this.setState({years: this.props.years});
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

    handleYearChange = (event, newAlignment) => {
        if (newAlignment !== null){
            this.setState({interval: newAlignment});
            if (this.props.onYearChange !== undefined){
                this.props.onYearChange(newAlignment);
            }
        }
    };

    render(){
        let yearToggles = <></>;
        if (this.state.years.length > 0){
            yearToggles = <>
            <ToggleButtonGroup
            color="primary"
            style={{marginTop: '5px'}}
            value={this.state.interval}
            exclusive
            onChange={this.handleYearChange}>
                {this.state.years.map(x => <ToggleButton value={x}>{x}</ToggleButton>)}
            </ToggleButtonGroup>
            </>
        }
        return <>
        <div style={(this.state.years.length > 0)?
            {display: 'flex', 
            flexDirection: 'row', 
            justifyContent: 'space-around', 
            flexWrap: 'wrap'
            }
        :{}}>
        {yearToggles}
        <ToggleButtonGroup
            color="primary"
            style={(this.state.years.length > 0)?{marginTop: '5px' }:{float: 'right'}}
            value={this.state.interval}
            exclusive
            onChange={this.handleIntervalChange}>
            {this.state.allIntervals.map(x => <ToggleButton value={x}>{x}</ToggleButton>)}
        </ToggleButtonGroup>
        </div>
        </>
    }
}