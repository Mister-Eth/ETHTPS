import * as React from 'react'
import LinearProgress, {
	LinearProgressProps,
} from '@mui/material/LinearProgress'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

function LinearProgressWithLabel(
	props: LinearProgressProps & { value: number }
) {
	return (
		<React.Fragment>
			<Box sx={{ display: 'flex', alignItems: 'center' }}>
				<Box sx={{ width: '100%', mr: 1 }}>
					<LinearProgress variant="determinate" {...props} />
				</Box>
				<Box sx={{ minWidth: 35 }}>
					<Typography
						variant="body2"
						color="text.secondary">{`${Math.round(
						props.value
					)}%`}</Typography>
				</Box>
			</Box>
		</React.Fragment>
	)
}

interface ILinearWithValueLabelConfig {
	progress: number
}

export default function LinearWithValueLabel(
	config: ILinearWithValueLabelConfig
) {
	return (
		<React.Fragment>
			<Box sx={{ width: '100%' }}>
				<LinearProgressWithLabel value={config.progress} />
			</Box>
		</React.Fragment>
	)
}
