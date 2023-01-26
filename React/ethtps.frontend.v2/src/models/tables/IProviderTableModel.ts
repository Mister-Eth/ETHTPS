import { ProviderModel } from "../../services/api-gen"
import { IMaxDataModel } from "../interfaces/IMaxDataModel"

export interface IProviderTableModel {
  providerData?: ProviderModel[]
  maxData?: IMaxDataModel
}
