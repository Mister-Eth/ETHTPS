import * as React from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button'

class IntervalSelector extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            intervals: []
        } 
    }

    render(){
        return <>
        {this.state.intervals}
        </>;
    }

    componentDidMount(){
        this.setState({intervals: this.props.intervals});
    }
}    

export default IntervalSelector;