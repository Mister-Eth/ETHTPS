import { GeneralApi } from "../../services/api-gen";
import { ObjectGeneralApi } from "../../services/api-gen/types/ObjectParamAPI";
import { IProviderModel } from '../interfaces/IProviderModel';

export interface IGlobalDependencies {
    generalApi?: GeneralApi
}