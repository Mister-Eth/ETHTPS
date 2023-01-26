interface IProviderPageModel {
  provider: string
}

export function ProviderPage(model: IProviderPageModel) {
  return <>{model.provider}</>
}
