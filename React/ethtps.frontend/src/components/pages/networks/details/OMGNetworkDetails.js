import React from "react";
import NetworkSummary from "../NetworkSummary";

export default class OMGNetworkDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: props.name,
            details: {
                description:
                  'OMG Network claims to be the leading value transfer network for ETH and ERC20 tokens. Using the OMG Network, individuals and businesses can transact on a financial infrastructure that is claimed to be several times faster, 1/3rd the cost, and as secure as the Ethereum Network — while retaining full autonomy over their funds and keys. The Network scales by centralizing transaction processing and remains safe by decentralizing security.',
                purpose: 'Payments',
                links: {
                  websites: ['https://omg.network/'],
                  documentation: ['https://docs.omg.network/'],
                  explorers: ['https://blockexplorer.mainnet.v1.omg.network/'],
                  repositories: ['https://github.com/omgnetwork/plasma-contracts'],
                  socialMedia: [
                    'https://twitter.com/omgnetworkhq',
                    'https://discord.gg/m7NysJjKhm',
                    'https://t.me/omgnetwork',
                    'https://linkedin.com/company/omgnetwork/'
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