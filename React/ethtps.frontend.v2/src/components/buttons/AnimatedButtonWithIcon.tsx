import { IconButton, Tooltip } from "@mui/material"

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
        <IconButton color={"primary"}>{props.image}</IconButton>
      </Tooltip>
    </>
  )
}
