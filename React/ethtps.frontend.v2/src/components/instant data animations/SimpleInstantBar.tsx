import { Fragment, useEffect, useState } from "react"
import {
  toShortString,
  extractData,
  getModeData,
  ConditionalRender,
  ConditionalSkeletonRender,
} from "../../Types"
import {
  DataResponseModelDictionary,
  GenericDictionary,
} from "../../Types.dictionaries"
import {
  useGetLiveDataModeFromAppStore,
  useGetLiveDataSmoothingFromAppStore,
  useGetLiveDataFromAppStore,
} from "../../hooks/LiveDataHooks"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import { objectKeys } from "ts-extras"
import { useGetProvidersFromAppStore } from "../../hooks/ProviderHooks"
import { ProviderModel } from "../../services/api-gen/models/ProviderModel"
import { noGrid } from "../charts/ChartTypes"
import { useGetProviderColorDictionaryFromAppStore } from "../../hooks/ColorHooks"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    scales: {
      x: {
        ...noGrid,
      },
      y: {
        ...noGrid,
      },
      _custom: {
        ...noGrid,
        max: 100,
      },
    },
    title: {
      display: false,
    },
  },
}

type InstantBarChartDataset = {
  label: string
  data: [number]
  borderColor: string
  backgroundColor: string
}

type InstantBarChartData = {
  labels: [string]
  datasets: InstantBarChartDataset[]
}

const createDataset = (
  data: DataResponseModelDictionary,
  x: ProviderModel,
  color: string,
) => {
  let value = extractData(data, x.name)
  if (value === 0) return undefined
  return {
    label: x.name as string,
    data: [value],
    borderColor: color,
    backgroundColor: color,
  } as InstantBarChartDataset
}

export function SimpleInstantBar() {
  const providers = useGetProvidersFromAppStore()
  const smoothing = useGetLiveDataSmoothingFromAppStore()
  const colors = useGetProviderColorDictionaryFromAppStore()

  const mode = useGetLiveDataModeFromAppStore()
  const liveData = useGetLiveDataFromAppStore()
  const [data, setData] = useState(getModeData(liveData, mode))
  const [chartData, setChartData] = useState<InstantBarChartData>()
  useEffect(() => {
    setData(getModeData(liveData, mode))
  }, [mode, liveData])
  useEffect(() => {
    if (data && colors)
      setChartData({
        labels: [""],
        datasets: providers
          .map((x) => createDataset(data, x, colors[x.name as string]))
          .filter((x) => x !== undefined)
          .map((x) => x as InstantBarChartDataset),
      })
  }, [mode, smoothing, liveData, colors])
  return (
    <Fragment>
      {ConditionalSkeletonRender(
        <Bar
          height={"25px"}
          options={options}
          data={chartData as InstantBarChartData}
        />,
        chartData !== undefined,
      )}
    </Fragment>
  )
}
