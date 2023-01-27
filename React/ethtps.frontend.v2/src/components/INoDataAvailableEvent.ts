import { ProviderModel } from "../services/api-gen"

export interface INoDataAvailableEvent {
  onNoDataAvailable?: (provider: ProviderModel | string) => void
}
