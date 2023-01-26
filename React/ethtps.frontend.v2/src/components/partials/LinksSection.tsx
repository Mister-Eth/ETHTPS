import { AnimatedButtonWithIcon } from "../buttons/AnimatedButtonWithIcon"
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
} from "@mui/material"
import {
  Api,
  ArrowDownward,
  ArrowForward,
  DataArray,
  GitHub,
  Info,
  LensBlurOutlined,
  LensOutlined,
  LinearScale,
  RocketLaunchOutlined,
  Twitter,
  RocketOutlined,
} from "@mui/icons-material"
import { DiscordIcon } from "../icons/DiscordIcon"
import Popper from "@mui/material/Popper"
import { useRef, useState } from "react"
import { MenuItemWithIcon } from "../menu item/MenuItemWithIcon"

export function LinksSection(): JSX.Element {
  const [popperOpen, setPopperOpen] = useState(false)
  const anchorRef = useRef<HTMLDivElement>(null)
  let hoverAwayRef: NodeJS.Timeout | undefined
  const clearHoverAwayTimeout = () => {
    clearInterval(hoverAwayRef)
    setPopperOpen(true)
  }
  const setHoverAwayTimeout = () => {
    hoverAwayRef = setTimeout(() => {
      setPopperOpen(false)
    }, 200)
  }
  return (
    <>
      <ButtonGroup ref={anchorRef} sx={{ float: "center" }}>
        <IconButton
          onMouseOverCapture={clearHoverAwayTimeout}
          onMouseOutCapture={setHoverAwayTimeout}
        >
          {popperOpen ? <RocketLaunchOutlined /> : <RocketOutlined />}
        </IconButton>
        <Popper
          open={popperOpen}
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
                <ClickAwayListener onClickAway={() => setPopperOpen(false)}>
                  <MenuList
                    autoFocusItem
                    onMouseOverCapture={clearHoverAwayTimeout}
                    onMouseOutCapture={setHoverAwayTimeout}
                  >
                    <MenuItemWithIcon
                      myKey={2}
                      openInNewTab
                      image={<Api />}
                      href={"https://api.ethtps.info/"}
                      text={"API reference"}
                    />
                    <MenuItemWithIcon
                      myKey={1}
                      openInNewTab={false}
                      image={<DataArray />}
                      href={"https://api.ethtps.info/API/v2/AllData"}
                      text={"Download data"}
                    />
                    <MenuItemWithIcon
                      myKey={3}
                      openInNewTab
                      image={<Info />}
                      href={"https://ethtps.info/About+"}
                      text={"About"}
                    />
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </ButtonGroup>
    </>
  )
}
