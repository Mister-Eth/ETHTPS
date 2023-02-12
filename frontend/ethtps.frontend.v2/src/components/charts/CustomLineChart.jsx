import { ResponsiveLine } from "@nivo/line"
import { commonNivoProperties } from "./ChartTypes"
import { NivoStreamgraph } from "../instant data animations/streamgraph/NivoStreamgraph"
export function CustomLineChart({ data /* see data tab */ }) {
  console.log(data)
  return (
    <>
      <NivoStreamgraph />
      <div style={{ height: "400px" }}>
        <ResponsiveLine
          {...commonNivoProperties}
          data={[
            {
              id: "fake corp. A",
              data: [
                { x: "2018-01-01", y: 7 },
                { x: "2018-01-02", y: 5 },
                { x: "2018-01-03", y: 11 },
                { x: "2018-01-04", y: 9 },
                { x: "2018-01-05", y: 12 },
                { x: "2018-01-06", y: 16 },
                { x: "2018-01-07", y: 13 },
                { x: "2018-01-08", y: 13 },
              ],
            },
            {
              id: "fake corp. B",
              data: [
                { x: "2018-01-04", y: 14 },
                { x: "2018-01-05", y: 14 },
                { x: "2018-01-06", y: 15 },
                { x: "2018-01-07", y: 11 },
                { x: "2018-01-08", y: 10 },
                { x: "2018-01-09", y: 12 },
                { x: "2018-01-10", y: 9 },
                { x: "2018-01-11", y: 7 },
              ],
            },
          ]}
          xScale={{
            type: "time",
            format: "%Y-%m-%d",
            useUTC: false,
            precision: "day",
          }}
          xFormat="time:%Y-%m-%d"
          yScale={{
            type: "linear",
            stacked: false,
          }}
          axisLeft={{
            legend: "linear scale",
            legendOffset: 12,
          }}
          axisBottom={{
            format: "%b %d",
            tickValues: "every 2 days",
            legend: "time scale",
            legendOffset: -12,
          }}
          curve={"monotoneX"}
          enablePointLabel={true}
          pointSize={16}
          pointBorderWidth={1}
          pointBorderColor={{
            from: "color",
            modifiers: [["darker", 0.3]],
          }}
          useMesh={true}
          enableSlices={false}
        />
      </div>
    </>
  )
}
