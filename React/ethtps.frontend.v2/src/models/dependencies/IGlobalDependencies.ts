import { GeneralApi } from "../../services/api-gen"
import { IThemeProvider } from "../../services/api/themes/IThemeProvider"

export interface IGlobalDependencies {
  generalApi?: GeneralApi
  themeProvider?: IThemeProvider
}
