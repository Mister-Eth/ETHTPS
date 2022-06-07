import { ApiClient, PageModelApi } from "../api-gen/src";
import { GeneralApi } from "../api-gen/src";

export const baseURL: string = 'http://localhost:10202/';
export const apiClient: ApiClient = new ApiClient(baseURL);
export const generalAPI: GeneralApi = new GeneralApi(apiClient);
export const pageModelAPI: PageModelApi = new PageModelApi(apiClient);