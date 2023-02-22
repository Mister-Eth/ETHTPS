import {
	Tooltip,
	Typography,
	IconButton,
	Paper,
	DialogTitle,
	Dialog,
	List,
	ListItem,
	Box,
} from '@mui/material'
import React from 'react'
import { QuestionMark } from '@mui/icons-material'
import { useState } from 'react'
import { ConditionalRender } from '../../../Types'
import { FaceRatingGroup } from '../feedback/FaceRatingGroup'

export function SimpleDesktopFeedbackExperiment() {
	const [display, setDisplay] = useState(false)
	const [showPopup, setShowPopup] = useState(false)
	setTimeout(() => {
		setDisplay(true)
	}, 1 * 1000) //Display after 15 seconds

	const handleClickOpen = () => {
		setShowPopup(true)
	}

	const handleClose = () => {
		setShowPopup(false)
	}

	return (
		<React.Fragment>
			{ConditionalRender(
				<div
					style={{
						position: 'fixed',
						top: 'auto',
						bottom: '2rem',
						left: 'auto',
						right: '2rem',
					}}>
					<Paper onClick={handleClickOpen}>
						<Tooltip
							arrow
							placement="left"
							title={
								<Typography>
									Do you like the changes?
								</Typography>
							}>
							<IconButton onClick={handleClickOpen}>
								<QuestionMark />
							</IconButton>
						</Tooltip>
					</Paper>

					{ConditionalRender(
						<Dialog onClose={handleClose} open>
							<List sx={{ pt: 0 }}>
								<ListItem>
									<DialogTitle sx={{ fontWeight: 'bold' }}>
										How would you rate the new version of
										the website?
									</DialogTitle>
								</ListItem>
								<ListItem>
									<Box sx={{ width: '95%' }}>
										<FaceRatingGroup />
									</Box>
								</ListItem>
							</List>
						</Dialog>,
						showPopup
					)}
				</div>,
				display
			)}
		</React.Fragment>
	)
}
