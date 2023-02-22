export interface INetworkChangedHandler {
    defaultNetwork?: string;
    networkChangedCallback?: (network: string) => void;
}
