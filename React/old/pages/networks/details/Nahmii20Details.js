import React from "react";
import NetworkSummary from "../NetworkSummary";

export default class Nahmii20Details extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            details: {
                description:
                  'Nahmii 2.0 is a layer 2 for Ethereum built around the Nahmii Virtual Machine, NVM. This upgraded version of Nahmii provides generalised smart contract support and full composability between them. Nahmii leverages patent-pending state pool technology which gives unprecedented scalability.',
                purpose: 'Private payments',
                links: {
                  websites: ['https://www.nahmii.io/'],
                  documentation: ['https://docs.nahmii.io/developer-docs/'],
                  explorers: ['https://explorer.nahmii.io/'],
                  socialMedia: [
                    'https://twitter.com/Nahmii_io',
                    'https://t.me/nahmii/'
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
                    <NetworkSummary hidel2BeatReference={true} name={this.state.name} details={this.state.details.links}/>
                </div>
                <div className={'fitem s-padding'}>
                    <h1>Description</h1>
                    {this.state.details.description}
                    <h1>
                        Technology
                    </h1>
                    <p>
                    Nahmii introduces State Pools, a technology that provides everyone with the right tools to easily build solutions on Ethereum at scale. We, at Nahmii, know that scaling is more than just the number of transactions per second. Other aspects such as instant finality, low latency and predictable fees are equally as important to obtain a level of scaling that fits commercial needs.
                    </p>
                    <h1>Throughput</h1>
<p>
‌Nahmii scales horizontally so blockchains can finally offer the throughput (transactions per second) they need to be business-ready.

</p>
<h1>Latency</h1>
<p>
Nahmii is not only about transactions per second; Nahmii has extremely low latency, making the platform perfect for traders, metered payments and enabling unprecedented user experiences.

</p>
<h1>‌Transaction Finality</h1>
<p>
With Nahmii you don’t have to wait several minutes or hours for your transaction to be final; When you receive a receipt, that transaction cannot be reversed.

</p>
<h1>‌Fee Predictability</h1>
<p>
With Nahmii you know transaction costs in advance. Even better, Nahmii’s fees are extremely low.
 
</p>
               </div>
           </div>
        </>;
    }
}