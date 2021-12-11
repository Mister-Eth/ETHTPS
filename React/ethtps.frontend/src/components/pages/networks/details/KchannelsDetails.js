import React from "react";
import NetworkSummary from "../NetworkSummary";

export default class KchannelsDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: props.name,
            details: {
                description:
                  "Kchannels is a new payment channel platform for the Ethereum blockchain.  It is non-custodial and trust-minimized, and its primary focus is on great UX and instant off-chain finality.  Among other things, it is well suited for commerce use-cases (e.g. merchants and their customers).",
                purpose: 'Payments',
                links: {
                  websites: ['https://www.kchannels.io/'],
                  documentation: ['https://docs.kchannels.io/'],
                  socialMedia: [
                    'https://t.me/kchannels',
                    'https://twitter.com/kchannelsio',
                  ]
                }
            }
        }
    }
    
    render(){
        return <>
             <div className={'fcontainer'}>
                <div className={'fitem'} style={{float:'right'}}>
                    <NetworkSummary hidel2BeatReference={true} name={this.state.name} details={this.state.details.links}/>
                </div>
                <div className={'fitem s-padding'}>
                    <h1>Description</h1>
                    {this.state.details.description}
                </div>
           </div>
        </>
    }
}