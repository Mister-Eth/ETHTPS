import React from "react";
import NetworkSummary from "../NetworkSummary";

export default class OptimismDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: props.name,
            details: {
                warning:
                  'Currently only whitelisted contracts can be deployed on Optimism.',
                description:
                  'Optimism is a Layer 2 scaling solution for Ethereum that can support all of Ethereum’s Dapps. Instead of running all computation and data on the Ethereum network, Optimism puts all transaction data on-chain and runs computation off-chain, increasing Ethereum’s transactions per second and decreasing transaction fees. Tests have shown a 143x decrease in transaction fees on Synthetix Exchange and up to a 100x decrease on Uniswap. Since transaction data still stays on the Ethereum network, this scaling solution does not sacrifice Ethereum’s decentralisation or security for scalability.',
                purpose: 'Universal',
                links: {
                  websites: ['https://optimism.io/'],
                  documentation: ['https://community.optimism.io/docs/'],
                  explorers: ['https://optimistic.etherscan.io/'],
                  repositories: ['https://github.com/ethereum-optimism/optimism'],
                  socialMedia: [
                    'https://medium.com/ethereum-optimism',
                    'https://twitter.com/optimismPBC',
                    'https://discord.gg/jrnFEvq',
                    'https://youtube.com/playlist?list=PLX_rXoLYCf5HqTWygUfoMfzRirGz5lekH',
                    'https://twitch.tv/optimismpbc',
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
                    <h1>Technology</h1>
                    <p>
                    Sequencers on Optimism are responsible for executing computation off-chain and publishing compressed transaction data onto a smart contract on Ethereum at regular checkpoints. Since computation is resource-intensive, moving it off Ethereum allows it to scale by orders of magnitude.
<br/><br/>
But what if sequencers are malicious and send fraudulent data? When the sequencer publishes transaction data, there is a window of time where anyone can run their own computation to determine if the transaction data is fraudulent. If the data was indeed fraudulent, the verifier runs the computation on-chain and the smart contract will verify the data. The sequencer will then lose their deposit, a part of which will be sent as a reward to the verifier, and the other amount burnt. As all transaction data is submitted on-chain, a new sequencer will be able to compute the data and replace the role of the previous sequencer. 
<br/><br/>
This creates:
                    </p>
                    <ul>
                      <li>
                      An economic incentive for sequencers to act honestly 
                      </li>
                      <li>
                      An economic incentive for verifiers to check on the sequencers
                      </li>
                    </ul>
                    <p>
                    There will also be other parties that are incentivised to verify sequencer data, such as stakeholders on Optimism or stakeholders of Dapps deployed on Optimism. 
However, there are still two issues with Optimism:
<br/><br/>
    1. Seven day lock-up periods for withdrawing back onto Ethereum 
    <br/><br/>
Since there is a window of time where verifiers run fraud proofs to check on sequencers, users have a waiting period before withdrawing their funds back to Ethereum. This issue is easily solved with liquidity providers that help users instantly withdraw funds back to Ethereum for a fee. 
<br/><br/>
    2. Composability 
    <br/><br/>
Dapps on Optimism cannot interact with other Dapps deployed on Ethereum or other Layer 2 scaling solutions in the same transaction. But since every application on Ethereum can be copied onto Optimism easily, there may be not much need for cross-chain composability. That said, Connext Network will be tackling this issue.  
                    </p>
                    <a href={'https://zerocap.com/optimism-the-new-solution-for-ethereum/'}>Source</a>
                </div>
           </div>
        </>
    }
}