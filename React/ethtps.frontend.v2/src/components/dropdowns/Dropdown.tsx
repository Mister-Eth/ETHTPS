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
import { indexOfOr } from "../../services/ArrayHelper"
import { useEffect } from "react"
import { IDropdownCallback } from "./IDropdownCallback"
import { ConditionalRender } from "../../Types"

interface IDropdownConfiguration<T> extends IDropdownCallback<T> {
  options: string[]
  hidden?: boolean
  hoverText?: string | JSX.Element
  selectionChanged?: (value: T) => void
  conversionFunction(value: string): T
}

export function Dropdown<T>(configuration: IDropdownConfiguration<T>) {
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef<HTMLDivElement>(null)
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  useEffect(() => {
    setSelectedIndex(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleMenuItemClick = (value: string, index: number) => {
    setSelectedIndex(index)
    setOpen(false)
    if (configuration.selectionChanged !== undefined)
      configuration.selectionChanged(configuration.conversionFunction(value))
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
  return ConditionalRender(
    <React.Fragment>
      <ButtonGroup
        variant="outlined"
        ref={anchorRef}
        aria-label="split button"
        color={"primary"}
      >
        <Tooltip title={configuration.hoverText}>
          <Button
            color={"primary"}
            endIcon={<ArrowDropDownIcon />}
            onClick={handleToggle}
          >
            {configuration.options[selectedIndex]}
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
                  {configuration.options.map((value, index) => (
                    <MenuItem
                      key={value}
                      selected={index === selectedIndex}
                      onClick={() => handleMenuItemClick(value, index)}
                    >
                      {value}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>,
    !configuration.hidden,
  )
}
