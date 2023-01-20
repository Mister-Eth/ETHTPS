import React from "react";
import NetworkSummary from "../NetworkSummary";

export default class FuelDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: props.name,
            details: {
                description:
                  'Fuel aims to be a complete optimistic rollup with low transaction costs, high speed and high throughput.',
                purpose: 'Payments',
                links: {
                  websites: ['https://fuel.sh/'],
                  documentation: ['https://docs.fuel.sh/'],
                  explorers: ['https://mainnet.fuel.sh/network/'],
                  repositories: ['https://github.com/FuelLabs/fuel-v1-contracts'],
                  socialMedia: [
                    'https://discord.gg/xfpK4Pe',
                    'https://twitter.com/fuellabs_'
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