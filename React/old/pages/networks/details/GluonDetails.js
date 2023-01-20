import React from "react";
import NetworkSummary from "../NetworkSummary";

export default class GluonDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: props.name,
            details: {
                description:
                  'Gluon aims to be a Layer 2 scalable trading engine built on top of Ethereum, unlocking low fees and high frequency trading.',
                purpose: 'Payments',
                links: {
                  websites: ['https://gluon.network/', 'https://leverj.io/'],
                  documentation: ['https://leverj.io/assets/documents/Gluon-Layer2.pdf/'],
                  apps: ['https://live.leverj.io/'],
                  explorers: ['https://gluon.leverj.io/'],
                  socialMedia: [
                    'https://twitter.com/Leverj_io',
                    'https://t.me/leverj',
                    'https://discord.gg/xpsjfwn',
                    'https://blog.leverj.io/',
                    'https://linkedin.com/company/leverj/',
                    'https://youtube.com/channel/UCGor-eEpq0ObqN9u3jutq2w'
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