import React from 'react';
import githubIcon from '../../assets/600px-Octicons-mark-github.svg.png';
import twitterIcon from '../../assets/1486053611-twitter_79195.png';
import discordIcon from '../../assets/discord-mascot.png';
import blackDiscordIcon from '../../assets/discord-black-icon-703937.jpg';
import { Link } from "react-router-dom";

export default function CompactHeader() {
    const elementSize = 30;
    let imageSize = { width: elementSize * 0.9, height: elementSize * 0.9 };
    return <>
        <Link to="/">
            <br />
            <div className={"jumpy unselectable"} style={{ fontSize: elementSize, display: 'inline' }}>ETHTPS.info</div>
        </Link>
        <div style={{ display: 'inline', float: 'right' }}>
            <a href="https://github.com/Mister-Eth/ETHTPS">
                <img style={imageSize} className={"small-img"} src={githubIcon}>
                </img>
            </a>
            <a href="https://twitter.com/ethtps">
                <img style={imageSize} className={"small-img"} src={twitterIcon}>
                </img>
            </a>
            <a href="https://discord.gg/jWPcsTzpCT">
                <img style={imageSize} className={"small-img"} src={discordIcon}>
                </img>
            </a>
        </div>
        <hr />
    </>;

}