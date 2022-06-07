import React, { Component } from "react";
import { HeaderModel } from "./HeaderModel";
import githubIcon from '../../assets/600px-Octicons-mark-github.svg - inv.png';
import twitterIcon from '../../assets/1486053611-twitter_79195.png';
import discordIcon from '../../assets/discord-mascot.png';
import blackDiscordIcon from '../../assets/discord-black-icon-703937.jpg';
import { Link } from "react-router-dom";

export default class Header extends Component<HeaderModel> {
    constructor(props: HeaderModel) {
        super(props);
    }

    render() {
        return <>
            <Link to="/">
                <div className={"jumpy unselectable"}>{this.props.applicationName}</div>
            </Link>
            <br></br>
            <a href="https://github.com/Mister-Eth/ETHTPS">
                <img className={"small-img"} src={githubIcon}>
                </img>
            </a>
            <a href="https://twitter.com/ethtps">
                <img className={"small-img"} src={twitterIcon}>
                </img>
            </a>
            <a href="https://discord.gg/jWPcsTzpCT">
                <img className={"small-img"} src={discordIcon}>
                </img>
            </a>
        </>;
    }
}