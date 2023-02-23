"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebsocketStatusPartial = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_2 = require("react");
const material_1 = require("@mui/material");
const icons_material_1 = require("@mui/icons-material");
const ethtps_data_1 = require("ethtps.data");
const react_3 = __importDefault(require("react"));
function WebsocketStatusPartial() {
    const [connected, setConnected] = (0, react_2.useState)(false);
    const status = (0, ethtps_data_1.useAppSelector)((state) => state.websockets.isConnected);
    (0, react_1.useEffect)(() => {
        setConnected(status);
    }, [status]);
    return ((0, jsx_runtime_1.jsx)(react_3.default.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ style: {
                position: 'absolute',
                cursor: 'default',
                marginLeft: '1em',
                marginTop: '1em',
            }, className: connected ? 'disappear box' : 'appear box' }, { children: [connected ? ((0, jsx_runtime_1.jsx)(icons_material_1.SyncAlt, { color: connected ? 'primary' : 'error' })) : ((0, jsx_runtime_1.jsx)(icons_material_1.MobiledataOff, { color: connected ? 'primary' : 'error' })), (0, jsx_runtime_1.jsx)(material_1.Typography, Object.assign({ color: connected ? 'primary' : 'error', className: "inline" }, { children: connected ? 'Connected' : 'Disconnected' }))] })) }));
}
exports.WebsocketStatusPartial = WebsocketStatusPartial;
