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
        'ZKSWap': <ZKSwapDetails/>,
        'ZKSync': <ZKSyncDetails/>,
    }
    render(){
        if (this.state !== null)
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
            <HistoricalChart/>
            {this.components[this.state.name]}
        </>
        else return <></>
    }
}