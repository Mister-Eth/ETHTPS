import React from "react";
import NetworkSummary from "../NetworkSummary";

export default class OptimismDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: props.name,
            details: {
                warning:
                  'Currently only whitelisted contracts can be deployed on Optimism.',
                description:
                  'Optimistic Ethereum is an EVM-compatible Optimistic Rollup chain. It aims to be fast, simple, and secure.',
                purpose: 'Universal',
                links: {
                  websites: ['https://optimism.io/'],
                  documentation: ['https://community.optimism.io/docs/'],
                  explorers: ['https://optimistic.etherscan.io/'],
                  repositories: ['https://github.com/ethereum-optimism/optimism'],
                  socialMedia: [
                    'https://medium.com/ethereum-optimism',
                    'https://twitter.com/optimismPBC',
                    'https://discord.gg/jrnFEvq',
                    'https://youtube.com/playlist?list=PLX_rXoLYCf5HqTWygUfoMfzRirGz5lekH',
                    'https://twitch.tv/optimismpbc',
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