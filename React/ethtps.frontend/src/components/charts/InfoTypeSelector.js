import * as React from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function InfoTypeSelector(){
    let infoType = 'tps';
    const [infoTypeAlignment, setInfoTypelignment] = React.useState(infoType);

    const handleInfoTypeChange = (event, newAlignment) => {
        if (newAlignment !== null){
            infoType = newAlignment;
            setInfoTypelignment(newAlignment);
        }
    };

    return  <ToggleButtonGroup
        color="primary"
        value={infoTypeAlignment}
        exclusive
        onChange={handleInfoTypeChange}>
        <ToggleButton value="tps">tps</ToggleButton>
        <ToggleButton value="gps">gps</ToggleButton>
    </ToggleButtonGroup>
}