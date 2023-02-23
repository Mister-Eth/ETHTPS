"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestTube = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_device_detect_1 = require("react-device-detect");
const react_1 = require("react");
const Types_1 = require("../../Types");
const SimpleDesktopFeedbackExperiment_1 = require("./desktop/SimpleDesktopFeedbackExperiment");
const ethtps_data_1 = require("ethtps.data");
const react_2 = __importDefault(require("react"));
function TestTube(request, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const [currentExperiments, setCurrentExperiments] = (0, react_1.useState)((0, ethtps_data_1.useAppSelector)((state) => state.experiments) || []);
        /*
        const [fetchedFromServer, setFetchedFromServer] = useState(false)
        if (!fetchedFromServer) {
            loadAvailableExperiments(isDesktop ? 'Desktop' : 'Mobile').then((x) => {
                setCurrentExperiments(x)
                store.dispatch(setExperiments(x))
                setFetchedFromServer(true)
            })
        }*/
        try {
            const result = yield request.dataGetter(params);
            setCurrentExperiments(result);
            ethtps_data_1.store.dispatch((0, ethtps_data_1.setExperiments)(result));
        }
        catch (e) {
            (0, ethtps_data_1.handleException)(e);
        }
        return ((0, jsx_runtime_1.jsxs)(react_2.default.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_device_detect_1.BrowserView, { children: (0, Types_1.ConditionalRender)((0, jsx_runtime_1.jsx)(SimpleDesktopFeedbackExperiment_1.SimpleDesktopFeedbackExperiment, {}), currentExperiments === null || currentExperiments === void 0 ? void 0 : currentExperiments.some((x) => x === 2)) }), (0, jsx_runtime_1.jsx)(react_device_detect_1.MobileOnlyView, {})] }));
    });
}
exports.TestTube = TestTube;
