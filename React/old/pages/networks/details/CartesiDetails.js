import React from "react";
import NetworkSummary from "../NetworkSummary";

export default class CartesiDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: props.name,
            details: {
                description:
                  'zkTube is a Layer 2 network protocol based on Ethereum including function introduction, technical operation principle, operation mechanism, usage protocol, incentive mechanism, application and development plan, etc. We expect that zkTube will play a role of strong practicability and applicability in Layer 2, supplementing and strengthening the actual application functions of the existing public chain and the entire blockchain by providing fast, safe, reliable and high-performance services.',
                purpose: 'Payments',
                links: {
                  websites: ['https://cartesi.io/'],
                  documentation: ['https://cartesi.io/en/docs/intro'],
                  explorers: ['https://explorer.cartesi.io/'],
                  repositories: ['https://www.github.com/cartesi'],
                  socialMedia: [
                    'https://discord.gg/Pt2NrnS',
                    'https://www.twitter.com/cartesiproject',
                    'https://t.me/cartesiannouncements',
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