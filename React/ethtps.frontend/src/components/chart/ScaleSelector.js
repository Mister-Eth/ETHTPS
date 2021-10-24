import * as React from 'react';
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'

class ScaleSelector extends React.Component {
    constructor(props){
        super(props);
        
        this.onClick = event => {
            props.onScaleChanged(event);
        }
    }


    render(){
        return <>
         <ButtonGroup variant="text" aria-label="text button group">
            <Button color="primary" style={{marginRight: 2, borderRadius: 8}} onClick={this.onClick} key="LOG" variant="contained" aria-label="contained button group">LOG</Button>
            <Button color="primary" style={{marginRight: 2, borderRadius: 8}} onClick={this.onClick} key="LIN" variant="contained" aria-label="contained button group">LIN</Button>
        </ButtonGroup>
        </>;
    }
}    

export default ScaleSelector;