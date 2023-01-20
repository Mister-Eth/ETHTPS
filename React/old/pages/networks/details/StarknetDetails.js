import React from "react";
import NetworkSummary from "../NetworkSummary";

export default class StarknetDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            details: {
                description:
                  'StarkNet is a permissionless decentralized Rollup operating as an L2 network over Ethereum.',
                purpose: 'Private payments',
                links: {
                  websites: ['https://starkware.co/'],
                  documentation: ['https://cairo-lang.org/docs/'],
                  explorers: ['https://voyager.online/'],
                  socialMedia: [
                    'https://twitter.com/StarkWareLtd',
                    'https://medium.com/starkware/',
                    'https://t.co/klHVDhQokP',
                  ],
                }
            },
            name: props.name
        }
    }
    
    render(){
        return <>
           <div className={'fcontainer'}>
                <div className={'fitem'} style={{float:'right'}}>
                    <NetworkSummary hidel2BeatReference={true} name={this.state.name} details={this.state.details.links}/>
                </div>
                <div className={'fitem s-padding'}>
                    <h1>Description</h1>
                    {this.state.details.description}
                    <h1>
                        Technology
                    </h1>
                    <p>
                    StarkNet allows any dApp to achieve unlimited scale for its computation, without compromising Ethereum’s composability and security, thanks to its reliance on the safest and most scalable cryptographic proof system — STARK.
                    </p>
                    <p>
                    StarkNet is built on the Cairo programming language, the first production-grade Turing complete von-Neumann verifier on Ethereum. Both Cairo and STARK were developed in-house by StarkWare and have powered all our production-grade applications, which have settled over 50M txs and $250B since Summer 2020.
                    </p>
                    <p>
                    Among other features, StarkNet Alpha enables general computation smart contracts that support composability, both with other StarkNet contracts and via L1>L2 messaging with L1 contracts. StarkNet Alpha operates in a Rollup mode, meaning all the state diff data is sent on-chain.
                    </p>

                </div>
           </div>
        </>;
    }
}