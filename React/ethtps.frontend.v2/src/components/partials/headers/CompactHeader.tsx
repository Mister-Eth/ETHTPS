import { Link } from "react-router-dom"
import { LinksSection } from "../LinksSection"
import { Container } from "@mui/material"
import { Logo } from "../Logo"
import AppBar from "@mui/material/AppBar"

export default function CompactHeader(): JSX.Element {
  return (
    <>
      <AppBar position={"sticky"} enableColorOnDark={true} color={"default"}>
        <Container>
          <Logo />
          <LinksSection />
        </Container>
      </AppBar>
    </>
  )
}
