import './NetworkSummary.css'
import React from 'react';

export default class NetworkSummary extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            details: props.details,
            name: props.name,
            hidel2BeatReference: props.hidel2BeatReference
        }
    }

    propNames = {
        "websites": "Website",
        "apps": "Apps",
        "documentation": "Documentation",
        "explorers": "Explorers",
        "repositories": "Repositories",
        "socialMedia": "Social media",
        'bridges': "Bridges"
    }
    
    render(){
        return <>
            <div className={'summaryBox'}>
                <center>
                    <img className={'xlarge'} src={`/provider-icons/${this.state.name}.png`} />
                    <h2>
                        {this.state.name}
                    </h2>
                </center>
                 <table align={'left'}>
                    <tbody>
                        {Object.keys(this.state.details).filter(y => this.state.details[y] !== undefined).map(x => 
                            <>
                              <tr>
                                <td>
                                    {this.propNames[x]}
                                </td>
                                <td>
                                    {(Array.isArray(this.state.details[x])?
                                    this.state.details[x].map(y=>
                                        <>
                                        <a  style={{color:'darkblue'}} href={[y]}>{[y].toString().replace('https://', '')}</a><br/>
                                        </>)
                                    :
                                    <a  style={{color:'darkblue'}} href={this.state.details[x]}>{this.state.details[x].toString().replace('https://', '')}</a>)}
                                </td>
                               </tr>
                        </>)}
                    </tbody>
                </table>
                {(this.state.hidel2BeatReference)?<></>:<center>
                    Summary data provided by <a style={{color:'darkblue'}} href="https://l2beat.com?ref=https://ethtps.info">l2beat.com</a>
                </center>}
            </div>
        </>
    }
}