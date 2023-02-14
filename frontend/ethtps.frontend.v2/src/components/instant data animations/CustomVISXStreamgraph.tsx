import { Fragment } from "react"
import { StreamGraphProps } from "./types"
import { VISXLegend } from "./VISXLegend"
import { WebsocketStatusPartial } from "../stats/WebsocketStatusPartial"

export function CustomVISXStreamgraph({
  width,
  height,
  animate = true,
}: StreamGraphProps) {
  return (
    <Fragment>
      <div>
        <VISXLegend keys={["a"]} colors={["#000000"]} />
        <WebsocketStatusPartial />
        <svg width={width} height={height}>
          <g>
            <rect
              x={0}
              y={0}
              width={width}
              height={height}
              fill={"#ffdede"}
              rx={20}
            />
          </g>
        </svg>
      </div>
    </Fragment>
  )
}
