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
exports.CustomVISXStreamgraph = exports.BACKGROUND = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
/* eslint-disable react-hooks/rules-of-hooks */
const react_1 = __importStar(require("react"));
const shape_1 = require("@visx/shape");
const pattern_1 = require("@visx/pattern");
const scale_1 = require("@visx/scale");
const d3_array_1 = require("d3-array");
const web_1 = require("@react-spring/web");
const WebsocketStatusPartial_1 = require("../stats/WebsocketStatusPartial");
const react_2 = require("react");
const react_3 = require("react");
const curve_1 = require("@visx/curve");
const moment_1 = __importDefault(require("moment"));
const ethtps_data_1 = require("ethtps.data");
const hooks_1 = require("./hooks");
// constants
const NUM_LAYERS = 20;
exports.BACKGROUND = '#ffdede';
// utils
const range = (n) => Array.from(new Array(n), (_, i) => i);
const keys = range(NUM_LAYERS);
// scales
const xScale = (0, scale_1.scaleLinear)({});
const yScale = (0, scale_1.scaleLinear)({});
const getY0 = (d) => {
    var _a;
    return (_a = yScale(Math.min(...d))) !== null && _a !== void 0 ? _a : 0;
};
const getY1 = (d) => {
    var _a;
    return (_a = yScale(Math.max(...d))) !== null && _a !== void 0 ? _a : 0;
};
function CustomVISXStreamgraph({ width, height, animate = true, l2DataGetter, }) {
    //const forceUpdate = useForceUpdate()
    //const handlePress = () => forceUpdate()
    if (width < 10)
        return null;
    const liveState = (0, hooks_1.useLiveDataState)();
    const [data, setData] = (0, react_3.useState)();
    const colors = ethtps_data_1.colorHooks.useGetProviderColorDictionaryFromAppStore();
    const [processedStreamchartData, setProcessedStreamchartData] = (0, react_3.useState)({
        providers: ['Mock until loaded'],
        data: [range(60).map(() => Math.random() * 10)],
    });
    const generateRequestModel = () => {
        return {
            startDate: (0, moment_1.default)().subtract(1, 'minute').toDate(),
            providers: ['All'],
            includeSidechains: liveState.sidechainsIncluded,
            mergeOptions: {
                mergePercentage: 10,
            },
        };
    };
    const getDataCallback = () => (0, react_1.useCallback)(() => __awaiter(this, void 0, void 0, function* () {
        return yield (l2DataGetter === null || l2DataGetter === void 0 ? void 0 : l2DataGetter.dataGetter(Object.assign(Object.assign({}, generateRequestModel()), { dataType: ethtps_data_1.DataType.Tps })));
    }), [
        (liveState.mode,
            liveState.sidechainsIncluded,
            liveState.smoothing),
    ]);
    const [max, setMax] = (0, react_3.useState)(0);
    (0, react_2.useEffect)(() => {
        getDataCallback()()
            .then((x) => setData(x))
            .catch(ethtps_data_1.handleException);
    }, [liveState.mode, liveState.sidechainsIncluded, liveState.smoothing]);
    (0, react_2.useEffect)(() => {
        var _a, _b, _c;
        if (data) {
            setData(data);
            if ((_a = data === null || data === void 0 ? void 0 : data.simpleAnalysis) === null || _a === void 0 ? void 0 : _a.allDatasetsSameLength) {
                let length = Math.min((_c = (_b = data === null || data === void 0 ? void 0 : data.simpleAnalysis) === null || _b === void 0 ? void 0 : _b.uniformDatasetLength) !== null && _c !== void 0 ? _c : 1, 60);
                xScale.domain([0, length - 1]);
                if (data.datasets)
                    setProcessedStreamchartData({
                        providers: data.datasets.map((x) => x.provider),
                        data: data.datasets.map((x) => {
                            var _a, _b;
                            return (_b = (_a = x.dataPoints) === null || _a === void 0 ? void 0 : _a.slice(0, length).map((y) => y.y)) !== null && _b !== void 0 ? _b : [];
                        }),
                    });
            }
        }
    }, [data]);
    const liveData = (0, hooks_1.useLiveData)();
    const [_, setDataPoints] = (0, react_3.useState)([0, 0, 0]);
    (0, react_2.useEffect)(() => {
        var _a, _b, _c, _d;
        if (liveData) {
            setDataPoints((_a = liveData.data) === null || _a === void 0 ? void 0 : _a.map((x) => { var _a; return (_a = x === null || x === void 0 ? void 0 : x.value) !== null && _a !== void 0 ? _a : 0; }));
            let temp = processedStreamchartData;
            let currentMax = 0;
            for (let i = 0; i < temp.providers.length; i++) {
                temp.data[i].shift();
                currentMax = Math.max(currentMax, Math.max(...temp.data[i]));
                const v = (_d = (_c = (_b = liveData.data) === null || _b === void 0 ? void 0 : _b.find((x) => x.providerName === temp.providers[i])) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : 0; //temp.data[i][temp.data.length - 1]
                temp.data[i].push(v);
            }
            setMax(currentMax);
            //yScale.domain([-max, max])
            setProcessedStreamchartData(temp);
        }
    }, [liveData]);
    xScale.range([0, width]);
    xScale.domain([0, 59]);
    yScale.range([height, 0]);
    (0, react_2.useEffect)(() => {
        const n = Math.ceil((max / 10) * 10);
        const m = Math.floor((max / 10) * 10);
        yScale.domain([-m, n * 1.5]);
    }, [max]);
    yScale.clamp(true);
    const colorFunction = (key, index) => colors ? colors[processedStreamchartData.providers[index]] : 'yellow';
    const customScale = (x) => colorFunction(0, x);
    const pathRefs = range(processedStreamchartData.data.length).map(() => react_1.default.createRef());
    const [highlightedIndex, setHighlightedIndex] = (0, react_3.useState)(0);
    return ((0, jsx_runtime_1.jsxs)(react_1.default.Fragment, { children: [(0, jsx_runtime_1.jsx)(WebsocketStatusPartial_1.WebsocketStatusPartial, {}), (0, jsx_runtime_1.jsxs)("svg", Object.assign({ width: width, height: height }, { children: [(0, jsx_runtime_1.jsx)(pattern_1.PatternCircles, { id: 'circles', height: 40, width: 40, radius: 5, fill: 'black', complement: true }), (0, jsx_runtime_1.jsx)(pattern_1.PatternCircles, { id: 'hovered-circles', height: 40, width: 40, radius: 5, fill: 'white', complement: true }), (0, jsx_runtime_1.jsxs)("g", { children: [(0, jsx_runtime_1.jsx)("rect", { x: 0, y: 0, width: width, height: height, fill: exports.BACKGROUND, rx: 24 }), (0, jsx_runtime_1.jsx)(shape_1.Stack, Object.assign({ data: (0, d3_array_1.transpose)(processedStreamchartData.data), keys: keys, curve: curve_1.curveCardinal, accumulate: 'sum', offset: "wiggle", color: colorFunction, x: (_, i) => { var _a; return (_a = xScale(i)) !== null && _a !== void 0 ? _a : 0; }, y0: getY0, y1: getY1 }, { children: ({ stacks, path }) => stacks.map((stack) => {
                                    // Alternatively use renderprops <Spring to={{ d }}>{tweened => ...}</Spring>
                                    const pathString = path(stack) || '';
                                    const tweened = animate
                                        ? (0, web_1.useSpring)({ pathString })
                                        : { pathString };
                                    const color = customScale(stack.key);
                                    return ((0, jsx_runtime_1.jsxs)("g", { children: [(0, jsx_runtime_1.jsx)(web_1.animated.path, { d: tweened.pathString, fill: color }), (0, jsx_runtime_1.jsx)(web_1.animated.path, { ref: pathRefs[stack.index], onMouseEnter: () => setHighlightedIndex(stack.index), onMouseLeave: () => setHighlightedIndex(-1), d: tweened.pathString, fill: `url(#${stack.index === highlightedIndex
                                                    ? 'hovered-'
                                                    : ''}circles)` })] }, `series-${stack.key}`));
                                }) }))] })] }))] }));
}
exports.CustomVISXStreamgraph = CustomVISXStreamgraph;
