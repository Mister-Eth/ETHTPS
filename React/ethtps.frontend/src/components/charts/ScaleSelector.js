import * as React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ScaleSelector(){
    let scale = 'lin';
    const [scaleAlignment, setScaleAlignment] = React.useState(scale);

    const handleScaleChange = (event, newAlignment) => {
        if (newAlignment !== null){
            scale = newAlignment;
            setScaleAlignment(newAlignment);
        }
    };

    return <ToggleButtonGroup
        color="primary"
        value={scaleAlignment}
        exclusive
        onChange={handleScaleChange}>
        <ToggleButton value="log">log</ToggleButton>
        <ToggleButton value="lin">lin</ToggleButton>
    </ToggleButtonGroup>
}