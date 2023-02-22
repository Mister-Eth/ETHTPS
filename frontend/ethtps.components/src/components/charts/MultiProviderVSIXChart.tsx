import { useEffect, useRef, useState } from 'react'
import { ConditionalSkeletonRender } from '../../Types'
import React from 'react'

export function MultiProviderVSIXChart() {
	const [containerWidth, setContainerWidth] = useState(0)
	const containerRef = useRef<any>(null)
	useEffect(() => {
		setContainerWidth(
			containerRef.current ? containerRef.current.offsetWidth : 0
		)
	}, [containerRef.current])
	return (
		<React.Fragment>
			<div className="container" ref={containerRef}>
				{ConditionalSkeletonRender(<></>, containerWidth > 0)}
			</div>
		</React.Fragment>
	)
}
