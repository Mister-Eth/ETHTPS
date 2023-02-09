import { IPage } from "../IPage"
import p5Types from "p5"
import { Size } from "../Size"
import { map } from "../utils/utils"

export class PageWithGrid implements IPage {
  lineLength: number = 0
  squareRatio: number
  rangeTotalMs: number
  blockSize: number = 0
  protected xOffset = 0
  constructor(
    public size: Size,
    rangeTotalMs: number = 60000,
    squareRatio: number = 6,
  ) {
    this.squareRatio = squareRatio
    this.rangeTotalMs = rangeTotalMs
  }
  setup(p5: p5Types) {}
  resize(size: Size) {
    this.size = size
    this.blockSize = this.size.height / this.squareRatio
  }
  update(p5: p5Types) {
    p5.stroke(p5.color(255, 255, 255, 50))
    p5.strokeWeight(1)
    for (let x = 0; x < this.size.width + this.blockSize; x += this.blockSize) {
      p5.line(x + this.xOffset, 0, x + this.xOffset, this.lineLength)
      p5.line(0, x, this.lineLength, x)
    }
    if (this.lineLength < this.size.width - 1) {
      this.lineLength = (p5.millis() * this.size.width) / 500
    }
    this.xOffset = -map(
      (p5.millis() / (this.rangeTotalMs / 1000)) % 1000,
      0,
      1000,
      0,
      this.blockSize,
    )
  }
}
