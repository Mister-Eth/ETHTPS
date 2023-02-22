import {
	ButtonGroup,
	ClickAwayListener,
	Grow,
	IconButton,
	MenuList,
	Paper,
} from '@mui/material'
import {
	Api,
	DataArray,
	RocketLaunchOutlined,
	RocketOutlined,
	QuestionMarkOutlined,
} from '@mui/icons-material'
import Popper from '@mui/material/Popper'
import { useRef, useState } from 'react'
import { MenuItemWithIcon } from '../menu item/MenuItemWithIcon'
import React from 'react'

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
		<React.Fragment>
			<ButtonGroup ref={anchorRef} sx={{ float: 'center' }}>
				<IconButton
					onMouseOverCapture={clearHoverAwayTimeout}
					onMouseOutCapture={setHoverAwayTimeout}>
					{popperOpen ? <RocketLaunchOutlined /> : <RocketOutlined />}
				</IconButton>
				<Popper
					open={popperOpen}
					anchorEl={anchorRef.current}
					role={undefined}
					transition
					disablePortal>
					{({ TransitionProps, placement }) => (
						<Grow
							{...TransitionProps}
							style={{
								transformOrigin:
									placement === 'bottom'
										? 'center top'
										: 'center bottom',
							}}>
							<Paper>
								<ClickAwayListener
									onClickAway={() => setPopperOpen(false)}>
									<MenuList
										autoFocusItem
										onMouseOverCapture={
											clearHoverAwayTimeout
										}
										onMouseOutCapture={setHoverAwayTimeout}>
										<MenuItemWithIcon
											myKey={2}
											openInNewTab
											image={<Api />}
											href={'https://api.ethtps.info/'}
											text={'API'}
										/>
										<MenuItemWithIcon
											myKey={1}
											openInNewTab={false}
											image={<DataArray />}
											href={
												'https://api.ethtps.info/API/v2/AllData'
											}
											text={'Download data'}
										/>
										<MenuItemWithIcon
											myKey={4}
											openInNewTab
											image={<QuestionMarkOutlined />}
											href={'https://v1.ethtps.info'}
											text={'Old version'}
										/>
									</MenuList>
								</ClickAwayListener>
							</Paper>
						</Grow>
					)}
				</Popper>
			</ButtonGroup>
		</React.Fragment>
	)
}
