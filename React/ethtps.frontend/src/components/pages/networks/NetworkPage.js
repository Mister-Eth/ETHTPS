import PageWithQueryString from '../../pages/PageWithQueryString';
import HistoricalChart from '../../charts/HistoricalChart';
import './NetworkPage.css'
import React from 'react';
import EthereumDetails from './details/EthereumDetails';
import ArbitrumDetails from './details/ArbitrumDetails';
import AVAXCChainDetails from './details/AVAXCChainDetails';
import BobaNetworkDetails from './details/BobaNetworkDetails';
import LoopringDetails from './details/LoopringDetails';
import OptimismDetails from './details/OptimismDetails';
import PolygonDetails from './details/PolygonDetails';
import XDAIDetails from './details/XDAIDetails';
import ZKSwapDetails from './details/ZKSwapDetails';
import ZKSyncDetails from './details/ZKSyncDetails';
import ImmutableXDetails from './details/ImmutableXDetails';
import { globalGeneralApi } from '../../../services/common';

export default class NetworkPage extends PageWithQueryString {
    constructor(props){
        super(props);
    }

    components = {
        'Ethereum': <EthereumDetails name={this.state.name}/>,
        'Arbitrum One': <ArbitrumDetails name={this.state.name}/>,
        'AVAX C-chain': <AVAXCChainDetails name={this.state.name}/>,
        'Boba Network': <BobaNetworkDetails name={this.state.name}/>,
        'Loopring': <LoopringDetails name={this.state.name}/>,
        'Optimism': <OptimismDetails name={this.state.name}/>,
        'Polygon': <PolygonDetails name={this.state.name}/>,
        'XDAI': <XDAIDetails name={this.state.name}/>,
        'ZKSwap': <ZKSwapDetails name={this.state.name}/>,
        'ZKSync': <ZKSyncDetails name={this.state.name}/>,
        'Immutable X': <ImmutableXDetails name={this.state.name}/>,
    }

    componentDidMount(){
        globalGeneralApi.aPIV2ColorDictionaryGet((err,data,res) => {
            this.setState({colorDictionary:data});
        });
    }
    
    render(){
        if (this.state !== null && this.state.colorDictionary !== undefined)
        return <>
        <a href={`https://github.com/WhoEvenAmI/ETHTPS/edit/dev/React/ethtps.frontend/src/components/pages/networks/details/${this.state.name}Details.js`} style={{float:'right', display:'inline'}}>
            [Edit]
        </a>
            <div>
                <h1 className={'box'}>
                    <img className={'large'} src={`/provider-icons/${this.state.name}.png`} />
                    {this.state.name}
                </h1>
            </div>

            <HistoricalChart 
                height={150}
                provider={this.state.name} 
                colorDictionary={this.state.colorDictionary}
                interval={'1d'} 
                mode={'tps'} 
                scale={'lin'} 
                network={'Mainnet'}/>

            {this.components[this.state.name]}
        </>
        else return <></>
    }
}