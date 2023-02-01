import { GeneralApi } from "../../services/api-gen"
import { IThemeProvider } from "../../services/themes/IThemeProvider"

export interface IGlobalDependencies {
  generalApi?: GeneralApi
  themeProvider?: IThemeProvider
}
