import p5Types from "p5"
import { Size } from "../Size"
import { PageWithGrid } from "./PageWithGrid"
import { Series, SeriesType, drawSeriesOn, range } from "../utils/types"
import { Vector2 } from "../Vector2"
import { useEffect } from "react"

export class LoadingPage extends PageWithGrid {
  series: Series
  constructor(public size: Size) {
    super(size)
    this.series = {
      color: "white",
      data: this.getRandomArray(),
    }
  }
  getRandomArray(n: number = 50) {
    return range(0, n).map(
      (x) =>
        new Vector2(
          (Math.random() * this.size.width * x) / n,
          (Math.random() * this.size.height * x) / n,
        ),
    )
  }
  setup(p5: p5Types) {
    super.setup(p5)
  }
  resize(size: Size) {
    super.resize(size)
    this.size = size
    this.series.data = this.getRandomArray()
  }
  update(p5: p5Types) {
    super.update(p5)
    drawSeriesOn(this.series, p5, SeriesType.line, this.xOffset)
  }
}
