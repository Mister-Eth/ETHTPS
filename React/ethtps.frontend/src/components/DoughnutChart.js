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
        return  <Doughnut data={this.data} />
    }

    componentDidMount(){
        console.log(this.props);
        this.update();
    }

    shouldComponentUpdate(nextProps, nextState){
        console.log('Should update')
        this.update();
        return true;
    }

    update(){
        if (this.props.tpsData.length === 0)
        return;
        this.data = {
            labels: this.props.tpsData.map(x => x.provider),
            datasets: [
              {//.insert(0, this.props.tpsData.map(x => x.tps).reduce((a,b)=>a+b)),
                label: '# of Votes',
                data:this.props.tpsData.map(x => x.tps),
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
    }
}
export default DoughnutChart;