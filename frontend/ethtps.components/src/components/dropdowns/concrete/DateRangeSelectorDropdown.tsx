import { addDays } from 'date-fns'
import { useState, useEffect } from 'react'
import { DateRange, Range as RRange } from 'react-date-range'
import {
	Chip,
	ClickAwayListener,
	Grow,
	MenuItem,
	MenuList,
	Paper,
	Popper,
} from '@mui/material'
import React from 'react'
import ButtonGroup from '@mui/material/ButtonGroup'

interface IDateRangeSelectorDropdownConfiguration {
	hidden?: boolean
}

export function DateRangeSelectorDropdown(
	config: IDateRangeSelectorDropdownConfiguration
) {
	const [state, setState] = useState<RRange[] | undefined>([
		{
			startDate: new Date(),
			endDate: addDays(new Date(), 7),
			key: 'selection',
		},
	])
	const [popperOpen, setPopperOpen] = useState(!config.hidden)
	useEffect(() => {
		setPopperOpen(!config.hidden)
	}, [config.hidden])
	const anchorRef = React.useRef<HTMLDivElement>(null)

	const handleToggle = () => {
		setPopperOpen((prevOpen) => !prevOpen)
	}

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
	const hoverEvents = config.hidden
		? {}
		: {
				onMouseOverCapture: clearHoverAwayTimeout,
				onClick: handleToggle,
				onMouseOutCapture: setHoverAwayTimeout,
				onMouseDownCapture: () => setPopperOpen(true),
		  }
	return (
		<React.Fragment>
			<ButtonGroup
				{...hoverEvents}
				variant="outlined"
				ref={anchorRef}
				aria-label="split button"
				color={'primary'}
				sx={{
					cursor: 'pointer',
					opacity: config.hidden ? 0 : 1,
				}} //Fix for mobile devices needing to hold tap
			>
				<Chip
					color="primary"
					label={
						state === undefined
							? 'Range'
							: state[0].startDate?.toLocaleDateString() +
							  ' - ' +
							  state[0].endDate?.toLocaleDateString()
					}
					variant="outlined"
				/>
			</ButtonGroup>
			<Popper
				sx={{
					zIndex: 1,
				}}
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
								<MenuList id="split-button-menu" autoFocusItem>
									<MenuItem
										{...hoverEvents}
										onClick={undefined}>
										range
									</MenuItem>
								</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		</React.Fragment>
	)
}
