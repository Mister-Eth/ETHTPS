import React from "react";
import NetworkSummary from "../NetworkSummary";

export default class ArbitrumDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            details: {
                description:
                  'Arbitrum is an Optimistic Rollup that aims to feel exactly like interacting with Ethereum, but with transactions costing a fraction of what they do on L1.',
                purpose: 'Universal',
                links: {
                  websites: ['https://arbitrum.io/', 'https://offchainlabs.com/'],
                  documentation: ['https://developer.offchainlabs.com/'],
                  explorers: ['https://arbiscan.io', 'https://explorer.arbitrum.io/'],
                  repositories: [
                    'https://github.com/OffchainLabs/arbitrum',
                    'https://github.com/OffchainLabs/arb-os',
                  ],
                  socialMedia: [
                    'https://twitter.com/OffchainLabs',
                    'https://twitter.com/arbitrum',
                    'https://medium.com/offchainlabs',
                    'https://discord.gg/5KE54JwyTs',
                  ]
                }
            },
            name: props.name
        }
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
        </>;
    }
}