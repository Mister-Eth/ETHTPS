import React from 'react'
import { Group } from '@visx/group'
import { AreaClosed } from '@visx/shape'
import { AxisLeft, AxisBottom, AxisScale } from '@visx/axis'
import { LinearGradient } from '@visx/gradient'
import { curveMonotoneX } from '@visx/curve'

// Initialize some variables
const axisColor = '#fff'
const axisBottomTickLabelProps = {
	textAnchor: 'middle' as const,
	fontFamily: 'Arial',
	fontSize: 10,
	fill: axisColor,
}
const axisLeftTickLabelProps = {
	dx: '-0.25em',
	dy: '0.25em',
	fontFamily: 'Arial',
	fontSize: 10,
	textAnchor: 'end' as const,
	fill: axisColor,
}

export default function AreaChart({
	data,
	gradientColor,
	width,
	yMax,
	margin,
	xScale,
	yScale,
	hideBottomAxis = false,
	hideLeftAxis = false,
	top,
	left,
	children,
}: {
	data: { x: Date; y: number }[]
	gradientColor: string
	xScale: AxisScale<number>
	yScale: AxisScale<number>
	width: number
	yMax: number
	margin: { top: number; right: number; bottom: number; left: number }
	hideBottomAxis?: boolean
	hideLeftAxis?: boolean
	top?: number
	left?: number
	children?: React.ReactNode
}) {
	if (width < 10) return null
	return (
		<React.Fragment>
			<Group left={left || margin.left} top={top || margin.top}>
				<LinearGradient
					id="gradient"
					from={gradientColor}
					fromOpacity={1}
					to={gradientColor}
					toOpacity={0.2}
				/>
				<AreaClosed<{ x: Date; y: number }>
					data={data}
					x={(d) => xScale(d.x) || new Date().getTime()}
					y={(d) => yScale(d.y) || 0}
					yScale={yScale}
					strokeWidth={1}
					stroke="url(#gradient)"
					fill="url(#gradient)"
					curve={curveMonotoneX}
				/>
				{!hideBottomAxis && (
					<AxisBottom
						top={yMax}
						scale={xScale}
						numTicks={width > 520 ? 10 : 5}
						stroke={axisColor}
						tickStroke={axisColor}
						tickLabelProps={() => axisBottomTickLabelProps}
					/>
				)}
				{!hideLeftAxis && (
					<AxisLeft
						scale={yScale}
						numTicks={5}
						stroke={axisColor}
						tickStroke={axisColor}
						tickLabelProps={() => axisLeftTickLabelProps}
					/>
				)}
				{children}
			</Group>
		</React.Fragment>
	)
}
