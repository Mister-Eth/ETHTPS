"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAppSelector = exports.useAppDispatch = exports.store = void 0;
const ProvidersSlice_1 = require("./slices/ProvidersSlice");
const NetworksSlice_1 = require("./slices/NetworksSlice");
const IntervalsSlice_1 = require("./slices/IntervalsSlice");
const DataSlice_1 = require("./slices/DataSlice");
const LiveDataSlice_1 = require("./slices/LiveDataSlice");
const ColorSlice_1 = require("./slices/ColorSlice");
const ExperimentSlice_1 = require("./slices/ExperimentSlice");
const ApplicationStateSlice_1 = require("./slices/ApplicationStateSlice");
const react_redux_1 = require("react-redux");
const WebsocketSubscriptionMiddleware_1 = __importDefault(require("./slices/WebsocketSubscriptionMiddleware"));
const WebsocketSubscriptionSlice_1 = require("./slices/WebsocketSubscriptionSlice");
const toolkit_1 = require("@reduxjs/toolkit");
const ApplicationState_1 = require("./models/dependencies/ApplicationState");
const preloadedState = new ApplicationState_1.ApplicationState();
exports.store = (0, toolkit_1.configureStore)(Object.assign(Object.assign({ reducer: {
        providers: ProvidersSlice_1.providersReducer,
        networks: NetworksSlice_1.networksReducer,
        intervals: IntervalsSlice_1.intervalsReducer,
        maxData: DataSlice_1.dataReducer,
        liveData: LiveDataSlice_1.liveDataReducer,
        colors: ColorSlice_1.colorReducer,
        experiments: ExperimentSlice_1.experimentReducer,
        applicationState: ApplicationStateSlice_1.applicationStateReducer,
        websockets: WebsocketSubscriptionSlice_1.websocketReducer,
    } }, preloadedState), { middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(WebsocketSubscriptionMiddleware_1.default) }));
exports.useAppDispatch = react_redux_1.useDispatch;
exports.useAppSelector = react_redux_1.useSelector;
