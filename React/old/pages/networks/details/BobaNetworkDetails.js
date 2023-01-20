import React from "react";
import NetworkSummary from "../NetworkSummary";

export default class BobaNetworkDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: props.name,
            details: {
                description:
                  'Boba is an L2 Ethereum scaling & augmenting solution built by the Enya team as core contributors to the OMG Foundation. Boba is an Optimistic Rollup scaling solution that claims to reduce gas fees, improve transaction throughput, and extend the capabilities of smart contracts.',
                purpose: 'Universal',
                links: {
                  websites: ['https://boba.network'],
                  documentation: ['https://docs.boba.network/'],
                  explorers: ['https://blockexplorer.boba.network/'],
                  repositories: ['https://github.com/omgnetwork/optimism'],
                  socialMedia: [
                    'https://boba.network/#news',
                    'https://www.enya.ai/company/media',
                    'https://twitter.com/bobanetwork',
                    'https://t.me/bobanetwork',
                    'https://discord.gg/m7NysJjKhm',
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