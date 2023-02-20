import React from "react";
import NetworkSummary from "../NetworkSummary";

export default class ArbitrumNovaDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            details: {
                description:
                  'Arbitrum Nova is a new chain that is primarily intended for gaming and social applications, and was first announced earlier this year, and is the first chain built using Arbitrum’s AnyTrust technology.',
                purpose: 'Universal',
                links: {
                  websites: ['https://nova.arbitrum.io/'],
                  documentation: ['https://developer.offchainlabs.com/docs/AnyTrust'],
                  explorers: ['https://nova.arbitrum.io/'],
                  repositories: [
                    'https://github.com/OffchainLabs/nitro',
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
                    
                <h1>Technology</h1>
                <p>
                Nova is a new chain built on the Arbitrum AnyTrust technology and optimized for social and gaming applications that require ultra-low fees and high security
                <br/><br/>
                The chain is intended for projects with high transaction volumes that are looking for low-cost and high-security solutions. Arbitrum has said that it has granted access to over 100 development teams. It also makes use of a Data Availability Committee, and initial members include ConsenSys, FTX, Google Cloud, Offchain Labs, P2P, Quicknode, and Reddit.
                <br/><br/>
                Among the successes that the chain can count on is the deployment of Reddit’s Community Points system on Nova. Currently, there are two communities as part of this deployment, though that figure could very well increase. The focus now is to encourage development, build out the ecosystem, and then the user base.
                <br/><br/>
                Nova is different from Arbitrum One in that the Data Availability Committee receives the transaction data first, with the data going on-chain only if the committee fails. It makes the assumption that at least two committee members are honest.
                <br/><br/>

              </p>
                <a href={'https://beincrypto.com/arbitrum-launches-gaming-social-app-focused-layer-2-chain-arbitrum-nova/'}>Source</a>
               </div>
           </div>
        </>;
    }
}