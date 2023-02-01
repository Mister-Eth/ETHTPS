export class MainPageModel {
  constructor(
    public network: string,
    public excludeSidechains: boolean,
    public excludeNonGeneralPurposeNetworks: boolean,
    public modifiedInstantTPS: any,
    public mode: string,
    public offline: boolean,
    public smoothing: string,
    public homePageModel: {},
  ) {}
}
