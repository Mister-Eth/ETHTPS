import * as React from "react";
import { GeneralApi } from "../../services/api-gen/src";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function HistoricalChart() {
    const [intervalAlignment, setIntervalAlignment] = React.useState('1w');
    const [scaleAlignment, setScaleAlignment] = React.useState('log');

    const handleIntervalChange = (event, newAlignment) => {
        setIntervalAlignment(newAlignment);
    };

    const handleScaleChange = (event, newAlignment) => {
        setScaleAlignment(newAlignment);
    };
    
      return (
        <div>
            <div style={{float:"right"}}>
            <ToggleButtonGroup
                color="primary"
                value={intervalAlignment}
                exclusive
                onChange={handleIntervalChange}>
          <ToggleButton value="1h">1h</ToggleButton>
          <ToggleButton value="1d">1d</ToggleButton>
          <ToggleButton value="1w">1w</ToggleButton>
          <ToggleButton value="1m">1m</ToggleButton>
        </ToggleButtonGroup>
            </div>
            <div style={{float:"right"}}>
            <ToggleButtonGroup
                color="primary"
                value={scaleAlignment}
                exclusive
                onChange={handleScaleChange}>
          <ToggleButton value="log">log</ToggleButton>
          <ToggleButton value="lin">lin</ToggleButton>
        </ToggleButtonGroup>
            </div>
        </div>
      );
}