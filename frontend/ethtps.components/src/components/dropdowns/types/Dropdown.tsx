import * as React from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Grow from '@mui/material/Grow'
import Paper from '@mui/material/Paper'
import Popper from '@mui/material/Popper'
import MenuItem from '@mui/material/MenuItem'
import MenuList from '@mui/material/MenuList'
import { Tooltip, Typography } from '@mui/material'
import { ConditionalRender } from '../../../Types'
import { IDropdownConfiguration } from './IDropdownConfiguration'

export function Dropdown<T>(configuration: IDropdownConfiguration<T>) {
	const [open, setOpen] = React.useState(false)
	const anchorRef = React.useRef<HTMLDivElement>(null)
	const [selectedIndex, setSelectedIndex] = React.useState(0)

	const handleMenuItemClick = (value: string, index: number) => {
		if (index === selectedIndex) return
		setOpen(false)
		setSelectedIndex(index)
		if (configuration.selection?.callback)
			configuration.selection?.callback(
				configuration.conversionFunction(value)
			)
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
	let hoverAwayRef: NodeJS.Timeout | undefined
	const clearHoverAwayTimeout = () => {
		clearInterval(hoverAwayRef)
		setOpen(true)
	}

	const setHoverAwayTimeout = () => {
		hoverAwayRef = setTimeout(() => {
			setOpen(false)
		}, 200)
	}
	const hoverEvents = {
		onMouseOverCapture: clearHoverAwayTimeout,
		onClick: handleToggle,
		onMouseOutCapture: setHoverAwayTimeout,
		onMouseDownCapture: () => setOpen(true),
	}
	return ConditionalRender(
		<React.Fragment>
			<ButtonGroup
				{...hoverEvents}
				variant="outlined"
				ref={anchorRef}
				aria-label="split button"
				color={'primary'}
				sx={{ cursor: 'pointer' }} //Fix for mobile devices needing to hold tap
			>
				<Tooltip arrow placement="top" title={configuration.hoverText}>
					<Button
						color={'primary'}
						endIcon={<ArrowDropDownIcon />}
						onClick={handleToggle}>
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
							<ClickAwayListener onClickAway={handleClose}>
								<MenuList id="split-button-menu" autoFocusItem>
									{configuration.options.map(
										(value, index) => (
											<Tooltip
												arrow
												key={value}
												placement="right"
												title={
													<Typography>
														{configuration.uiFormatFunction !==
														undefined
															? configuration.uiFormatFunction(
																	configuration.conversionFunction(
																		value
																	)
															  )
															: value}
													</Typography>
												}>
												<MenuItem
													{...hoverEvents}
													key={value}
													selected={
														index === selectedIndex
													}
													onClick={() =>
														handleMenuItemClick(
															value,
															index
														)
													}>
													{value}
												</MenuItem>
											</Tooltip>
										)
									)}
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</React.Fragment>,
		!configuration.hidden
	)
}
