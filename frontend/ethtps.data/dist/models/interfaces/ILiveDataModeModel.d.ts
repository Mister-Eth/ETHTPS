import { TimeInterval } from "../TimeIntervals";
import { DataResponseModelDictionary, InstantDataResponseModel } from "../../Types.dictionaries";
import { DataType } from "ethtps.api.client";
export interface ILiveDataModeModel {
    liveDataSmoothing: TimeInterval;
    liveDataType: DataType;
    includeSidechains: boolean;
    data?: InstantDataResponseModel;
    oneMinuteTPSData?: DataResponseModelDictionary;
    oneMinuteGPSData?: DataResponseModelDictionary;
    oneMinuteGTPSData?: DataResponseModelDictionary;
    currentVisitors?: number;
}
