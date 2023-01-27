import { ProviderModel } from "../../../../services/api-gen"

export interface ICellClickedEvent {
  clickCallback?: (provider?: ProviderModel, cellName?: string) => void
}
