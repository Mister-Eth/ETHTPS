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
import { globalGeneralApi } from '../../../services/common';

export default class NetworkPage extends PageWithQueryString {
    constructor(props){
        super(props);
    }

    components = {
        'Ethereum': <EthereumDetails/>,
        'Arbitrum One': <ArbitrumDetails/>,
        'AVAX C-chain': <AVAXCChainDetails/>,
        'Boba Network': <BobaNetworkDetails/>,
        'Loopring': <LoopringDetails/>,
        'Optimism': <OptimismDetails/>,
        'Polygon': <PolygonDetails/>,
        'XDAI': <XDAIDetails/>,
        'ZKSwap': <ZKSwapDetails/>,
        'ZKSync': <ZKSyncDetails/>,
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