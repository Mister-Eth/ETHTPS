"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderTypeCell = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const ICustomCellConfiguration_1 = require("./ICustomCellConfiguration");
const react_1 = __importDefault(require("react"));
const Cells_Types_1 = require("../../Cells.Types");
const Typography_types_1 = require("./Typography.types");
const ColorHooks_1 = require("ethtps.data/dist/hooks/ColorHooks");
function ProviderTypeCell(config) {
    var _a, _b, _c;
    const colorDictionary = (0, ColorHooks_1.useGetProviderTypeColorDictionaryFromAppStore)();
    const name = (_b = (_a = config.provider) === null || _a === void 0 ? void 0 : _a.type) !== null && _b !== void 0 ? _b : '';
    const color = colorDictionary !== undefined ? colorDictionary[name] : 'primary';
    return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsx)(material_1.TableCell, Object.assign({}, Cells_Types_1.centered, (0, ICustomCellConfiguration_1.buildClassNames)(config), { sx: { color: color }, onClick: () => config.clickCallback !== undefined
                ? config.clickCallback(config.provider, 'ProviderType')
                : () => { } }, { children: (0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({}, Typography_types_1.tableCellTypographyStandard, { children: (_c = config.provider) === null || _c === void 0 ? void 0 : _c.type })) })) }));
}
exports.ProviderTypeCell = ProviderTypeCell;
