import { AnimatedButtonWithIcon } from "../buttons/AnimatedButtonWithIcon"
import { ButtonGroup } from "@mui/material"
import { GitHub, Twitter } from "@mui/icons-material"
import { DiscordIcon } from "../icons/DiscordIcon"

export function LinksSection(): JSX.Element {
  return (
    <>
      <ButtonGroup sx={{ float: "right" }}>
        <AnimatedButtonWithIcon
          image={<GitHub />}
          href={"https://github.com/Mister-Eth/ETHTPS"}
          text={"Github repository"}
        />
        <AnimatedButtonWithIcon
          image={<Twitter />}
          href={"https://twitter.com/ethtps"}
          text={"Twitter"}
        />
        <AnimatedButtonWithIcon
          image={<DiscordIcon />}
          href={"https://discord.gg/jWPcsTzpCT"}
          text={"Join our Discord"}
        />
      </ButtonGroup>
    </>
  )
}
