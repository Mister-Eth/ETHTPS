import React from "react";
import githubIcon from "../../assets/600px-Octicons-mark-github.svg - inv.png";
import twitterIcon from "../../assets/1486053611-twitter_79195.png";
import discordIcon from "../../assets/discord-mascot.png";
import { Link } from "react-router-dom";

const elementSize = 30;
const imageSize = {
  width: elementSize,
  height: elementSize,
};

export function CompactHeader() {
  return (
    <>
      <Link to="/">
        <br />
        <div
          className={"jumpy unselectable"}
          style={{ fontSize: elementSize, display: "inline" }}
        >
          ETHTPS.info
        </div>
      </Link>
      <div style={{ display: "inline", float: "right" }}>
        <a href="https://github.com/Mister-Eth/ETHTPS">
          <img
            alt={"github"}
            style={imageSize}
            className={"small-img"}
            src={githubIcon}
          ></img>
        </a>
        <a href="https://twitter.com/ethtps">
          <img
            alt={"twitter"}
            style={imageSize}
            className={"small-img"}
            src={twitterIcon}
          ></img>
        </a>
        <a href="https://discord.gg/jWPcsTzpCT">
          <img
            alt={"discord"}
            style={imageSize}
            className={"small-img"}
            src={discordIcon}
          ></img>
        </a>
      </div>
      <hr />
    </>
  );
}
