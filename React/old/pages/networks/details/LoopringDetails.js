import React from "react";
import NetworkSummary from "../NetworkSummary";

export default class LoopringDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: props.name,
            details: {
                description:
                  "Loopring's zkRollup L2 solution aims to offer the same security guarantees as Ethereum mainnet, with a big scalability boost: throughput increased by 1000x, and cost reduced to just 0.1% of L1.",
                purpose: 'Payments, Exchange',
                links: {
                  websites: ['https://loopring.org'],
                  apps: ['https://exchange.loopring.io/'],
                  documentation: [
                    'https://github.com/Loopring/protocols/blob/master/packages/loopring_v3/DESIGN.md',
                  ],
                  explorers: ['https://explorer.loopring.io/'],
                  repositories: ['https://github.com/Loopring/protocols'],
                  socialMedia: [
                    'https://loopring.org/#/blog',
                    'https://medium.com/loopring-protocol',
                    'https://twitter.com/loopringorg',
                    'https://discord.gg/KkYccYp',
                    'https://youtube.com/c/loopring',
                    'https://weibo.com/loopringfoundation',
                    'https://reddit.com/r/loopringorg/',
                    'https://loopring.substack.com/',
                  ],
                }
            }
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
        </>
    }
}