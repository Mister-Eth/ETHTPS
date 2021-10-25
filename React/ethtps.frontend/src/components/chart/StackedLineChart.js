import * as React from 'react';
import { Line, Chart } from "react-chartjs-2";
import { globalApi, providerExclusionList } from '../../services/common';

class StackedLineChart extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            scale: this.transformScale(props.scale),
            interval: props.interval,
            loadingPercentage: 10,
            datasets: [],
            xData: [],
            min: 0.01,
            max: 100
        }
    }

    hideDataset(name, value){
        let changes = 0;
        for (let dataset of this.state.datasets){
            if (dataset.label == name){
                dataset.hidden = value;
                changes++;
            }
        }
        if (changes > 0){
            this.setState({datasets: this.state.datasets});
        }
    }

    transformScale(scale){
        switch (scale){
            case "LOG":
                return "logarithmic";
            default:
                return "linear";
        }
    }

    defaultLegendClickHandler = Chart.defaults.plugins.legend.onClick;
    newLegendClickHandler = function (e, legendItem, legend) {
        let index = legendItem.datasetIndex;
        let ci = legend.chart;
        if (ci.isDatasetVisible(index)) {
            ci.hide(index);
            legendItem.hidden = true;
        } else {
            ci.show(index);
            legendItem.hidden = false;
        }

        if (legendItem.hidden){
            providerExclusionList.addExcludedProvider(legendItem.text);
        }
        else{
            providerExclusionList.removeExcludedProvider(legendItem.text);
        }
    };
    

    buildDataPoint(x){
        return {
            label: x[0].provider,
            fill: true,
            borderColor: x[0].color,
            //backgroundColor: x[0].color,
            pointBackgroundColor: x[0].color,
            pointHighlightStroke: x[0].color,
            borderCapStyle: 'butt',
            data: x.map(y => y.tps),
            labels: x.map(y => y.date),
            tension: 0.3,
            pointRadius: 2,
            backgroundColor: 'transparent',
            pointHitRadius: 10
        }
    }

    setMinAndMax(data){
        let tps = data.filter(x => x.length > 0).map(x => x.map(y => y.tps)).flat(1);
        this.setState({min:Math.min.apply(Math, tps)});
        this.setState({max:Math.max.apply(Math, tps)});
    }
    
    async buildDatasets(interval){
        let data = await globalApi.getAllTPS(globalApi.toLongName(interval), 'Mainnet', true);
        let datasets = data.filter(x => x.length > 0).map(this.buildDataPoint);
        //this.setMinAndMax(data);
        this.setState({xData: data[0].map(x => x.date)});
        this.setState({datasets: datasets});
        this.setState({loadingPercentage: 0});
    }

    async componentWillReceiveProps(nextProps) {
        this.setState({scale: this.transformScale(nextProps.scale)});
        if (this.state.interval !== nextProps.interval){
            this.setState({interval: nextProps.interval});
            await this.buildDatasets(nextProps.interval);
        }
    }

    componentDidMount(){
        providerExclusionList.registerOnProviderExcluded((e)=> {
            this.hideDataset(e, true);
        });
        providerExclusionList.registerOnProviderIncluded((e)=> {
            this.hideDataset(e, false);
        });
        this.buildDatasets(this.props.interval);
    }

    render(){
        return <>
        <Line data={{
                labels: this.state.xData,
                datasets: this.state.datasets
              }}
              height={400}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                plugins:{
                    legend:{
                        position: 'bottom',
                        display: true,
                        onClick: this.newLegendClickHandler
                    },
                    labels: {/*
                        render: 'image',
                        images: [
                          { src: 'taiwan.png', width: 32, height: 22 },
                          { src: 'jpan.png', width: 32, height: 22 },
                          { src: 'usa.png', width: 32, height: 22 }
                        ]*/
                    }
                },
                scales: {
                    x: {
                      ticks: {
                        display: false,
                        callback: function(value, index, values) {
                            return value;
                        },
                        type: 'timeseries'
                      },
                    grid: {
                            display:false
                        }
                    },
                    y: {
                        type: this.state.scale,
                        ticks: {
                            min: this.state.min, //minimum tick
                            max: this.state.max, //maximum tick
                            callback: function (value, index, values) {
                                return Number(value.toString());//pass tick values as a string into Number function
                            }
                       },
                       grid: {
                            display:false
                        }
                    }
                  }
              }}/>
        </>;
    }
}    

export default StackedLineChart;