import { Fragment, useEffect, useRef, useState } from "react"
import { ProviderIntervalDropdown } from "../dropdowns/ProviderIntervalDropdown"
import { IntervalDropdown } from "../dropdowns/IntervalDropdown"
import { XYChart } from "./xy/XYChart"
import { ConditionalRender, ConditionalSkeletonRender } from "../../Types"

export function MultiProviderVSIXChart() {
  const [containerWidth, setContainerWidth] = useState(0)
  const containerRef = useRef<any>(null)
  useEffect(() => {
    setContainerWidth(
      containerRef.current ? containerRef.current.offsetWidth : 0,
    )
  }, [containerRef.current])
  return (
    <Fragment>
      <div className="container" ref={containerRef}>
        {ConditionalSkeletonRender(
          <XYChart width={containerWidth} height={containerWidth / 1.41} />,
          containerWidth > 0,
        )}
      </div>
    </Fragment>
  )
}
