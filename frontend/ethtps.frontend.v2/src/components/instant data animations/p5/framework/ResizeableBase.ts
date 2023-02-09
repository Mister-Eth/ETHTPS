import { IResizeable } from "./IResizeable"
import { Size } from "./Size"

export class ResizeableBase implements IResizeable {
  constructor(public size: Size) {}

  resize(size: Size) {
    this.size = size
  }
}
