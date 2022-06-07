import React, { Component } from "react";
import blackDiscordIcon from '../../src/assets/discord-black-icon-703937.jpg';
import { generalAPI } from "../services/global/apiServices";

export default class DiscordBanner extends Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return <>
            <div style={{ backgroundColor: '#7289da', borderRadius: 3, marginBottom: '5px' }}>
                <img className={"small-img"} src={blackDiscordIcon}></img>
                <a style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }} href={'https://discord.gg/jWPcsTzpCT'}>
                    Click here to join our Discord channel
                </a>
                <img className={"small-img"} src={blackDiscordIcon}></img>
            </div>
        </>;
    }
}