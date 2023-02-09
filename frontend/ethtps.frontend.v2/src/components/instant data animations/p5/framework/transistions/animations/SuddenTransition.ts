import p5Types from "p5"
import { ITransition } from "../ITransition"

export class SuddenTransition implements ITransition {
  constructor(public onCompleted: () => void) {}
  completed: boolean = false
  durationMs = 0
  start() {}
  update(p5: p5Types) {
    if (!this.completed) {
      this.onCompleted()
      this.completed = true
    }
  }
  setup() {}
}
