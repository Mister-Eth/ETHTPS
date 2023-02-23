"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllProvidersTable = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const react_1 = require("react");
const AllProvidersHeader_1 = require("./AllProvidersHeader");
const AllProvidersRows_1 = require("./AllProvidersRows");
const react_2 = __importDefault(require("react"));
const SeeMoreButton_1 = require("../../buttons/see-more/SeeMoreButton");
const Types_1 = require("../../../Types");
function AllProvidersTable(tableData) {
    var _a;
    const oldShowRowCountValue = tableData.maxRowsBeforeShowingExpand;
    const [showRowCount, setShowRowCount] = (0, react_1.useState)(tableData === null || tableData === void 0 ? void 0 : tableData.maxRowsBeforeShowingExpand);
    const onSeeMore = () => {
        var _a;
        setShowRowCount((_a = tableData.providerData) === null || _a === void 0 ? void 0 : _a.length);
    };
    const onSeeLess = () => {
        setShowRowCount(oldShowRowCountValue);
    };
    return ((0, jsx_runtime_1.jsxs)(react_2.default.Fragment, { children: [(0, jsx_runtime_1.jsx)(material_1.TableContainer, Object.assign({ component: material_1.Paper }, { children: (0, jsx_runtime_1.jsxs)(material_1.Table
                //size="small"
                , Object.assign({ 
                    //size="small"
                    sx: {
                        minWidth: 750,
                    }, "aria-label": "collapsible table" }, { children: [(0, jsx_runtime_1.jsx)(material_1.TableHead, { children: (0, jsx_runtime_1.jsx)(AllProvidersHeader_1.AllProvidersHeader, {}) }), (0, jsx_runtime_1.jsx)(material_1.TableBody, { children: (0, jsx_runtime_1.jsx)(AllProvidersRows_1.AllProvidersRows, Object.assign({}, tableData, { maxRowsBeforeShowingExpand: showRowCount })) })] })) })), (0, Types_1.ConditionalRender)((0, jsx_runtime_1.jsx)(SeeMoreButton_1.SeeMoreButton, { enabled: ((_a = tableData.providerData) === null || _a === void 0 ? void 0 : _a.length) > 0, onSeeMore: onSeeMore, onSeeLess: onSeeLess }), showRowCount > 0)] }));
}
exports.AllProvidersTable = AllProvidersTable;
