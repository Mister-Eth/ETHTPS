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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderDataChart = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const icons_material_1 = require("@mui/icons-material");
const material_1 = require("@mui/material");
const system_1 = require("@mui/system");
const react_1 = __importStar(require("react"));
const Types_1 = require("src/Types");
const DataModeButtonGroup_1 = require("../../buttons/groups/data-mode-group/DataModeButtonGroup");
const DateRangeSelectorDropdown_1 = require("../../dropdowns/concrete/DateRangeSelectorDropdown");
const SpinningArrows_1 = require("../../icons/spinning hourglass/SpinningArrows");
const BrushChart_1 = require("../brush/BrushChart");
const ethtps_data_1 = require("ethtps.data");
const react_query_1 = require("react-query");
const ProviderIntervalDropdown_1 = require("../../dropdowns/concrete/ProviderIntervalDropdown");
const NetworksDropdown_1 = require("../../dropdowns/concrete/NetworksDropdown");
function ProviderDataChart(config) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const displayNetworksDropdown = false && ((_b = (_a = config.provider) === null || _a === void 0 ? void 0 : _a.provider) === null || _b === void 0 ? void 0 : _b.toUpperCase()) === 'ETHEREUM';
    const intervalHandler = (0, ethtps_data_1.useHandler)(config.interval);
    const modeHandler = (0, ethtps_data_1.useHandler)(config.mode);
    const networkHandler = (0, ethtps_data_1.useHandler)(config.network);
    const [noData, setNoData] = (0, react_1.useState)(false);
    const [usesDatePicker] = (0, react_1.useState)(false);
    const [points, setPoints] = (0, react_1.useState)([]);
    (0, react_query_1.useQuery)(`${config.provider} ${config.mode} ${config.interval} data`, () => { var _a; return (_a = config.request) === null || _a === void 0 ? void 0 : _a.refetchFunction(); });
    (0, react_1.useEffect)(() => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        if ((_b = (_a = config.request) === null || _a === void 0 ? void 0 : _a.fetchInfo) === null || _b === void 0 ? void 0 : _b.isSuccess) {
            if (config.data) {
                if ((_c = config.data) === null || _c === void 0 ? void 0 : _c.data)
                    setPoints((_h = (_g = (_f = (_e = (_d = config.data) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.dataPoints) === null || _f === void 0 ? void 0 : _f.filter((x) => x !== undefined)) === null || _g === void 0 ? void 0 : _g.map((x) => (x !== null && x !== void 0 ? x : {
                        x: new Date(),
                        y: 0,
                    }))) !== null && _h !== void 0 ? _h : []);
            }
            setNoData(false);
        }
    }, [config.data]);
    (0, react_1.useEffect)(() => {
        var _a, _b, _c;
        if (!((_b = (_a = config.request) === null || _a === void 0 ? void 0 : _a.fetchInfo) === null || _b === void 0 ? void 0 : _b.isSuccess)) {
            (_c = config.request) === null || _c === void 0 ? void 0 : _c.refetchFunction();
        }
    }, [(_d = (_c = config.request) === null || _c === void 0 ? void 0 : _c.fetchInfo) === null || _d === void 0 ? void 0 : _d.isSuccess]);
    (0, react_1.useEffect)(() => {
        var _a;
        (_a = config.request) === null || _a === void 0 ? void 0 : _a.refetchFunction();
    }, [intervalHandler === null || intervalHandler === void 0 ? void 0 : intervalHandler.value, networkHandler === null || networkHandler === void 0 ? void 0 : networkHandler.value, modeHandler === null || modeHandler === void 0 ? void 0 : modeHandler.value]);
    const [containerWidth, setContainerWidth] = (0, react_1.useState)(0);
    const containerRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        setContainerWidth(containerRef.current ? containerRef.current.offsetWidth : 0);
    }, [containerRef.current]);
    return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsxs)(system_1.Container, Object.assign({ sx: {
                borderThickness: '1px',
                borderColor: 'primary',
                borderBlockColor: 'primary',
            } }, { children: [(0, jsx_runtime_1.jsxs)(material_1.Paper, Object.assign({ elevation: 1, sx: { display: noData ? 'none' : undefined } }, { children: [displayNetworksDropdown ? ((0, jsx_runtime_1.jsx)(NetworksDropdown_1.NetworksDropdown, { changed: networkHandler })) : ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {})), (0, Types_1.ConditionalRender)((0, jsx_runtime_1.jsx)(DateRangeSelectorDropdown_1.DateRangeSelectorDropdown, { hidden: !usesDatePicker }), usesDatePicker), (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: { float: 'right' } }, { children: [(0, jsx_runtime_1.jsx)(ProviderIntervalDropdown_1.ProviderIntervalDropdown, { hidden: noData, noDataAvailable: config.onNoDataAvailable, changed: (_e = config.interval) === null || _e === void 0 ? void 0 : _e.callback, provider: (_f = config.provider) === null || _f === void 0 ? void 0 : _f.provider }), (0, jsx_runtime_1.jsx)(DataModeButtonGroup_1.DataModeButtonGroup, { modeHandle: modeHandler === null || modeHandler === void 0 ? void 0 : modeHandler.convertToIHandler() })] }))] })), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)(material_1.Paper, Object.assign({ elevation: 1 }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "parent", ref: containerRef }, { children: [(0, jsx_runtime_1.jsx)(BrushChart_1.BrushChart, { dataPoints: points, width: containerWidth, height: containerWidth / 1.4142 }), (0, Types_1.ConditionalRender)((0, jsx_runtime_1.jsx)(material_1.Chip, { label: (0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ sx: { fontWeight: 'bold' } }, { children: "Loading..." })), color: "primary", className: "appear-delayed child", avatar: (0, jsx_runtime_1.jsx)(SpinningArrows_1.SpinningArrows, {}), variant: "filled" }), (_h = (_g = config.request) === null || _g === void 0 ? void 0 : _g.fetchInfo) === null || _h === void 0 ? void 0 : _h.isFetching), (0, Types_1.ConditionalRender)((0, jsx_runtime_1.jsx)(material_1.Chip, { className: "appear child", label: "No data available", avatar: (0, jsx_runtime_1.jsx)(icons_material_1.DoNotDisturbAlt, {}), variant: "filled", style: { opacity: '100%' } }), noData && !((_k = (_j = config.request) === null || _j === void 0 ? void 0 : _j.fetchInfo) === null || _k === void 0 ? void 0 : _k.isFetching))] })) }))] })) }));
}
exports.ProviderDataChart = ProviderDataChart;
