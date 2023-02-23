"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.useAppSelector = exports.useAppDispatch = exports.store = void 0;
var ProvidersSlice_1 = require("./slices/ProvidersSlice");
var NetworksSlice_1 = require("./slices/NetworksSlice");
var IntervalsSlice_1 = require("./slices/IntervalsSlice");
var DataSlice_1 = require("./slices/DataSlice");
var LiveDataSlice_1 = require("./slices/LiveDataSlice");
var ColorSlice_1 = require("./slices/ColorSlice");
var ExperimentSlice_1 = require("./slices/ExperimentSlice");
var ApplicationStateSlice_1 = require("./slices/ApplicationStateSlice");
var react_redux_1 = require("react-redux");
var WebsocketSubscriptionMiddleware_1 = __importDefault(require("./slices/WebsocketSubscriptionMiddleware"));
var WebsocketSubscriptionSlice_1 = require("./slices/WebsocketSubscriptionSlice");
var toolkit_1 = require("@reduxjs/toolkit");
var ApplicationState_1 = require("./models/dependencies/ApplicationState");
var preloadedState = new ApplicationState_1.ApplicationState();
exports.store = (0, toolkit_1.configureStore)(__assign(__assign({ reducer: {
        providers: ProvidersSlice_1.providersReducer,
        networks: NetworksSlice_1.networksReducer,
        intervals: IntervalsSlice_1.intervalsReducer,
        maxData: DataSlice_1.dataReducer,
        liveData: LiveDataSlice_1.liveDataReducer,
        colors: ColorSlice_1.colorReducer,
        experiments: ExperimentSlice_1.experimentReducer,
        applicationState: ApplicationStateSlice_1.applicationStateReducer,
        websockets: WebsocketSubscriptionSlice_1.websocketReducer
    } }, preloadedState), { middleware: function (getDefaultMiddleware) {
        return getDefaultMiddleware({
            serializableCheck: false
        }).concat(WebsocketSubscriptionMiddleware_1["default"]);
    } }));
exports.useAppDispatch = react_redux_1.useDispatch;
exports.useAppSelector = react_redux_1.useSelector;
//# sourceMappingURL=store.js.map