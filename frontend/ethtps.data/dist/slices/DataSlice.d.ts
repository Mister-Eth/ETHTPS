import { IMaxDataModel } from '../models/interfaces/IMaxDataModel';
import { DataPointDictionary } from '../common-types/Dictionaries';
export declare const setMaxTPSData: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<DataPointDictionary, "data/setMaxTPSData">, setMaxGPSData: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<DataPointDictionary, "data/setMaxGPSData">, setMaxGTPSData: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<DataPointDictionary, "data/setMaxGTPSData">;
export declare const dataReducer: import("redux").Reducer<IMaxDataModel, import("redux").AnyAction>;
