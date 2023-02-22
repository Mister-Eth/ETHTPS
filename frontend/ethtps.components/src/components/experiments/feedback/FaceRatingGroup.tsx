import { styled } from '@mui/material/styles'
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied'
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied'
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined'
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied'
import { Paper, Grid, Tooltip, Typography, IconButton } from '@mui/material'

const customIcons = [
	{
		icon: (
			<SentimentVeryDissatisfiedIcon fontSize="inherit" color="error" />
		),
		label: 'Very bad',
	},
	{
		icon: <SentimentDissatisfiedIcon fontSize="inherit" color="error" />,
		label: 'Bad',
	},
	{
		icon: <SentimentSatisfiedIcon fontSize="inherit" color="warning" />,
		label: 'Meh',
	},
	{
		icon: <SentimentSatisfiedAltIcon fontSize="inherit" color="success" />,
		label: 'Good',
	},
	{
		icon: <SentimentVerySatisfiedIcon fontSize="inherit" color="success" />,
		label: 'Great',
	},
]

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'center',
	color: theme.palette.text.secondary,
}))

export function FaceRatingGroup() {
	return (
		<Grid container>
			{customIcons.map((x, i) => (
				<Tooltip
					arrow
					key={i}
					placement="bottom"
					title={<Typography>{x.label}</Typography>}>
					<Grid xs item={true}>
						<Item>
							<IconButton sx={{ fontSize: '4em' }}>
								{x.icon}
							</IconButton>
						</Item>
					</Grid>
				</Tooltip>
			))}
		</Grid>
	)
}
