import React from "react";
import NetworkSummary from "../NetworkSummary";

export default class DeversiFiDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: props.name,
            details: {
                description:
                  'DeversiFi claims to be the easiest way to access DeFi opportunities on Ethereum: invest, trade, and send tokens without paying gas fees.',
                purpose: 'Payments',
                links: {
                  websites: ['https://www.deversifi.com/'],
                  documentation: ['https://docs.deversifi.com/',
                    'https://support.deversifi.com/en/',
                    'https://docs.starkware.co/'],
                  repositories: ['https://github.com/starkware-libs/starkex-contracts', 'https://github.com/deversifi'],
                  socialMedia: [
                    'https://blog.deversifi.com/',
                    'https://twitter.com/deversifi',
                    'https://linkedin.com/company/deversifi/',
                    'https://youtube.com/c/deversifi/'
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