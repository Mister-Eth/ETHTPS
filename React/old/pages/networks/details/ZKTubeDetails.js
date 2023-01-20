import React from "react";
import NetworkSummary from "../NetworkSummary";

export default class ZKTubeDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: props.name,
            details: {
                description:
                  'zkTube is a Layer 2 network protocol based on Ethereum including function introduction, technical operation principle, operation mechanism, usage protocol, incentive mechanism, application and development plan, etc. We expect that zkTube will play a role of strong practicability and applicability in Layer 2, supplementing and strengthening the actual application functions of the existing public chain and the entire blockchain by providing fast, safe, reliable and high-performance services.',
                purpose: 'Payments',
                links: {
                  websites: ['https://zktube.io/'],
                  documentation: ['https://github.com/zkTube-Labs/zkTube-docs/tree/main/docs/Tutorials'],
                  explorers: ['https://scan.zktube.io/'],
                  repositories: ['https://github.com/zkTube-Labs'],
                  socialMedia: [
                    'https://twitter.com/zktubeofficial',
                    'https://discord.gg/xtVdMCr54q',
                    'https://zktube.medium.com/',
                    'https://www.reddit.com/r/zkTube_Official/',
                    'https://www.facebook.com/zkTube.official/',
                    'https://zktube.substack.com/'
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