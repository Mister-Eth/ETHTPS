/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { Stack } from '@visx/shape'
import { PatternCircles } from '@visx/pattern'
import { scaleLinear, scaleOrdinal } from '@visx/scale'
import { transpose } from 'd3-array'
import { animated, useSpring } from '@react-spring/web'

import { WebsocketStatusPartial } from '../stats/WebsocketStatusPartial'
import { useEffect } from 'react'
import { useState } from 'react'
import { curveCardinal } from '@visx/curve'
import { useQuery } from 'react-query'
import moment from 'moment'
import { L2DataResponseModel, DataType } from 'ethtps.api.client'
import { colorHooks } from 'ethtps.data'
import Fragment from 'react'
// constants
const NUM_LAYERS = 20
export const BACKGROUND = '#ffdede'

// utils
const range = (n: number) => Array.from(new Array(n), (_, i) => i)

const keys = range(NUM_LAYERS)

// scales
const xScale = scaleLinear<number>({})
const yScale = scaleLinear<number>({})

// accessors
type Datum = number[]
const getY0 = (d: Datum) => {
	return yScale(Math.min(...d)) ?? 0
}
const getY1 = (d: Datum) => {
	return yScale(Math.max(...d)) ?? 0
}

export type StreamGraphProps = {
	width: number
	height: number
	animate?: boolean
	providerHovered?: (name: string) => void
}

type StreamchartLayers = {
	data: number[][]
	providers: string[]
}

export function CustomVISXStreamgraph({
	width,
	height,
	animate = true,
}: StreamGraphProps) {
	//const forceUpdate = useForceUpdate()
	//const handlePress = () => forceUpdate()

	if (width < 10) return null

	const liveState = useLiveDataState()
	const [pastData, setPastData] = useState<L2DataResponseModel>()
	const colors = colorHooks.useGetProviderColorDictionaryFromAppStore()
	const [processedStreamchartData, setProcessedStreamchartData] =
		useState<StreamchartLayers>({
			providers: ['Mock until loaded'],
			data: [range(60).map(() => Math.random() * 10)],
		})
	const { data, isSuccess, refetch } = useQuery('get past data', () =>
		api.getL2Data({
			dataType: liveState?.mode ?? DataType.Tps,
			l2DataRequestModel: {
				startDate: moment().subtract(1, 'minute').toDate(),
				providers: ['All'],
				includeSidechains: liveState.sidechainsIncluded,
				mergeOptions: {
					mergePercentage: 10,
				},
			},
		})
	)
	const [max, setMax] = useState(0)
	useEffect(() => {
		refetch()
	}, [liveState.mode, liveState.sidechainsIncluded, liveState.smoothing])
	useEffect(() => {
		if (isSuccess) {
			setPastData(data)
			if (pastData?.simpleAnalysis?.allDatasetsSameLength) {
				let length = Math.min(
					pastData?.simpleAnalysis?.uniformDatasetLength ?? 1,
					60
				)
				xScale.domain([0, length - 1])
				if (pastData.datasets)
					setProcessedStreamchartData({
						providers: pastData.datasets.map(
							(x) => x.provider as string
						),
						data: pastData.datasets.map(
							(x) =>
								x.dataPoints
									?.slice(0, length)
									.map((y) => y.y as number) ?? []
						),
					})
			}
		}
	}, [data])
	const liveData = useLiveData()
	const [dataPoints, setDataPoints] = useState<number[]>([0, 0, 0])
	useEffect(() => {
		if (liveData) {
			setDataPoints(liveData.data?.map((x) => x?.value ?? 0))
			let temp = processedStreamchartData
			let currentMax = 0
			for (let i = 0; i < temp.providers.length; i++) {
				temp.data[i].shift()
				currentMax = Math.max(currentMax, Math.max(...temp.data[i]))
				const v =
					liveData.data?.find(
						(x) => x.providerName === temp.providers[i]
					)?.value ?? 0 //temp.data[i][temp.data.length - 1]
				temp.data[i].push(v)
			}
			setMax(currentMax)
			//yScale.domain([-max, max])
			setProcessedStreamchartData(temp)
		}
	}, [liveData])
	xScale.range([0, width])
	xScale.domain([0, 59])
	yScale.range([height, 0])
	useEffect(() => {
		const n = Math.ceil((max / 10) * 10)
		const m = Math.floor((max / 10) * 10)
		yScale.domain([-m, n * 1.5])
	}, [max])
	yScale.clamp(true)
	const colorFunction = (key: number, index: number) =>
		colors ? colors[processedStreamchartData.providers[index]] : 'yellow'
	const customScale = (x: number) => colorFunction(0, x)
	const pathRefs = range(processedStreamchartData.data.length).map(() =>
		React.createRef<any>()
	)
	const [highlightedIndex, setHighlightedIndex] = useState(0)
	return (
		<Fragment>
			<WebsocketStatusPartial />
			<svg width={width} height={height}>
				<PatternCircles
					id={'circles'}
					height={40}
					width={40}
					radius={5}
					fill={'black'}
					complement
				/>
				<PatternCircles
					id={'hovered-circles'}
					height={40}
					width={40}
					radius={5}
					fill={'white'}
					complement
				/>
				<g>
					<rect
						x={0}
						y={0}
						width={width}
						height={height}
						fill={BACKGROUND}
						rx={24}
					/>
					<Stack<number[], number>
						data={transpose<number>(processedStreamchartData.data)}
						keys={keys}
						curve={curveCardinal}
						accumulate={'sum'}
						offset="wiggle"
						color={colorFunction}
						x={(_, i) => xScale(i) ?? 0}
						y0={getY0}
						y1={getY1}>
						{({ stacks, path }) =>
							stacks.map((stack) => {
								// Alternatively use renderprops <Spring to={{ d }}>{tweened => ...}</Spring>
								const pathString = path(stack) || ''
								const tweened = animate
									? useSpring({ pathString })
									: { pathString }
								const color = customScale(stack.key)
								return (
									<g key={`series-${stack.key}`}>
										<animated.path
											d={tweened.pathString}
											fill={color}
										/>
										<animated.path
											ref={pathRefs[stack.index]}
											onMouseEnter={() =>
												setHighlightedIndex(stack.index)
											}
											onMouseLeave={() =>
												setHighlightedIndex(-1)
											}
											d={tweened.pathString}
											fill={`url(#${
												stack.index === highlightedIndex
													? 'hovered-'
													: ''
											}circles)`}
										/>
									</g>
								)
							})
						}
					</Stack>
				</g>
			</svg>
		</Fragment>
	)
}
