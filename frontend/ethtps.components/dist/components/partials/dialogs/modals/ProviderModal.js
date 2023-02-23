"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderModal = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const material_1 = require("@mui/material");
const ProviderDataChart_1 = require("../../../charts/provider/ProviderDataChart");
const Types_1 = require("../../../../Types");
const react_1 = require("react");
const react_2 = __importDefault(require("react"));
const ethtps_data_1 = require("ethtps.data");
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    bgcolor: 'background.paper',
    border: '2px line #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
const generateNoDataAvailableString = (provider) => `There is no data available for ${provider}. If you're seeing this, it probably means there is no chain explorer integration available for ${provider} or that we haven't yet synchronized the data for ${provider} after the update. Please try again later. If you still don't see any data after a while, drop us a message on `;
function ProviderModal(config) {
    var _a, _b, _c;
    const [noData, setNoData] = (0, react_1.useState)(false);
    const noDataHandler = (0, ethtps_data_1.createHandlerFromCallback)((newValue) => {
        setNoData(true);
        console.debug('No data available for ' + newValue);
    });
    return ((0, jsx_runtime_1.jsx)(react_2.default.Fragment, { children: (0, jsx_runtime_1.jsx)(material_1.Modal, Object.assign({ keepMounted: false, open: config.open, "aria-labelledby": "parent-modal-title", "aria-describedby": "parent-modal-description", onClose: () => {
                setNoData(false);
                config.onClose();
            } }, { children: (0, jsx_runtime_1.jsx)(material_1.Box, Object.assign({ sx: Object.assign({}, style) }, { children: (0, jsx_runtime_1.jsxs)(material_1.Paper, Object.assign({ elevation: 1 }, { children: [(0, jsx_runtime_1.jsx)(material_1.Paper, Object.assign({ elevation: 2 }, { children: (0, Types_1.ConditionalRender)((0, jsx_runtime_1.jsx)(ProviderDataChart_1.ProviderDataChart, { onNoDataAvailable: noDataHandler, provider: {
                                    provider: (_a = config.provider) === null || _a === void 0 ? void 0 : _a.name,
                                } }), config.provider !== undefined) })), (0, Types_1.ConditionalRender)((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)(material_1.Alert, Object.assign({ severity: "warning" }, { children: [(0, jsx_runtime_1.jsx)(material_1.AlertTitle, { children: "No data available" }), generateNoDataAvailableString((_c = (_b = config.provider) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : ''), (0, jsx_runtime_1.jsx)("a", Object.assign({ href: "https://discord.com/invite/jWPcsTzpCT" }, { children: "Discord" })), ".", (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("a", Object.assign({ href: "https://github.com/Mister-Eth/ETHTPS/tree/dev/ETHTPS.API/ETHTPS.Services.Ethereum" }, { children: "See a list of available integrations here" })), "."] })) }), noData)] })) })) })) }));
}
exports.ProviderModal = ProviderModal;
