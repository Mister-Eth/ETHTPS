import React from 'react';
import ProgressBar from 'react-bootstrap'

class Gauge extends React.Component{
    constructor(props){
        super(props);
    }

    nrOfLevels = 5;
    arcsLength = [0.3, 0.5, 0.2, 0, 0]
    colors = []

    render(){
        return <>
<ProgressBar>
  <ProgressBar striped variant="success" now={35} key={1} />
  <ProgressBar variant="warning" now={20} key={2} />
  <ProgressBar striped variant="danger" now={10} key={3} />
</ProgressBar>
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
        let data = this.props.tpsData;
        if (data.length === 0){
            return;
        }

        //Order ascending by tps
        data.sort(this.tpsComparator);

        this.colors = data.map(x => x.color);
        this.nrOfLevels = data.length;
        console.log(data.length)
    }
}
export default Gauge;