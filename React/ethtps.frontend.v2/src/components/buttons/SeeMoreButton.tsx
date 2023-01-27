import { ArrowDownward, ArrowUpward } from "@mui/icons-material"
import { Button } from "@mui/material"
import { useState } from "react"

interface ISeeMoreButtonEvents {
  onSeeMore?: () => void
  onSeeLess?: () => void
}

export function SeeMoreButton(events: ISeeMoreButtonEvents) {
  const [expand, setExpand] = useState(true)
  const onClick = () => {
    if (expand) {
      if (events.onSeeMore !== undefined) {
        events.onSeeMore()
      }
    } else {
      if (events.onSeeLess !== undefined) {
        events.onSeeLess()
      }
    }
    setExpand(!expand)
  }
  const getIcon = () => (expand ? <ArrowDownward /> : <ArrowUpward />)
  return (
    <>
      <Button
        variant="text"
        sx={{
          width: "100%",
        }}
        startIcon={getIcon()}
        endIcon={getIcon()}
        onClick={() => onClick()}
      >
        See {expand ? "more" : "less"}
      </Button>
    </>
  )
}
