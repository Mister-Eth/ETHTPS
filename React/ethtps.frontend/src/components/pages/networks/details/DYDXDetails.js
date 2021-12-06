import React from "react";
import NetworkSummary from "../NetworkSummary";

export default class DYDXDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: props.name,
            details: {
                description:
                  'dYdX aims to build a powerful and professional exchange for trading crypto assets where users can truly own their trades and, eventually, the exchange itself.',
                purpose: 'Payments',
                links: {
                  websites: ['https://dydx.exchange/'],
                  documentation: ['https://docs.omg.network/'],
                  explorers: ['https://blockexplorer.mainnet.v1.omg.network/'],
                  repositories: ['https://github.com/omgnetwork/plasma-contracts'],
                  apps:['https://trade.dydx.exchange/',
                    'https://margin.dydx.exchange/'],
                  socialMedia: [
                    'https://dydx.exchange/blog',
                    'https://twitter.com/dydxprotocol',
                    'https://discord.gg/Tuze6tY',
                    'https://youtube.com/c/dydxprotocol',
                    'https://reddit.com/r/dydxprotocol/',
                    'https://linkedin.com/company/dydx'
                  ],
                }
            }
        }
        console.log(0)
    }
    
    render(){
        return <>
             <div className={'fcontainer'}>
                <div className={'fitem'} style={{float:'right'}}>
                    <NetworkSummary name={this.state.name} details={this.state.details.links}/>
                </div>
                <div className={'fitem s-padding'}>
                    <h1>Description</h1>
                    {this.state.details.description}
                </div>
           </div>
        </>
    }
}
