import React from "react";
import NetworkSummary from "../NetworkSummary";

export default class ImmutableXDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            upgradePlans: "",
            details: {
                description:
                  'Immutable X claims to be the first Layer 2 for NFTs on Ethereum. It promises zero gas fees, instant trades and scalability for games, applications, marketplaces, without compromise.',
                purpose: 'NFT, Exchange',
                links: {
                  websites: ['https://www.immutable.com'],
                  apps: ['https://market.x.immutable.com'],
                  documentation: ['https://docs.starkware.co/starkex-docs-v2'],
                  explorers: ['https://immutascan.io'],
                  repositories: ['https://github.com/starkware-libs/starkex-contracts'],
                  socialMedia: [
                    'https://medium.com/@immutablex',
                    'https://twitter.com/Immutable',
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