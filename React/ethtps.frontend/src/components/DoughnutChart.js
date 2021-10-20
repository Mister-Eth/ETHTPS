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

    constructor(props){
        super(props);
        
    }

    render(){
        return  <Doughnut data={this.data}/>
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
              },
            ],
          };
    }
}
export default DoughnutChart;