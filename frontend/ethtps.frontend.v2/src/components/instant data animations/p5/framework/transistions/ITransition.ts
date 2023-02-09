import { IDrawable } from "../IDrawable"

export interface ITransition extends IDrawable {
  completed: boolean
  start: () => void
}
