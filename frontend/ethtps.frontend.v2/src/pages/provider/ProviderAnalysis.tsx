import { Paper, Typography } from '@mui/material'
import { Fragment, useEffect, useRef } from 'react'
import { ThresholdChart } from 'ethtps.components'
import { useState } from 'react'
import { IProviderPageModel } from 'ethtps.data'

export function ProviderAnalysis(props: IProviderPageModel) {
	const [containerWidth, setContainerWidth] = useState(0)
	const containerRef = useRef<any>(null)
	useEffect(() => {
		setContainerWidth(
			containerRef.current ? containerRef.current.offsetWidth : 0
		)
	}, [containerRef.current])
	return (
		<Fragment>
			<Paper ref={containerRef} elevation={1}>
				<Typography>Evolution over time</Typography>
				<Typography>2023 vs 2022</Typography>
				<ThresholdChart
					width={containerWidth}
					height={containerWidth / 1.41}
				/>
			</Paper>
		</Fragment>
	)
}
