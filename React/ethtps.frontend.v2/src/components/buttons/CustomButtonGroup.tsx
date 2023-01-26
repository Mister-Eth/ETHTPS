import { Button, ButtonGroup } from "@mui/material"

interface ICustomButtonGroupParameters {
  buttons?: string[]
}

export function CustomButtonGroup(params: ICustomButtonGroupParameters) {
  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      {params?.buttons?.map((x, i) => (
        <Button key={i}>{x}</Button>
      ))}
    </ButtonGroup>
  )
}
