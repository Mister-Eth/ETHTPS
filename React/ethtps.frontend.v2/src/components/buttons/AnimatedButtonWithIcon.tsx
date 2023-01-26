import { Button, Tooltip } from "@mui/material"
import { openNewTab } from "../../services/LinksHelper"

interface IButtonProperties {
  image: JSX.Element
  text: string
  href: string
  showText?: boolean
}

// No animation YET
export function AnimatedButtonWithIcon(props: IButtonProperties): JSX.Element {
  return (
    <>
      <Tooltip title={props.text}>
        <Button startIcon={props.image} onClick={() => openNewTab(props.href)}>
          {props.showText ? props.text : ""}
        </Button>
      </Tooltip>
    </>
  )
}
