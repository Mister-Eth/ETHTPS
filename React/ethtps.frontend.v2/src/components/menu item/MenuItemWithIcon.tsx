import { IconButton, MenuItem, Tooltip, Typography } from "@mui/material"
import { openNewTab } from "../../services/LinksHelper"
import { DataArray } from "@mui/icons-material"
import { AnimatedButtonWithIcon } from "../buttons/AnimatedButtonWithIcon"

interface IButtonProperties {
  image: JSX.Element
  text: string
  href: string
  openInNewTab: boolean
  myKey: React.Key
  onMouseOverCapture?: () => void
}

// No animation YET
export function MenuItemWithIcon(props: IButtonProperties): JSX.Element {
  const handleClick = () => {
    if (props.openInNewTab) {
      openNewTab(props.href)
    } else {
      window.location.href = props.href
    }
  }
  return (
    <>
      <MenuItem
        key={props.myKey}
        onMouseOverCapture={props.onMouseOverCapture}
        onClick={handleClick}
      >
        <AnimatedButtonWithIcon
          showText
          openInNewTab={false}
          image={props.image}
          href={"https://api.ethtps.info/API/v2/AllData"}
          text={props.text}
        />
      </MenuItem>
    </>
  )
}
