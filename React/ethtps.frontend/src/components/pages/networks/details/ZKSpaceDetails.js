import React from "react";
import NetworkSummary from "../NetworkSummary";

export default class ZKSpaceDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: props.name,
            details: {
                description:
                  'ZKSwap claims to be a Layer 2 AMM decentralized transaction protocol. Based on ZK-Rollup technology, ZKSwap aims to execute the full functionality of Uniswap on Layer 2, while ensuring the core value of decentralized exchange. ZKSwap aims to increase the TPS by multiple orders of magnitude compared to Uniswap, and make transaction processing hardly consume any gas fees.',
                purpose: 'Payments, Exchange',
                links: {
                  websites: ['https://zks.org/'],
                  apps: ['https://zks.app'],
                  documentation: ['https://en.wiki.zks.org/'],
                  explorers: ['https://zkswap.info'],
                  repositories: ['https://github.com/l2labs/zkswap-contracts'],
                  socialMedia: [
                    'https://medium.com/@zkswapofficial',
                    'https://twitter.com/ZKSwapOfficial',
                    'https://discord.gg/rpjpeq4Y47',
                    'https://t.me/zkswapofficial',
                    'https://reddit.com/r/ZKSwap_Official/',
                    'https://zks.org/en/blog',
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