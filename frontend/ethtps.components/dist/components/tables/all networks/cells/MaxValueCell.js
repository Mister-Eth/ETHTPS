"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaxValueCell = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const ethtps_data_1 = require("ethtps.data");
const DataHooks_1 = require("ethtps.data/dist/hooks/DataHooks");
const moment_1 = __importDefault(require("moment"));
const react_1 = __importDefault(require("react"));
const Cells_Types_1 = require("../../Cells.Types");
const ICustomCellConfiguration_1 = require("./ICustomCellConfiguration");
const Typography_types_1 = require("./Typography.types");
function generateMaxHoverMessage(data) {
    var _a;
    if (data === undefined ||
        ((data === null || data === void 0 ? void 0 : data.blockNumber) === undefined && (data === null || data === void 0 ? void 0 : data.date) === undefined) ||
        (data === null || data === void 0 ? void 0 : data.blockNumber) === 0 ||
        (0, moment_1.default)(data === null || data === void 0 ? void 0 : data.date).year() === undefined ||
        (0, moment_1.default)(data === null || data === void 0 ? void 0 : data.date).year() === 1) {
        return '';
    }
    if ((data === null || data === void 0 ? void 0 : data.blockNumber) !== undefined && (data === null || data === void 0 ? void 0 : data.blockNumber) !== 0) {
        return `Seen at block ${(0, ethtps_data_1.numberFormat)((_a = data === null || data === void 0 ? void 0 : data.blockNumber) !== null && _a !== void 0 ? _a : 0).toString()}`;
    }
    return `Seen ${(0, moment_1.default)(data === null || data === void 0 ? void 0 : data.date)}`;
}
function generateMaxTypography(data) {
    const message = generateMaxHoverMessage(data);
    return (message === null || message === void 0 ? void 0 : message.length) > 0 ? (0, jsx_runtime_1.jsx)(material_1.Typography, { children: message }) : undefined;
}
function MaxValueCell(config) {
    var _a;
    const type = ethtps_data_1.liveDataHooks.useGetLiveDataModeFromAppStore();
    const maxData = (0, DataHooks_1.useGetMaxDataForProviderFromAppStore)((_a = config.provider) === null || _a === void 0 ? void 0 : _a.name, type);
    const tooltipTypography = generateMaxTypography(maxData);
    return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsx)(material_1.TableCell, Object.assign({}, Cells_Types_1.centered, (0, ICustomCellConfiguration_1.buildClassNames)(config), { onClick: () => config.clickCallback !== undefined
                ? config.clickCallback(config.provider, 'MaxValue')
                : () => { } }, { children: (0, jsx_runtime_1.jsx)(material_1.Tooltip, Object.assign({ arrow: true, placement: "top-start", title: tooltipTypography }, { children: (0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({}, Typography_types_1.tableCellTypographyStandard, { sx: {
                        textDecoration: tooltipTypography !== undefined
                            ? 'underline'
                            : undefined,
                    } }, { children: (0, ethtps_data_1.numberFormat)(maxData === null || maxData === void 0 ? void 0 : maxData.value).toString() })) })) })) }));
}
exports.MaxValueCell = MaxValueCell;
