import { Size } from "./Size"

export interface IResizeable {
  size: Size
  resize: (size: Size) => void
}
