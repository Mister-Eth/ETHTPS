"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexCell = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const ICustomCellConfiguration_1 = require("./ICustomCellConfiguration");
const icons_material_1 = require("@mui/icons-material");
const Types_1 = require("../../../../Types");
const react_1 = __importDefault(require("react"));
function IndexCell(config) {
    return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsx)(material_1.TableCell, Object.assign({}, (0, ICustomCellConfiguration_1.buildClassNames)(config), { onClick: () => config.clickCallback !== undefined
                ? config.clickCallback(config.provider, 'Index')
                : () => { } }, { children: (0, jsx_runtime_1.jsx)(material_1.IconButton, { children: (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, Types_1.ConditionalRender)((0, jsx_runtime_1.jsx)(icons_material_1.ArrowRight, {}), config.showTick), config.index] }), sx: {
                    fontSize: '13px',
                    height: '1rem',
                    width: '2rem',
                    fontWeight: config.showTick ? 'bold' : undefined,
                } }) })) }));
}
exports.IndexCell = IndexCell;
