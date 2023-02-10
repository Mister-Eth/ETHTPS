import { ICellClickedEvent } from "../../components/tables/all networks/cells/ICellClickedEvent"
import { IMaxDataModel } from "../interfaces/IMaxDataModel"
import { IMaxRowsModel } from "./IMaxRowsModel"
import { ProviderResponseModel } from "ethtps.api.client"

export interface IProviderTableModel extends ICellClickedEvent, IMaxRowsModel {
  providerData?: ProviderResponseModel[]
  maxData?: IMaxDataModel
}
