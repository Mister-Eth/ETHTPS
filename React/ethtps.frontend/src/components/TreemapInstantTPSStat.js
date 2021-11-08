import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts"

export default class TreemapInstantTPSStat extends React.Component {
    constructor(props) {
    super(props);

    this.state = {
            data:props.data,
            providerData:props.providerData,
            colorDictionary:props.colorDictionary,
            series:[],
            options: {
              legend: {
                show: false
              },
              chart: {
                height: 350,
                type: 'treemap',
                toolbar:{
                    show: false
                }
              },
              colors: [
                '#3B93A5',
                '#F7B844',
                '#ADD8C7',
                '#EC3C65',
                '#CDD7B6',
                '#C1F666',
                '#D43F97',
                '#1E5D8C',
                '#421243',
                '#7F94B0',
                '#EF6537',
                '#C0ADDB'
              ],
              plotOptions: {
                treemap: {
                  distributed: true,
                  enableShades: false
                }
              }
            },
          };
        }

   calculateTotalTPS(state){
        if (state.data === undefined || state.data.length === 0)
            return 20;
        
        let t = state.providerData.filter(x=>state.data[x.name] !== undefined).map(x=>state.data[x.name][0].tps);
        if (t.length === 0){
            return 0;
        }
        return t.reduce((a, b) => a + b);
    }

    to2DecimalPlaces(num){
        return Math.round((num + Number.EPSILON) * 100) / 100
     }
        
    createDataPoint(x, state){
        return {
            x: x.name,
            y: this.to2DecimalPlaces(state.data[x.name][0].tps)
        }
    }

    createSeries(state){
        if (state.providerData === undefined || state.data === undefined || state.options.colors.length === 0){
            return [{data:[]}];
        }
        return [
                {
                    data: state.providerData.filter(x => state.data[x.name] !== undefined).map(x => this.createDataPoint(x, state))
                }
            ];
    }

    componentDidUpdate(previousProps, previousState){
        if (previousProps.data !== this.props.data){      
            this.setState({data: this.props.data})
            this.tryUpdateColors();
        }
        if (previousProps.colorDictionary !== this.props.colorDictionary){
            this.setState({colorDictionary: this.props.colorDictionary});
            this.tryUpdateColors();
        }
        if (previousProps.providerData !== this.props.providerData){
            this.setState({providerData: this.props.providerData});
            this.tryUpdateColors();
        }

    }

    tryUpdateColors(){
        if (this.props.data !== undefined && this.props.providerData !== undefined && this.props.colorDictionary !== undefined){
            let colors = this.props.providerData.filter(x => this.props.data[x.name] !== undefined).map(x => this.props.colorDictionary[x.name]);
            if (colors.length > 0){
                this.setState({
                    options:{
                        colors: colors
                    }
                })
            }
        }
    }

    render() {
        return <>
        <center>
            <h4 className={'tooltip'}>
                Ethereum currently does {parseFloat(this.calculateTotalTPS(this.state).toString()).toFixed(2)} TPS
                <span className={'tooltiptext'}>This includes L2s, sidechains (if the box below is unchecked), ZK rollups, validiums etc.</span>
            </h4>
        </center>
        <div id="chart">
            <ReactApexChart options={this.state.options} series={this.createSeries(this.state)} type="treemap" height={350} />
        </div>
        </>
    }
}
