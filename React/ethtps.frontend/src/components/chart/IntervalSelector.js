import * as React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import globalApi from '../../services/common';

class IntervalSelector extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            buttons:[]
        }
        this.onClick = event => {
            props.onIntervalChanged(event);
        }
    }

    buttons = [];

    render(){
        return <>
        <ButtonGroup variant="text" aria-label="text button group">
                {this.state.buttons}
            </ButtonGroup>
        </>;
    }

    async componentDidMount(){
        let intervals = await globalApi.getIntervals();
        this.setState({buttons: intervals.map(x => <Button color="primary" style={{marginRight: 2, borderRadius: 8}} onClick={this.onClick} key={x} variant="contained" aria-label="contained button group">{x}</Button>)});
    }
}    

export default IntervalSelector;