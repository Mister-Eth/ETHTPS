import React from 'react';
import { Doughnut } from 'react-chartjs-2';


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
         let tpsText=  (chart.data.datasets[0].data.reduce((a,b) => a+b) / 2).toString();
         tpsText = tpsText.substr(0, tpsText.indexOf('.') + 3);
         var text = `${tpsText} TPS`,
         textX = Math.round((width - ctx.measureText(text).width) / 2),
         textY = (height + 50 - fontSize) / 2;
         ctx.fillStyle = "white";
         ctx.fillText(text, textX, textY);
         ctx.save();
    }.bind(this)
  }]


    constructor(props){
        super(props);
        this.state = { 
          height: window.innerHeight, 
          width: window.innerWidth
        };
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    top = -100;
    doughnut; 

    render(){
        return <>
        <Doughnut ref={(input)=>{this.doughnut = input}} style={{top:this.top, position:"absolute"}} plugins={this.plugins} data={this.data} options={{
           cutout: 70,
            plugins:{
                legend:{
                    display:false
                }
            }
           }}/>
        </>
    }

  updateDimensions() {
    this.setState({
      height: window.innerHeight, 
      width: window.innerWidth
    });
  }
    componentDidMount(){
      window.addEventListener("resize", this.updateDimensions);
      this.update();
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.updateDimensions);
    }

    shouldComponentUpdate(nextProps, nextState){
        this.update();
        return true;
    }

    tpsComparator(a,b) {
        return a.tps-b.tps;
      }

    update(){
        if (this.props.tpsData.length === 0){
            return;
        }

        //Order ascending by tps
        this.props.tpsData.sort(this.tpsComparator);

        this.data = {
            options:{
                cutout:40,
                cutoutPercentage:40,
            },
            labels: this.props.tpsData.map(x => x.provider),
            datasets: [
              {
                data: this.props.tpsData.map(x => x.tps),
                backgroundColor: this.props.tpsData.map(x => x.color),
                borderColor: [
                  'black',
                ],
                borderWidth: 3,
                rotation: 90,
                lineTension:0.1
              },
            ],
          };
          
    if (this.doughnut === undefined)
    return;
  this.top = -this.doughnut.height / 2
    }
}
export default DoughnutChart;