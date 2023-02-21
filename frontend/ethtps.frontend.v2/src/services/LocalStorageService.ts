export class LocalStorageService {
  private _enabled: boolean = false

  private _setIsLocalStorageEnabled() {
    try {
      localStorage.setItem("test", "works")
      this._enabled = true
    } catch {}
    return this._enabled
  }
  constructor() {
    this._setIsLocalStorageEnabled()
  }

  public setItem<T>(item: T, key: string) {
    if (this._enabled) {
      localStorage.setItem(key, JSON.stringify(item))
      //console.log("Set " + key)
    }
  }

  public retrieveItem<T>(key: string) {
    if (this._enabled) {
      let str = localStorage.getItem(key)
      if (str !== null) {
        //console.log("Retrieved " + key)
        return JSON.parse(str) as T
      }
    }
  }
}
