import React from "react";
import NetworkSummary from "../NetworkSummary";

export default class SorareDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: props.name,
            details: {
                description:
                  'Sorare is a global fantasy football game where you can play with officially licensed digital cards and earn prizes every week.',
                purpose: 'Payments',
                links: {
                  websites: ['https://sorare.com/'],
                  documentation: ['https://docs.starkware.co/'],
                  repositories: ['https://github.com/starkware-libs/starkex-contracts'],
                  socialMedia: [
                    'https://discord.gg/TSjtHaM',
                    'https://reddit.com/r/Sorare/',
                    'https://twitter.com/sorarehq',
                    'https://instagram.com/sorare_official/'
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