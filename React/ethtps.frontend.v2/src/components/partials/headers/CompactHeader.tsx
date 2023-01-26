import { Link } from "react-router-dom"
import { NetworksDropdown } from "../../dropdowns/NetworksDropdown"
import { LinksSection } from "../LinksSection"

export default function CompactHeader(): JSX.Element {
  const elementSize = 30
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
      <NetworksDropdown />
      <LinksSection />
      <hr />
    </>
  )
}
