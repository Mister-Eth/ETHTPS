import React from 'react';
import githubIcon from '../../assets/600px-Octicons-mark-github.svg - inv.png';
import twitterIcon from '../../assets/1486053611-twitter_79195.png';
import discordIcon from '../../assets/discord-mascot.png';
import blackDiscordIcon from '../../assets/discord-black-icon-703937.jpg';
import { Link } from "react-router-dom";

export default function LargeHeader(): JSX.Element {
    return <>
        <br></br>
        <div style={{ backgroundColor: 'yellow', borderRadius: 3, marginBottom: '5px' }}>
            <p style={{ color: 'black', fontWeight: 'bold', fontSize: 15 }} ref={'https://discord.gg/jWPcsTzpCT'}>
                Upgrade complete. Restoring data...
            </p>
        </div>
        <div style={{ backgroundColor: '#7289da', borderRadius: 3, marginBottom: '5px' }}>
            <img className={"small-img"} src={blackDiscordIcon}></img>
            <a style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }} ref={'https://discord.gg/jWPcsTzpCT'}>
                Click here to join our Discord channel
            </a>
            <img className={"small-img"} src={blackDiscordIcon}></img>
        </div>
        <Link to="/">
            <div className={"jumpy unselectable"}>ETHTPS.info</div>
        </Link>
        <br></br>
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
        <hr />
    </>;

}