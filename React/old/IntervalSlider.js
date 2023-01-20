import Slider from '@mui/material/Slider';
import React from 'react';
import { Box } from '@mui/system';

export default class IntervalSlider extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            isTimeWarp: props.isTimeWarp
        }
    }

    marks = [
      {
          value: 1,
          label: '1 block',
      },
      {
        value: 20,
        label: '1 minute',
      },
      {
        value: 40,
        label: '1 hour',
      },
      {
          value: 60,
          label: '1 day',
      },
      {
          value: 80,
          label: '1 week',
      },
      {
          value: 100,
          label: '1 month',
      },
    ];

    timeWarpMarks = [
        {
            value: 1,
            label: '1 block/s',
        },
        {
          value: 20,
          label: '1 minute/s',
        },
        {
          value: 40,
          label: '1 hour/s',
        },
        {
            value: 60,
            label: '1 day/s',
        },
        {
            value: 80,
            label: '1 week/s',
        },
        {
            value: 100,
            label: '1 month/s',
        },
      ];

    intervals = {
        1: "Instant",
        20: "OneMinute",
        40: "OneHour",
        60: "OneDay",
        80: "OneWeek",
        100: "OneMonth"
    }

    lastValue = 1;
    lastInterval = "Instant";

    onChange(x, y){
        if (y !== this.lastValue){
            this.lastValue = y;
            this.lastInterval = this.intervals[y];
            if (this.props.onChange !== undefined){
                this.props.onChange(this.lastInterval);
            }
        }
    }
    
    valuetext(value) {
      return `${value}min/s`;
    }
    
    valueLabelFormat(value) {
      return this.marks.findIndex((mark) => mark.value === value) + 1;
    }

    render(){
        return <center> <Box style={{width: '90%'}}>
                <Slider
                    aria-label="Restricted values"
                    defaultValue={1}
                    valueLabelFormat={this.valueLabelFormat.bind(this)}
                    getAriaValueText={this.valuetext.bind(this)}
                    step={null}
                    marks={(this.state.isTimeWarp)?this.timeWarpMarks:this.marks}
                    track={false}
                    onChange={this.onChange.bind(this)}
                    max={100}
                />
        </Box>
            </center>
    }
}