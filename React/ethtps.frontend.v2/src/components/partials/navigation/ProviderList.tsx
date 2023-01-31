import * as React from "react"
import Box from "@mui/material/Box"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import { FixedSizeList, ListChildComponentProps } from "react-window"

function renderRow(props: ListChildComponentProps) {
  const { index, style } = props

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItemButton>
    </ListItem>
  )
}

export function ProviderList() {
  return <Box>List items sit here</Box>
}
