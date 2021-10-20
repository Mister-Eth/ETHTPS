import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useState, useEffect } from 'react';

const getWidth = () => window.innerWidth 
  || document.documentElement.clientWidth 
  || document.body.clientWidth;

function useCurrentWidth() {
  // save current window width in the state object
  let [width, setWidth] = useState(getWidth());

  // in this case useEffect will execute only once because
  // it does not have any dependencies.
  useEffect(() => {
    // timeoutId for debounce mechanism
    let timeoutId = null;
    const resizeListener = () => {
      // prevent execution of previous setTimeout
      clearTimeout(timeoutId);
      // change width from the state object after 150 milliseconds
      timeoutId = setTimeout(() => setWidth(getWidth()), 150);
    };
    // set resize listener
    window.addEventListener('resize', resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeListener);
    }
  }, [])

  return width;
}

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
    this.text = `w:${chart.width}`;
     var width = chart.width,
         height = chart.height,
         ctx = chart.ctx;
         ctx.restore();
         
         let yOffset = 50;
         var fontSize = (this.cutoutSize / 160).toFixed(2);
         ctx.font = fontSize + "em sans-serif";
         ctx.textBaseline = "top";
         let tpsText=  (chart.data.datasets[0].data.reduce((a,b) => a+b) / 2).toString();
         tpsText = tpsText.substr(0, tpsText.indexOf('.') + 3);
         var text = `${tpsText} TPS`,
         textX = Math.round((width - ctx.measureText(text).width) / 2),
         textY = height / 2;
         ctx.fillStyle = "white";
         ctx.fillText(text, textX, yOffset - 10 + textY);

         ctx.save();
    }.bind(this)
  }]


    constructor(props){
        super(props);
    }


    render(){
        return <>
        <Doughnut plugins={this.plugins} data={this.data} options={{
           
            plugins:{
                legend:{
                    display:false
                }
            }
           }}/>
           <p>
               {this.text}
           </p>
        </>
    }

    componentDidMount(){
        this.update();
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
    }
}
export default DoughnutChart;