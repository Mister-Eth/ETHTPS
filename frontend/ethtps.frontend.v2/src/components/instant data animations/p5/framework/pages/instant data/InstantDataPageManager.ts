import p5Types from "p5"
import { IPage } from "../../IPage"
import { IPageManager } from "../../IPageManager"
import { Size } from "../../Size"
import { LoadingPage } from "../LoadingPage"

export class InstantDataPageManager implements IPageManager {
  public pages: IPage[]
  private _currentPageIndex = 0
  private get _currentPage(): IPage {
    return this.pages[this._currentPageIndex]
  }

  constructor(public size: Size) {
    this.pages = [new LoadingPage(size)]
  }
  setup(p5: p5Types) {
    this._currentPage.setup(p5)
  }
  resize(size: Size) {
    this.size = size
    this._currentPage.resize(size)
  }
  update(p5: p5Types) {
    this._currentPage.update(p5)
  }
}
