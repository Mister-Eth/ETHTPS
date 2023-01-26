import * as React from "react"
import Button from "@mui/material/Button"
import ButtonGroup from "@mui/material/ButtonGroup"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import ClickAwayListener from "@mui/material/ClickAwayListener"
import Grow from "@mui/material/Grow"
import Paper from "@mui/material/Paper"
import Popper from "@mui/material/Popper"
import MenuItem from "@mui/material/MenuItem"
import MenuList from "@mui/material/MenuList"
import { Tooltip } from "@mui/material"
import { useGetNetworksFromAppStore } from "../../hooks/DataHooks"
import { indexOfOr } from "../../services/ArrayHelper"
import { useEffect } from "react"

export function NetworksDropdown() {
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLDivElement>(null)
  const networks = useGetNetworksFromAppStore()
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  useEffect(() => {
    setSelectedIndex(indexOfOr(networks, "Mainnet"))
  }, [networks])

  const handleMenuItemClick = (network: string, index: number) => {
    setSelectedIndex(index)
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return
    }

    setOpen(false)
  }
  return (
    <React.Fragment>
      <ButtonGroup
        variant="outlined"
        ref={anchorRef}
        aria-label="split button"
        color={"primary"}
      >
        <Tooltip title={"Choose network"}>
          <Button
            color={"primary"}
            endIcon={<ArrowDropDownIcon />}
            onClick={handleToggle}
          >
            {networks[selectedIndex]}
          </Button>
        </Tooltip>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {networks.map((network, index) => (
                    <MenuItem
                      key={network}
                      selected={index === selectedIndex}
                      onClick={() => handleMenuItemClick(network, index)}
                    >
                      {network}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  )
}
