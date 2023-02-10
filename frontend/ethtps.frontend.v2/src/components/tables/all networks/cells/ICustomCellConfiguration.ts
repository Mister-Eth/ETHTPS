import { ProviderResponseModel } from "ethtps.api.client"
import { ICellClickedEvent } from "./ICellClickedEvent"

export const buildClassNames = (config: ICustomCellConfiguration) => {
  return {
    className: `inline ${
      config.clickCallback !== undefined ? "pointable" : ""
    }`,
  }
}

export interface ICustomCellConfiguration extends ICellClickedEvent {
  provider?: ProviderResponseModel
}
