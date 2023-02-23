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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback } from 'react';
import { Stack } from '@visx/shape';
import { PatternCircles } from '@visx/pattern';
import { scaleLinear } from '@visx/scale';
import { transpose } from 'd3-array';
import { animated, useSpring } from '@react-spring/web';
import { WebsocketStatusPartial } from '../stats/WebsocketStatusPartial';
import { useEffect } from 'react';
import { useState } from 'react';
import { curveCardinal } from '@visx/curve';
import moment from 'moment';
import { DataType, colorHooks, handleException, } from 'ethtps.data';
import { useLiveData, useLiveDataState } from './hooks';
// constants
var NUM_LAYERS = 20;
export var BACKGROUND = '#ffdede';
// utils
var range = function (n) { return Array.from(new Array(n), function (_, i) { return i; }); };
var keys = range(NUM_LAYERS);
// scales
var xScale = scaleLinear({});
var yScale = scaleLinear({});
var getY0 = function (d) {
    var _a;
    return (_a = yScale(Math.min.apply(Math, d))) !== null && _a !== void 0 ? _a : 0;
};
var getY1 = function (d) {
    var _a;
    return (_a = yScale(Math.max.apply(Math, d))) !== null && _a !== void 0 ? _a : 0;
};
export function CustomVISXStreamgraph(_a) {
    //const forceUpdate = useForceUpdate()
    //const handlePress = () => forceUpdate()
    var _this = this;
    var width = _a.width, height = _a.height, _b = _a.animate, animate = _b === void 0 ? true : _b, l2DataGetter = _a.l2DataGetter;
    if (width < 10)
        return null;
    var liveState = useLiveDataState();
    var _c = useState(), data = _c[0], setData = _c[1];
    var colors = colorHooks.useGetProviderColorDictionaryFromAppStore();
    var _d = useState({
        providers: ['Mock until loaded'],
        data: [range(60).map(function () { return Math.random() * 10; })],
    }), processedStreamchartData = _d[0], setProcessedStreamchartData = _d[1];
    var generateRequestModel = function () {
        return {
            startDate: moment().subtract(1, 'minute').toDate(),
            providers: ['All'],
            includeSidechains: liveState.sidechainsIncluded,
            mergeOptions: {
                mergePercentage: 10,
            },
        };
    };
    var getDataCallback = function () {
        return useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (l2DataGetter === null || l2DataGetter === void 0 ? void 0 : l2DataGetter.dataGetter(__assign(__assign({}, generateRequestModel()), { dataType: DataType.Tps })))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        }); }, [
            (liveState.mode,
                liveState.sidechainsIncluded,
                liveState.smoothing),
        ]);
    };
    var _e = useState(0), max = _e[0], setMax = _e[1];
    useEffect(function () {
        getDataCallback()()
            .then(function (x) { return setData(x); })
            .catch(handleException);
    }, [liveState.mode, liveState.sidechainsIncluded, liveState.smoothing]);
    useEffect(function () {
        var _a, _b, _c;
        if (data) {
            setData(data);
            if ((_a = data === null || data === void 0 ? void 0 : data.simpleAnalysis) === null || _a === void 0 ? void 0 : _a.allDatasetsSameLength) {
                var length_1 = Math.min((_c = (_b = data === null || data === void 0 ? void 0 : data.simpleAnalysis) === null || _b === void 0 ? void 0 : _b.uniformDatasetLength) !== null && _c !== void 0 ? _c : 1, 60);
                xScale.domain([0, length_1 - 1]);
                if (data.datasets)
                    setProcessedStreamchartData({
                        providers: data.datasets.map(function (x) { return x.provider; }),
                        data: data.datasets.map(function (x) {
                            var _a, _b;
                            return (_b = (_a = x.dataPoints) === null || _a === void 0 ? void 0 : _a.slice(0, length_1).map(function (y) { return y.y; })) !== null && _b !== void 0 ? _b : [];
                        }),
                    });
            }
        }
    }, [data]);
    var liveData = useLiveData();
    var _f = useState([0, 0, 0]), _ = _f[0], setDataPoints = _f[1];
    useEffect(function () {
        var _a, _b, _c, _d;
        if (liveData) {
            setDataPoints((_a = liveData.data) === null || _a === void 0 ? void 0 : _a.map(function (x) { var _a; return (_a = x === null || x === void 0 ? void 0 : x.value) !== null && _a !== void 0 ? _a : 0; }));
            var temp_1 = processedStreamchartData;
            var currentMax = 0;
            var _loop_1 = function (i) {
                temp_1.data[i].shift();
                currentMax = Math.max(currentMax, Math.max.apply(Math, temp_1.data[i]));
                var v = (_d = (_c = (_b = liveData.data) === null || _b === void 0 ? void 0 : _b.find(function (x) { return x.providerName === temp_1.providers[i]; })) === null || _c === void 0 ? void 0 : _c.value) !== null && _d !== void 0 ? _d : 0; //temp.data[i][temp.data.length - 1]
                temp_1.data[i].push(v);
            };
            for (var i = 0; i < temp_1.providers.length; i++) {
                _loop_1(i);
            }
            setMax(currentMax);
            //yScale.domain([-max, max])
            setProcessedStreamchartData(temp_1);
        }
    }, [liveData]);
    xScale.range([0, width]);
    xScale.domain([0, 59]);
    yScale.range([height, 0]);
    useEffect(function () {
        var n = Math.ceil((max / 10) * 10);
        var m = Math.floor((max / 10) * 10);
        yScale.domain([-m, n * 1.5]);
    }, [max]);
    yScale.clamp(true);
    var colorFunction = function (key, index) {
        return colors ? colors[processedStreamchartData.providers[index]] : 'yellow';
    };
    var customScale = function (x) { return colorFunction(0, x); };
    var pathRefs = range(processedStreamchartData.data.length).map(function () {
        return React.createRef();
    });
    var _g = useState(0), highlightedIndex = _g[0], setHighlightedIndex = _g[1];
    return (_jsxs(React.Fragment, { children: [_jsx(WebsocketStatusPartial, {}), _jsxs("svg", __assign({ width: width, height: height }, { children: [_jsx(PatternCircles, { id: 'circles', height: 40, width: 40, radius: 5, fill: 'black', complement: true }), _jsx(PatternCircles, { id: 'hovered-circles', height: 40, width: 40, radius: 5, fill: 'white', complement: true }), _jsxs("g", { children: [_jsx("rect", { x: 0, y: 0, width: width, height: height, fill: BACKGROUND, rx: 24 }), _jsx(Stack, __assign({ data: transpose(processedStreamchartData.data), keys: keys, curve: curveCardinal, accumulate: 'sum', offset: "wiggle", color: colorFunction, x: function (_, i) { var _a; return (_a = xScale(i)) !== null && _a !== void 0 ? _a : 0; }, y0: getY0, y1: getY1 }, { children: function (_a) {
                                    var stacks = _a.stacks, path = _a.path;
                                    return stacks.map(function (stack) {
                                        // Alternatively use renderprops <Spring to={{ d }}>{tweened => ...}</Spring>
                                        var pathString = path(stack) || '';
                                        var tweened = animate
                                            ? useSpring({ pathString: pathString })
                                            : { pathString: pathString };
                                        var color = customScale(stack.key);
                                        return (_jsxs("g", { children: [_jsx(animated.path, { d: tweened.pathString, fill: color }), _jsx(animated.path, { ref: pathRefs[stack.index], onMouseEnter: function () {
                                                        return setHighlightedIndex(stack.index);
                                                    }, onMouseLeave: function () {
                                                        return setHighlightedIndex(-1);
                                                    }, d: tweened.pathString, fill: "url(#".concat(stack.index === highlightedIndex
                                                        ? 'hovered-'
                                                        : '', "circles)") })] }, "series-".concat(stack.key)));
                                    });
                                } }))] })] }))] }));
}
//# sourceMappingURL=CustomVISXStreamgraph.js.map