import { ProviderModel } from "../../../../services/api-gen/models/ProviderModel"

export const buildClassNames = (config: ICustomCellConfiguration) => {
  return {
    className: `inline ${
      config.clickCallback !== undefined ? "pointable" : ""
    }`,
  }
}

export interface ICustomCellConfiguration {
  provider?: ProviderModel
  clickCallback?: () => void
}
