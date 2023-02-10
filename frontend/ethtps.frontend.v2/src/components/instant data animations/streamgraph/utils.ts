import { DataResponseModelDictionary } from "../../../Types.dictionaries"
import { LiveDataPoint } from "../hooks"

export function createDatasetFromLiveData(arr: any) {
  let x: any = {}
  let names: string[] = []
  for (let i = 0; i < arr.length; i++) {
    let data = arr[i]
    x[data.providerName] = data.value
    if (!names.includes(data.providerName)) names.push(data.providerName)
  }
  return {
    data: x,
    providerNames: names,
  }
}

function createDatedLiveDataPoint(
  data: LiveDataPoint,
  initialX: number,
): DatedLiveDataPoint {
  return {
    date: new Date(),
    x: initialX,
    dataPoints: data,
  }
}

type DatedLiveDataPoint = {
  date: Date
  x: number
  dataPoints: LiveDataPoint
}

export function transformInitialData(data?: any) {
  if (data !== undefined) {
    let keys = Object.keys(data)
    const sNow = new Date().getSeconds()
    keys = keys.filter((key) => data[key]?.length > 0)
    let result = []
    let names: string[] = []
    let currentIndex = 0
    while (keys.length > 0) {
      let dict: any = {}
      for (let i = 0; i < keys.length; i++) {
        let t = data[keys[i]][currentIndex].data
        if (t?.length > 0) {
          let v = t[0]?.value
          if (v !== undefined) {
            dict[keys[i]] = v
            result.push(dict)
            if (!names.includes(keys[i])) names.push(keys[i])
          }
        }
      }
      keys = keys.filter((x) => data[x][currentIndex]?.length > currentIndex++)
    }
    return {
      data: result,
      providerNames: names,
    }
  } else {
    return []
  }
}

export function newValues(old: string[], newArr: string[]): string[] {
  return newArr.filter((x) => !old.includes(x)) ?? []
}
