import p5Types from "p5"
import { IResizeable } from "./IResizeable"

export interface IDrawable {
  update: (p5: p5Types) => void
  setup: (p5: p5Types) => void
}
