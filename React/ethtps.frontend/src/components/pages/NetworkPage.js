import PageWithQueryString from './PageWithQueryString';
import './MainPage.css';
import HistoricalChart from '../charts/HistoricalChart';

export default class NetworkPage extends PageWithQueryString {
    constructor(props){
        super(props);
    }

    render(){
        if (this.state !== null)
        return <>
            <h1 className={'box'}>
                <img className={'large'} src={`/provider-icons/${this.state.name}.png`} />
                {this.state.name}
            </h1>
            <HistoricalChart/>
        </>
        else return <></>
    }
}