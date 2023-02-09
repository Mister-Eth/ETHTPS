import { IPage } from "../IPage"
import { ITransition } from "./ITransition"
import p5Types from "p5"
import { IAnimation } from "./animations/IAnimation"

export class PageTransition<
  TPageFrom extends IPage,
  TPageTo extends IPage,
  TAnimation extends IAnimation,
> implements ITransition
{
  constructor(
    public from: TPageFrom,
    public to: TPageTo,
    public animation: TAnimation,
  ) {
    animation.onCompleted = () => (this.completed = true)
  }

  completed: boolean = false
  start() {
    this.animation.start()
  }
  update(p5: p5Types) {
    this.animation.update(p5)
  }
  setup(p5: p5Types) {
    this.animation.setup(p5)
  }
}
