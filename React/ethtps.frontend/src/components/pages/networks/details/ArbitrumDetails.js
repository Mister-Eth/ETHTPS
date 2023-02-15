import React from "react";
import NetworkSummary from "../NetworkSummary";

export default class ArbitrumDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            details: {
                description:
                  'Arbitrum is an Optimistic Rollup that aims to feel exactly like interacting with Ethereum, but with transactions costing a fraction of what they do on L1.',
                purpose: 'Universal',
                links: {
                  websites: ['https://arbitrum.io/', 'https://offchainlabs.com/'],
                  documentation: ['https://developer.offchainlabs.com/'],
                  explorers: ['https://arbiscan.io', 'https://explorer.arbitrum.io/'],
                  repositories: [
                    'https://github.com/OffchainLabs/nitro'
                  ],
                  socialMedia: [
                    'https://twitter.com/OffchainLabs',
                    'https://twitter.com/arbitrum',
                    'https://medium.com/offchainlabs',
                    'https://discord.gg/5KE54JwyTs',
                  ]
                }
            },
            name: props.name
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
                    
                <h1>Technology</h1>
                <p>
                To date, two main styles of L2 rollups have come to the fore: zero-knowledge (ZK) rollups and optimistic rollups. 
<br/><br/>
All rollups handle transaction execution off-chain, meaning they use their own infrastructure to facilitate transactions. In this way, rollups are like decongestants for Ethereum. They relieve Ethereum by readily supporting Ethereum-based activities that would have otherwise competed for “L1” Ethereum block space. Stylistically speaking, what sets rollups apart derives from how they handle data. 
<br/><br/>
Rollups execute transactions off-chain, but in some capacity these L2s post data to the Ethereum mainnet. How they do determines whether they’re a ZK rollup or an optimistic rollup. The former rely on validity proofs, which entail posting batches of transactions via cryptographic proofs called ZK-SNARKs. The latter rely on fraud proofs, which assume posted data is valid unless challenged. 
<br/><br/>       
Because Arbitrum’s technology depends on fraud proofs, it is “optimistic” in style rather than ZK-based. Zooming in, this style affords Arbitrum some fundamental advantages:
<br/><br/></p>
<ul>
  <li>
  Optimistic rollups are readily compatible with the Ethereum Virtual Machine (EVM), so L1 dapps can easily “port” their projects to Arbitrum’s L2 tech. 

  </li>
  <li>
  Optimistic rollups also offer low fixed-gas costs per transaction batch and lower off-chain computation costs than ZK rollups face, so Arbitrum enjoys these structural benefits. 

  </li>
</ul>
<p>
Of course, it’s worth repeating that along with these specialized advantages Arbitrum additionally enjoys the generalized advantages of rollups. These are rapid and inexpensive transactions and the decentralization and security guarantees provided by Ethereum as a reliable L1 foundation. 
                </p>
                <a href={'https://defipulse.com/blog/what-is-arbitrum/'}>Source</a>
                </div>
           </div>
        </>;
    }
}