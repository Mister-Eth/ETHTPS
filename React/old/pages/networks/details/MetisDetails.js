import React from "react";
import NetworkSummary from "../NetworkSummary";

export default class MetisDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            details: {
                description:
                  'Metis aims to revolutionize how people/businesses collaborate using blockchain technology and solve layer 1 problems in a framework.',
                purpose: 'General purpose',
                links: {
                  websites: ['https://www.metis.io/'],
                  documentation: ['https://docs.metis.io/'],
                  explorers: ['https://andromeda-explorer.metis.io/'],
                  repositories: ['https://github.com/MetisProtocol'],
                  socialMedia: [
                    'https://twitter.com/MetisDAO',
                    'https://discord.gg/RqfEJZXnxd', 
                    'https://t.me/MetisDAO'
                  ],
                }
            },
            name: props.name
        }
    }
    
    render(){
        return <>
           <div className={'fcontainer'}>
                <div className={'fitem'} style={{float:'right'}}>
                    <NetworkSummary name={this.state.name} details={this.state.details.links} hidel2BeatReference={true}/>
                </div>
                <div className={'fitem s-padding'}>
                    <h1>Description</h1>
                    {this.state.details.description}
                    
                    <h1>
                        Details
                    </h1>
                    <p>
                    Metis uses optimistic rollup with the enhanced layer 2 rollup solution to resolve the wait time through its Metis Virtual Machine (MVM), a virtual machine that is compatible with the Ethereum virtual machine. It separates the computing and storage of the Ethereum construct for layer 2. Thus, we have low gas fees on transactions and shorter wait times when withdrawing.
                    </p>

                </div>
           </div>
        </>;
    }
}
