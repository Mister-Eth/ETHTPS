import { Link } from "react-router-dom"
import { LinksSection } from "../LinksSection"
import { Container } from "@mui/material"

interface ICompactHeaderConfig {
  floating: boolean
}

export default function CompactHeader(
  config: ICompactHeaderConfig,
): JSX.Element {
  const elementSize = 30
  return (
    <>
      <Container
        sx={{
          position: config.floating ? "absolute" : "relative",
        }}
      >
        <Link to="/">
          <br />
          <div
            className={"jumpy unselectable"}
            style={{
              fontSize: elementSize,
              display: "inline",
            }}
          >
            ETHTPS.info
          </div>
        </Link>
        <LinksSection />
      </Container>
    </>
  )
}
