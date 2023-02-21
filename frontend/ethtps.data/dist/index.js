"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataTypeToString = exports.useSetSidechainsIncluded = exports.TimeInterval = exports.useAppDispatch = exports.useAppSelector = exports.store = exports.useLoadValueHooks = exports.queryHooks = exports.providerHooks = exports.liveDataHooks = exports.intervalHooks = exports.dataHooks = exports.colorHooks = exports.appStateHooks = exports.timeIntervalUtils = exports.websocketSlice = exports.websocketMiddleware = exports.providersReducer = exports.networksReducer = exports.liveDataReducer = exports.intervalsReducer = exports.experimentReducer = exports.dataReducer = exports.colorReducer = exports.applicationStateReducer = exports.mainPageReducer = exports.DataType = exports.ApplicationState = void 0;
const ApplicationState_1 = require("./models/dependencies/ApplicationState");
Object.defineProperty(exports, "ApplicationState", { enumerable: true, get: function () { return ApplicationState_1.ApplicationState; } });
const timeIntervalUtils = __importStar(require("./models/TimeIntervals"));
exports.timeIntervalUtils = timeIntervalUtils;
const MainPageSlice_1 = require("./slices/page slices/MainPageSlice");
Object.defineProperty(exports, "mainPageReducer", { enumerable: true, get: function () { return MainPageSlice_1.mainPageReducer; } });
const ApplicationStateSlice_1 = require("./slices/ApplicationStateSlice");
Object.defineProperty(exports, "applicationStateReducer", { enumerable: true, get: function () { return ApplicationStateSlice_1.applicationStateReducer; } });
const ColorSlice_1 = require("./slices/ColorSlice");
Object.defineProperty(exports, "colorReducer", { enumerable: true, get: function () { return ColorSlice_1.colorReducer; } });
const DataSlice_1 = require("./slices/DataSlice");
Object.defineProperty(exports, "dataReducer", { enumerable: true, get: function () { return DataSlice_1.dataReducer; } });
const ExperimentSlice_1 = require("./slices/ExperimentSlice");
Object.defineProperty(exports, "experimentReducer", { enumerable: true, get: function () { return ExperimentSlice_1.experimentReducer; } });
const IntervalsSlice_1 = require("./slices/IntervalsSlice");
Object.defineProperty(exports, "intervalsReducer", { enumerable: true, get: function () { return IntervalsSlice_1.intervalsReducer; } });
const LiveDataSlice_1 = require("./slices/LiveDataSlice");
Object.defineProperty(exports, "liveDataReducer", { enumerable: true, get: function () { return LiveDataSlice_1.liveDataReducer; } });
const NetworksSlice_1 = require("./slices/NetworksSlice");
Object.defineProperty(exports, "networksReducer", { enumerable: true, get: function () { return NetworksSlice_1.networksReducer; } });
const ProvidersSlice_1 = require("./slices/ProvidersSlice");
Object.defineProperty(exports, "providersReducer", { enumerable: true, get: function () { return ProvidersSlice_1.providersReducer; } });
const WebsocketSubscriptionMiddleware_1 = __importDefault(require("./slices/WebsocketSubscriptionMiddleware"));
exports.websocketMiddleware = WebsocketSubscriptionMiddleware_1.default;
const WebsocketSubscriptionSlice_1 = __importDefault(require("./slices/WebsocketSubscriptionSlice"));
exports.websocketSlice = WebsocketSubscriptionSlice_1.default;
const ethtps_api_client_1 = require("ethtps.api.client");
Object.defineProperty(exports, "DataType", { enumerable: true, get: function () { return ethtps_api_client_1.DataType; } });
const store_1 = require("./store");
Object.defineProperty(exports, "store", { enumerable: true, get: function () { return store_1.store; } });
Object.defineProperty(exports, "useAppSelector", { enumerable: true, get: function () { return store_1.useAppSelector; } });
Object.defineProperty(exports, "useAppDispatch", { enumerable: true, get: function () { return store_1.useAppDispatch; } });
const appStateHooks = __importStar(require("./hooks/ApplicationStateHooks"));
exports.appStateHooks = appStateHooks;
const colorHooks = __importStar(require("./hooks/ColorHooks"));
exports.colorHooks = colorHooks;
const dataHooks = __importStar(require("./hooks/DataHooks"));
exports.dataHooks = dataHooks;
const intervalHooks = __importStar(require("./hooks/IntervalHooks"));
exports.intervalHooks = intervalHooks;
const liveDataHooks = __importStar(require("./hooks/LiveDataHooks"));
exports.liveDataHooks = liveDataHooks;
const providerHooks = __importStar(require("./hooks/ProviderHooks"));
exports.providerHooks = providerHooks;
const queryHooks = __importStar(require("./hooks/QueryHooks"));
exports.queryHooks = queryHooks;
const useLoadValueHooks = __importStar(require("./hooks/useLoadValuesHook"));
exports.useLoadValueHooks = useLoadValueHooks;
const TimeIntervals_1 = require("./models/TimeIntervals");
Object.defineProperty(exports, "TimeInterval", { enumerable: true, get: function () { return TimeIntervals_1.TimeInterval; } });
Object.defineProperty(exports, "dataTypeToString", { enumerable: true, get: function () { return TimeIntervals_1.dataTypeToString; } });
const LiveDataHooks_1 = require("./hooks/LiveDataHooks");
Object.defineProperty(exports, "useSetSidechainsIncluded", { enumerable: true, get: function () { return LiveDataHooks_1.useSetSidechainsIncluded; } });
