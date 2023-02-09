import { ICanvas } from "./ICanvas"
import { IPage } from "./IPage"

export interface IPageManager extends ICanvas {
  pages: IPage[]
}
