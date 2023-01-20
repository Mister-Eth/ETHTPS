import React from "react";
import NetworkSummary from "../NetworkSummary";

export default class AztecDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            details: {
                description:
                  'Aztec is an open source layer 2 network that aims to bring scalability and privacy to Ethereum. It strives to enable affordable, private crypto payments via zero-knowledge proofs.',
                purpose: 'Private payments',
                links: {
                  websites: ['https://aztec.network/'],
                  apps: ['https://zk.money'],
                  documentation: ['https://developers.aztec.network/'],
                  explorers: ['https://explorer.aztec.network/'],
                  repositories: ['https://github.com/AztecProtocol/aztec-2-bug-bounty'],
                  socialMedia: [
                    'https://twitter.com/aztecnetwork',
                    'https://medium.com/aztec-protocol',
                    'https://t.me/aztecprotocol',
                    'https://discord.gg/UDtJr9u',
                    'https://plonk.cafe/',
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