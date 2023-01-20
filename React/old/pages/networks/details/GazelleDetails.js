import React from "react";
import NetworkSummary from "../NetworkSummary";

export default class GazelleDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: props.name,
            details: {
                description:
                  'Gazelle is a DApps development framework that guarantees to make the app secure, scalable, and usable with the Layer 2 technology.',
                purpose: 'Payments',
                links: {
                  websites: ['https://gzle.io/'],
                  documentation: ['https://gzle.io/docs/Introduction/'],
                  repositories: ['https://github.com/cryptoeconomicslab/gazelle'],
                  socialMedia: [
                    'https://t.me/cryptoeocnomicslab',
                  ],
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