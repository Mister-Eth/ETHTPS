import { IL2DataRequestModel } from './IL2DataRequestModel';
import { IL2DataResponseModel } from '../responses/IL2DataResponseModel';
export interface IL2DataRequestHandler {
    dataGetter: (request: IL2DataRequestModel) => Promise<IL2DataResponseModel>;
    refetchFunction: () => void;
    fetchInfo: {
        isFetching: boolean;
        isSuccess: boolean;
    };
}
