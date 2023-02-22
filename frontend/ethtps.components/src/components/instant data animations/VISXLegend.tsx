import { scaleOrdinal } from '@visx/scale'
//import { GlyphStar, GlyphWye, GlyphTriangle, GlyphDiamond } from '@visx/glyph'
import { Legend, LegendItem, LegendLabel } from '@visx/legend'
import React from 'react'

interface VISXLegendProperties {
	keys?: string[] | null
	colors?: string[] | null
} /*
const shapeScale = scaleOrdinal<string, React.FC | React.ReactNode>({
	domain: ['a', 'b', 'c', 'd', 'e'],
	range: [
		<GlyphStar
			key="a"
			size={50}
			top={50 / 6}
			left={50 / 6}
			fill="#dd59b8"
		/>,
		<GlyphWye
			key="b"
			size={50}
			top={50 / 6}
			left={50 / 6}
			fill="#de6a9a"
		/>,
		<GlyphTriangle
			key="c"
			size={50}
			top={50 / 6}
			left={50 / 6}
			fill="#de7d7b"
		/>,
		<GlyphDiamond
			key="d"
			size={50}
			top={50 / 6}
			left={50 / 6}
			fill="#df905f"
		/>,
		() => (
			<text key="e" fontSize="12" dy="1em" dx=".33em" fill="#e0a346">
				$
			</text>
		),
	],
})
*/
const legendGlyphSize = 20
export function VISXLegend({ keys, colors }: VISXLegendProperties) {
	if (keys && colors) {
		const scale = scaleOrdinal({
			domain: keys,
			range: colors,
		})
		return (
			<React.Fragment>
				<div
					style={{
						position: 'relative',
						float: 'right',
						transform: 'translateY(-110%)',
						marginRight: '10px',
					}}>
					<Legend scale={scale}>
						{(labels) => (
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
								}}>
								{labels.map((label, i) => {
									//const color = scale(label.datum)
									//const shape = shapeScale(label.datum)
									//const isValidElement = React.isValidElement(shape)
									return (
										<LegendItem
											key={`legend-quantile-${i}`}
											margin="0 4px 0 0"
											flexDirection="row"
											onClick={() => {
												//const { datum, index } = label
											}}>
											<svg
												width={legendGlyphSize}
												height={legendGlyphSize}>
												<rect
													fill={label.value}
													width={legendGlyphSize}
													height={legendGlyphSize}
												/>
											</svg>
											<LegendLabel
												align="left"
												margin={0}>
												{label.text}
											</LegendLabel>
										</LegendItem>
									)
								})}
							</div>
						)}
					</Legend>
				</div>
			</React.Fragment>
		)
	}
	return <></>
}
