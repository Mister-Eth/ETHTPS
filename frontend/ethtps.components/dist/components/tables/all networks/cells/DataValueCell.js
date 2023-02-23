"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataValueCell = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const ICustomCellConfiguration_1 = require("./ICustomCellConfiguration");
const material_1 = require("@mui/material");
const Typography_types_1 = require("./Typography.types");
const Cells_Types_1 = require("../../Cells.Types");
require("../../cells.styles.css");
const AnimatedTypography_1 = require("../../../text/AnimatedTypography");
const ethtps_data_1 = require("ethtps.data");
const react_1 = __importDefault(require("react"));
const SkeletonWithTooltip_1 = require("src/components/partials/skeletons/SkeletonWithTooltip");
function DataValueCell(config) {
    var _a;
    return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsx)(material_1.TableCell, Object.assign({}, Cells_Types_1.centered, (0, ICustomCellConfiguration_1.buildClassNames)(config), { onClick: () => config.clickCallback !== undefined
                ? config.clickCallback(config.provider, 'DataValue')
                : () => { } }, { children: config.value === undefined ? ((0, jsx_runtime_1.jsx)(SkeletonWithTooltip_1.SkeletonWithTooltip, { text: `Loading ${(_a = config.provider) === null || _a === void 0 ? void 0 : _a.name} ${(0, ethtps_data_1.toShortString)(config.dataType)}...` })) : ((0, jsx_runtime_1.jsx)(AnimatedTypography_1.AnimatedTypography, { animationClassName: "animated-cell", standard: Typography_types_1.tableCellTypographyStandard, child: (0, ethtps_data_1.numberFormat)(config.value).toString(), durationMs: 1000 })) })) }));
}
exports.DataValueCell = DataValueCell;
