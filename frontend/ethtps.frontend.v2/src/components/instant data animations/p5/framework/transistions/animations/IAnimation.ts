import { ITransition } from "../ITransition"

export interface IAnimation extends ITransition {
  durationMs: number
  onCompleted: () => void
}
