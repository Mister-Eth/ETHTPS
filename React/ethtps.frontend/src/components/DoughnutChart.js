import React from 'react';
import { Doughnut, Chart } from 'react-chartjs-2';
import { globalApi } from '../services/common';

class DoughnutChart extends React.Component{


 data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          '#920000',
          '#490092',
          '#006ddb',
          '#b66dff',
          '#ff6db6',
          '#ffdf4d',
          '#004949'
        ],
        borderColor: [
          'black',
        ],
        borderWidth: 3,
      },
    ],
  };
  
  cutoutSize = 200;

  plugins = [{
    beforeDraw: function(chart) {
     var width = chart.width,
         height = chart.height,
         ctx = chart.ctx;
         ctx.restore();
         
         var fontSize = (this.cutoutSize / 200).toFixed(2);
         ctx.font = fontSize + "em sans-serif";
         ctx.textBaseline = "top";
         let tpsText=  (chart.data.datasets[0].data.reduce((a,b) => a+b) / 1).toString();
         tpsText = tpsText.substr(0, tpsText.indexOf('.') + 3);
         var text = `${tpsText} TPS`,
         textX = Math.round((width - ctx.measureText(text).width) / 2),
         textY = (height - fontSize) / 2;
         ctx.fillStyle = "black";
         ctx.fillText(text, textX, textY);
         ctx.save();
    }.bind(this)
  }]


    constructor(props){
        super(props);
        this.state = { 
          data: []
        };
    }

    doughnut; 

    render(){
        return <>
        <Doughnut ref={(input)=>{this.doughnut = input}} plugins={this.plugins} data={this.data} options={{
           animation:{
              //duration: this.animationDuration
           },
           cutout: 60,
            plugins:{
                legend:{
                    display:false
                }
            }
           }}/>
        </>
    }

    tpsComparator(a,b) {
        return a.tps-b.tps;
    }

    async componentDidMount(){
      this.colorDict = await globalApi.getColorDict();
    }

    async update(){
        if (this.props.tpsData.length === 0){
            return;
        }

        //Order ascending by tps
        //this.props.tpsData.sort(this.tpsComparator);
        this.data = {
            options:{
                cutout:40,
                cutoutPercentage:40,
            },
            labels: this.props.tpsData.map(x => x.provider),
            datasets: [
              {
                data: this.props.tpsData.map(x => x.data[0].tps),
                backgroundColor: this.props.tpsData.map(x => this.colorDict[x.provider]),
                borderColor: [
                  'black',
                ],
                borderWidth: 3,
                lineTension:0.1
              },
            ],
          };
    }
}
export default DoughnutChart;