import { ICellClickedEvent } from "../../components/tables/all networks/cells/ICellClickedEvent"
import { ProviderModel } from "../../services/api-gen"
import { IMaxDataModel } from "../interfaces/IMaxDataModel"

export interface IProviderTableModel extends ICellClickedEvent {
  providerData?: ProviderModel[]
  maxData?: IMaxDataModel
}
