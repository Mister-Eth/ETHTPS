import { IconButton, Tooltip, Typography } from "@mui/material"
import { openNewTab } from "../../services/LinksHelper"

interface IButtonProperties {
  image: JSX.Element
  text: string
  href: string
  showText?: boolean
  openInNewTab: boolean
}

// No animation YET
export function AnimatedButtonWithIcon(props: IButtonProperties): JSX.Element {
  const handleClick = () => {
    if (props.openInNewTab) {
      openNewTab(props.href)
    } else {
      window.location.href = props.href
    }
  }
  return (
    <>
      <Tooltip arrow title={<Typography>{props.text}</Typography>}>
        <IconButton onClick={handleClick} color={"primary"}>
          {props.image}
        </IconButton>
      </Tooltip>
      {props.showText ? <Typography>{props.text}</Typography> : <></>}
    </>
  )
}
