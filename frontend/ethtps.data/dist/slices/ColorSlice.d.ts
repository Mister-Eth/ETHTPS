import { IColorDictionaries } from '../models/interfaces/IColorDictionaries';
import { StringDictionary } from '../common-types/Dictionaries';
export declare const setProviderColorDictionary: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<StringDictionary, "colors/setProviderColorDictionary">, setProviderTypeColorDictionary: import("@reduxjs/toolkit").ActionCreatorWithOptionalPayload<StringDictionary, "colors/setProviderTypeColorDictionary">;
export declare const colorReducer: import("redux").Reducer<IColorDictionaries, import("redux").AnyAction>;
