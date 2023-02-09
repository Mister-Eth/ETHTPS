import { ResizeableBase } from "../ResizeableBase"
import { Size } from "../Size"

export class PageBase extends ResizeableBase {
  constructor(public size: Size) {
    super(size)
  }
}
