import { SocialMediaLinksSection } from "../SocialMediaLinksSection"
import { Container } from "@mui/material"
import { Logo } from "../Logo"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import { LinksSection } from "../LinksSection"

export default function CompactHeader(): JSX.Element {
  return (
    <>
      <AppBar position={"sticky"} enableColorOnDark={true} color={"default"}>
        <Toolbar>
          <Container>
            <Logo />
            <LinksSection />
            <SocialMediaLinksSection />
          </Container>
        </Toolbar>
      </AppBar>
    </>
  )
}
