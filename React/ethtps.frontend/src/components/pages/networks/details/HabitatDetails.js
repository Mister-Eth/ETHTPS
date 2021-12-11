import React from "react";
import NetworkSummary from "../NetworkSummary";

export default class HabitatDetails extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            name: props.name,
            details: {
                description:
                  'Habitat is an optimistic rollup designed to allow community governance and treasury management.',
                purpose: 'Payments',
                links: {
                  websites: ['https://0xhabitat.org/'],
                  documentation: ['https://docs.0xhabitat.org/'],
                  apps:['https://0xhabitat.org/app/'],
                  explorers: ['https://0xhabitat.org/explorer/'],
                  repositories: ['https://github.com/0xHabitat/habitat'],
                  socialMedia: [
                    'https://twitter.com/EnterTheHabitat',
                    'https://discord.gg/4Cu6vBZhDp',
                    'https://0xhabitat.substack.com/',
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