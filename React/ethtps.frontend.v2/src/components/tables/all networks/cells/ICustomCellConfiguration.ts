import { ProviderModel } from "../../../../services/api-gen/models/ProviderModel"
import { ICellClickedEvent } from "./ICellClickedEvent"

export const buildClassNames = (config: ICustomCellConfiguration) => {
  return {
    className: `inline ${
      config.clickCallback !== undefined ? "pointable" : ""
    }`,
  }
}

export interface ICustomCellConfiguration extends ICellClickedEvent {
  provider?: ProviderModel
}
