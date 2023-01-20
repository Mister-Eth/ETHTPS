import React from "react";
import NetworkSummary from "../NetworkSummary";

export default class Layer2FinanceDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: props.name,
            details: {
                description:
                  'Layer2.Finance aims to democratize access to DeFi protocols for everyone. Users can aggregate their DeFi usage and save on Ethereum fees.',
                purpose: 'Payments',
                links: {
                  websites: ['https://layer2.finance/'],
                  documentation: ['https://docs.l2.finance/'],
                  apps: ['https://app.l2.finance/'],
                  repositories: ['https://github.com/celer-network/layer2-finance-contracts'],
                  socialMedia: [
                    'https://discord.gg/uGx4fjQ',
                    'https://t.me/celernetwork',
                    'https://twitter.com/CelerNetwork',
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