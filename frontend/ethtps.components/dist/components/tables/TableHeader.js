"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TableHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const Cells_Types_1 = require("./Cells.Types");
const material_2 = require("@mui/material/");
const Typography_types_1 = require("./all networks/cells/Typography.types");
const react_1 = __importDefault(require("react"));
function TableHeader(params) {
    var _a;
    return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsx)(material_1.TableRow, { children: (_a = params.text) === null || _a === void 0 ? void 0 : _a.map((x, i) => ((0, jsx_runtime_1.jsx)(material_1.TableCell, Object.assign({ sx: { fontWeight: 'bold' } }, Cells_Types_1.centered, { children: (0, jsx_runtime_1.jsxs)(material_2.Typography, Object.assign({}, Typography_types_1.tableHeaderCellTypography, { children: [' ', x] })) }), i))) }) }));
}
exports.TableHeader = TableHeader;
