import { Fragment } from "react"
import { useLiveData } from "../hooks"
import { Typography } from "@mui/material"
import {
  numberFormat,
  ConditionalRender,
  ConditionalSkeletonRender,
} from "../../../Types"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  Tooltip as ChartTooltip,
} from "chart.js"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartTooltip,
  Legend,
)

export function CustomStackedAnimation() {
  const liveData = useLiveData()
  return (
    <Fragment>
      {ConditionalSkeletonRender(
        <Typography>
          {`Ethereum is doing ${numberFormat(liveData?.total)} ${
            liveData?.mode
          }`}
          <Line
            data={{
              labels: ["a", "b", "c"],
              datasets: [
                {
                  label: "My Fourth dataset",
                  data: [1, 4, 2],
                  borderColor: "#ff0000",
                  backgroundColor: "#aa0000",
                  fill: true,
                },
              ],
            }}
          />
        </Typography>,
        liveData !== undefined,
      )}
    </Fragment>
  )
}
