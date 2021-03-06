import React from "react";
import NetworkSummary from "../NetworkSummary";

export default class ImmutableXDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: props.name,
            details: {
                description:
                  'Immutable X claims to be the first Layer 2 for NFTs on Ethereum. It promises zero gas fees, instant trades and scalability for games, applications, marketplaces, without compromise.',
                purpose: 'NFT, Exchange',
                links: {
                  websites: ['https://www.immutable.com'],
                  apps: ['https://market.x.immutable.com'],
                  documentation: ['https://docs.starkware.co/starkex-docs-v2'],
                  explorers: ['https://immutascan.io'],
                  repositories: ['https://github.com/starkware-libs/starkex-contracts'],
                  socialMedia: [
                    'https://medium.com/@immutablex',
                    'https://twitter.com/Immutable',
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
                    <h1>Details</h1>
                    <p>
                    Immutable X is a layer 2 protocol for trading Ethereum NFTs that gives users instant trade confirmation, huge scalability (9,000 transactions per second), and zero gas fees without compromising user ownership. Immutable X’s goal is to make minting and trading NFTs easier than trading traditional digital assets.
                    </p>
                    <p>
                    In all reality, Immutable X is a layer 2 scaling solution that leverages the power and security of the Ethereum blockchain, rather than compete against it.
                    </p>
                    <h1>Security</h1>
                    <p>
                    Users are not required to do anything when they join this protocol, it’s very simple and you can use your existing digital wallet. This means that the private key that is required to power this protocol is generated by your existing wallet. So, you can use popular wallets such as MetaMask, or any other solution you’d like to use.
                    </p>
                    <h1>Scalability</h1>
                    <p>
                    Technically speaking, if you want to achieve scalability on the blockchain then you’re either treading away from overall security, or you are moving away from decentralization. 
                    </p>
                    <p>
                    That’s why Immutable X and StarkWare teamed up together to allow massive batching of trades off-chain, with users signing for the transaction, and then being put on-chain in a single proof that essentially compresses those trades into a single transaction at a fixed gas cost, which Immutable X pays. 
                    </p>
                    <p>
                    This means that if you’re a user of Immutable X you pay zero gas fees for trading NFTs, and you pay zero gas fees as a developer as well.
                    </p>
                    <h1>On-chain validity-based proof</h1>
                    <p>
                    Immutable X uses a validity-based proof. Validity-based proof means that your assets can never be traded without your permission, which is the same security measure as the Ethereum mainchain, and your items can never be taken from you either.
                    </p>
                    <h1>
                    How does Immutable X work?
                    </h1>

                    <p>
                        

Immutable X uses what is called a ZK Rollup, which takes thousands of off-chain trades, creates a proof that these trades were all valid (owners of the assets signed the trades), and then publishes that proof on chain, where it is then verified by a smart contract.

Throughout this process, the on-chain user assets are held in the smart contract and can only be released after a valid proof including the assets has been published in a batch.

                    </p>
                    <a href="https://www.one37pm.com/nft/tech/immutable-x-ethereums-first-layer-2-for-nfts?ref=https://ethtps.info/Network?name=Immutable%20X">[Source]</a>
                </div>
           </div>
        </>;
    }
}