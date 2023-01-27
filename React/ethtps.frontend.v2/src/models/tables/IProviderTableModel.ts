import { ICellClickedEvent } from "../../components/tables/all networks/cells/ICellClickedEvent"
import { ProviderModel } from "../../services/api-gen"
import { IMaxDataModel } from "../interfaces/IMaxDataModel"
import { IMaxRowsModel } from "./IMaxRowsModel"

export interface IProviderTableModel extends ICellClickedEvent, IMaxRowsModel {
  providerData?: ProviderModel[]
  maxData?: IMaxDataModel
}
