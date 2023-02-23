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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameCell = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const ICustomCellConfiguration_1 = require("./ICustomCellConfiguration");
const Cells_Types_1 = require("../../Cells.Types");
const Typography_types_1 = require("./Typography.types");
const react_1 = require("react");
const Types_1 = require("../../../../Types");
const icons = __importStar(require("@mui/icons-material"));
const react_router_dom_1 = require("react-router-dom");
const ColorHooks_1 = require("ethtps.data/dist/hooks/ColorHooks");
const react_2 = __importDefault(require("react"));
function NameCell(config) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
    const colorDictionary = (0, ColorHooks_1.useGetProviderColorDictionaryFromAppStore)();
    const name = (_b = (_a = config.provider) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : '';
    let color = (_d = (_c = config.provider) === null || _c === void 0 ? void 0 : _c.color) !== null && _d !== void 0 ? _d : 'primary';
    (0, react_1.useEffect)(() => {
        if (colorDictionary) {
            color = colorDictionary[name];
        }
    }, [colorDictionary]);
    const hasIssues = ((_g = (_f = (_e = config.provider) === null || _e === void 0 ? void 0 : _e.status) === null || _f === void 0 ? void 0 : _f.isUnreliable) !== null && _g !== void 0 ? _g : false) &&
        ((_k = (_j = (_h = config.provider) === null || _h === void 0 ? void 0 : _h.status) === null || _j === void 0 ? void 0 : _j.isProbablyDown) !== null && _k !== void 0 ? _k : false);
    const noDataProvider = ((_l = config.provider) === null || _l === void 0 ? void 0 : _l.status) === undefined;
    return ((0, jsx_runtime_1.jsx)(react_2.default.Fragment, { children: (0, jsx_runtime_1.jsx)(material_1.Tooltip, Object.assign({ arrow: true, placement: "right", title: (0, jsx_runtime_1.jsx)(material_1.Typography, { children: `Click to read more about ${name}` }) }, { children: (0, jsx_runtime_1.jsx)(material_1.TableCell, Object.assign({}, Cells_Types_1.centered, (0, ICustomCellConfiguration_1.buildClassNames)(config), { onClick: () => config.clickCallback !== undefined
                    ? config.clickCallback(config.provider, 'Name')
                    : () => { } }, { children: (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'box' }, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: `/Providers/${(_m = config.provider) === null || _m === void 0 ? void 0 : _m.name}/Overview` }, { children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("img", { alt: `${(_o = config.provider) === null || _o === void 0 ? void 0 : _o.name} icon`, src: `provider-icons/${(_p = config.provider) === null || _p === void 0 ? void 0 : _p.name}.png`, className: 'tiny-img inline', style: { marginRight: '15px' } }), (0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ className: `inline ${config.clickCallback !== undefined
                                                ? 'pointable'
                                                : ''}`, color: color }, Typography_types_1.tableCellTypographyStandard, { children: (_q = config.provider) === null || _q === void 0 ? void 0 : _q.name }))] }) })), (0, Types_1.ConditionalRender)((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(material_1.Tooltip, Object.assign({ arrow: true, placement: "top", className: "spaced-horizontally", title: (0, jsx_runtime_1.jsxs)(material_1.Typography, { children: ["There are issues getting data for ", (_r = config.provider) === null || _r === void 0 ? void 0 : _r.name] }) }, { children: (0, jsx_runtime_1.jsx)(icons.CloudOff, { className: "inline small centered-vertically" }) })) }), hasIssues && !noDataProvider), (0, Types_1.ConditionalRender)((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)(material_1.Tooltip, Object.assign({ arrow: true, placement: "top", title: (0, jsx_runtime_1.jsxs)(material_1.Typography, { children: ["There is no data provider for", ' ', (_s = config.provider) === null || _s === void 0 ? void 0 : _s.name, " :/"] }) }, { children: (0, jsx_runtime_1.jsx)(icons.Warning, { className: "spaced-horizontally" }) })) }), noDataProvider)] })) }) })) })) }));
}
exports.NameCell = NameCell;
