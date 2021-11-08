import * as React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function IntervalSelector(){
    let interval = "1w";
    const [intervalAlignment, setIntervalAlignment] = React.useState(interval);
    
    const handleIntervalChange = (event, newAlignment) => {
        if (newAlignment !== null){
            interval = newAlignment;
            setIntervalAlignment(newAlignment);
        }
    };

    return <ToggleButtonGroup
        color="primary"
        value={intervalAlignment}
        exclusive
        onChange={handleIntervalChange}>
        <ToggleButton value="1h">1h</ToggleButton>
        <ToggleButton value="1d">1d</ToggleButton>
        <ToggleButton value="1w">1w</ToggleButton>
        <ToggleButton value="1m">1m</ToggleButton>
    </ToggleButtonGroup>
}