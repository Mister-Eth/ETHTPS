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
exports.AllProvidersRows = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const d3_array_1 = require("d3-array");
const ethtps_data_1 = require("ethtps.data");
const react_1 = __importStar(require("react"));
const SkeletonWithTooltip_1 = require("src/components/partials/skeletons/SkeletonWithTooltip");
const IndexCell_1 = require("./cells/IndexCell");
const NameCell_1 = require("./cells/NameCell");
const DataValueCell_1 = require("./cells/DataValueCell");
const MaxValueCell_1 = require("./cells/MaxValueCell");
const ProviderTypeCell_1 = require("./cells/ProviderTypeCell");
function AllProvidersRows(model) {
    var _a, _b, _c, _d;
    const hasData = ((_a = model.providerData) === null || _a === void 0 ? void 0 : _a.length) > 0;
    const mode = ethtps_data_1.liveDataHooks.useGetLiveDataModeFromAppStore();
    const liveData = ethtps_data_1.liveDataHooks.useGetLiveDataFromAppStore();
    const [data, setData] = (0, react_1.useState)((0, ethtps_data_1.getModeData)(liveData !== null && liveData !== void 0 ? liveData : {}, mode));
    (0, react_1.useEffect)(() => {
        setData((0, ethtps_data_1.getModeData)(liveData !== null && liveData !== void 0 ? liveData : {}, mode));
    }, [mode, liveData]);
    return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: hasData ? ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (_d = (_b = model.providerData) === null || _b === void 0 ? void 0 : _b.slice(0, Math.min((_c = model.providerData) === null || _c === void 0 ? void 0 : _c.length, model.maxRowsBeforeShowingExpand))) === null || _d === void 0 ? void 0 : _d.map((x, i) => ((0, jsx_runtime_1.jsxs)(material_1.TableRow, { children: [(0, jsx_runtime_1.jsx)(IndexCell_1.IndexCell, { clickCallback: model.clickCallback, index: i + 1 }), (0, jsx_runtime_1.jsx)(NameCell_1.NameCell, { clickCallback: model.clickCallback, provider: x }), (0, jsx_runtime_1.jsx)(DataValueCell_1.DataValueCell, { clickCallback: model.clickCallback, provider: x, dataType: mode, value: (0, ethtps_data_1.extractData)(data, x.name) }), (0, jsx_runtime_1.jsx)(MaxValueCell_1.MaxValueCell, { clickCallback: model.clickCallback, provider: x }), (0, jsx_runtime_1.jsx)(ProviderTypeCell_1.ProviderTypeCell, { clickCallback: model.clickCallback, provider: x })] }, i))) })) : ((0, d3_array_1.range)(0, 4 + 1).map((y) => {
            return ((0, jsx_runtime_1.jsx)(material_1.TableRow, { children: (0, d3_array_1.range)(0, 5).map((x) => ((0, jsx_runtime_1.jsx)(material_1.TableCell, { children: (0, jsx_runtime_1.jsx)(SkeletonWithTooltip_1.SkeletonWithTooltip, { randomDelay: true, rectangular: false }) }, x))) }, y));
        })) }));
}
exports.AllProvidersRows = AllProvidersRows;
