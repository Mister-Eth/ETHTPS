import { Vector2 } from "../Vector2"
import p5Types from "p5"

export enum SeriesType {
  points,
  line,
}

const drawSeriesAsPoints = (series: Series, p5: p5Types, xOffset: number) => {
  p5.stroke(series.color)
  p5.strokeWeight(5)
  series.data.forEach((x) => {
    p5.circle(x.x + xOffset, x.y, 5)
  })
}
const drawSeriesAsLine = (series: Series, p5: p5Types, xOffset: number) => {
  p5.stroke(series.color)
  p5.strokeWeight(1)
  for (let i = 0; i < series.data.length - 1; i++) {
    let a = series.data[i]
    let b = series.data[i + i]
    if (a === undefined || b === undefined) continue
    p5.line(a.x + xOffset, a.y, b.x + xOffset, b.y)
  }
}

export function drawSeriesOn(
  series: Series,
  p5: p5Types,
  drawAs: SeriesType,
  xOffset: number,
) {
  let drawFunction: (series: Series, p5: p5Types, xOffset: number) => void
  switch (drawAs) {
    case SeriesType.points:
      drawFunction = drawSeriesAsPoints
      break
    case SeriesType.line:
      drawFunction = drawSeriesAsLine
      break
  }
  drawFunction(series, p5, xOffset)
}

export type Series = {
  color: string
  data: Vector2[]
}

export const range = (start: number, stop: number, step = 1) =>
  Array(Math.ceil((stop - start) / step))
    .fill(start)
    .map((x, y) => x + y * step)
