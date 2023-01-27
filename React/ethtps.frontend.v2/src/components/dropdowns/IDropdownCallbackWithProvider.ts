import { IDropdownCallback } from "./IDropdownCallback"
import { ProviderModel } from "../../services/api-gen/models/ProviderModel"
export interface IDropdownCallbackWithProvider<T> extends IDropdownCallback<T> {
  provider: ProviderModel | string
}
