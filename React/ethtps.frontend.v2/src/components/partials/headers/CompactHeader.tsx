import githubIcon from "../../../assets/600px-Octicons-mark-github.svg.png"
import twitterIcon from "../../../assets/1486053611-twitter_79195.png"
import discordIcon from "../../../assets/discord-mascot.png"
import { Link } from "react-router-dom"

export default function CompactHeader(): JSX.Element {
  const elementSize = 30
  let imageSize = { width: elementSize * 0.9, height: elementSize * 0.9 }
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
            style={imageSize}
            className={"small-img"}
            src={githubIcon}
            alt={"Github icon"}
          ></img>
        </a>
        <a href="https://twitter.com/ethtps">
          <img
            style={imageSize}
            className={"small-img"}
            src={twitterIcon}
            alt={"Twitter icon"}
          ></img>
        </a>
        <a href="https://discord.gg/jWPcsTzpCT">
          <img
            style={imageSize}
            className={"small-img"}
            src={discordIcon}
            alt={"Discord icon"}
          ></img>
        </a>
      </div>
      <hr />
    </>
  )
}
