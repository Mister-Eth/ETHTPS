import { Button } from "@mui/material"

interface IButtonProperties {
  image: JSX.Element
  text: string
  href: string
}

export function AnimatedButtonWithIcon(props: IButtonProperties): JSX.Element {
  return (
    <>
      <Button startIcon={props.image}>{props.text}</Button>
    </>
  )
}
