import React from "react";
import NetworkSummary from "../NetworkSummary";

export default class ZKSyncDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: props.name,
            details: {
                description:
                  'zkSync is a user-centric zk rollup platform from Matter Labs. It is a scaling solution for Ethereum, already live on Ethereum mainnet.',
                purpose: 'Payments',
                links: {
                  websites: ['https://zksync.io/'],
                  apps: ['https://wallet.zksync.io/'],
                  documentation: ['https://zksync.io/dev/'],
                  explorers: ['https://zkscan.io/'],
                  repositories: ['https://github.com/matter-labs/zksync'],
                  socialMedia: [
                    'https://medium.com/matter-labs',
                    'https://gitter.im/matter-labs/zksync',
                    'https://discord.gg/px2aR7w',
                    'https://t.me/zksync',
                    'https://twitter.com/zksync',
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