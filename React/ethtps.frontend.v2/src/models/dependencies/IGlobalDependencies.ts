import { GeneralApi } from "../../services/api-gen";
import { ObjectGeneralApi } from "../../services/api-gen/types/ObjectParamAPI";
import { IProviderModel } from "../interfaces/IProviderModel";
import { IThemeProvider } from "../../services/api/themes/IThemeProvider";

export interface IGlobalDependencies {
  generalApi?: GeneralApi;
  themeProvider?: IThemeProvider;
}
