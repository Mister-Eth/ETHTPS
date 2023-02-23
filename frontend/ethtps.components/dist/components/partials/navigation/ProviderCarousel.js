"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderCarousel = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = __importDefault(require("react"));
const LargeProviderHeader_1 = require("../../widgets/LargeProviderHeader");
function ProviderCarousel(config) {
    //	const providers = useGetProvidersFromAppStore()
    return ((0, jsx_runtime_1.jsx)(react_1.default.Fragment, { children: (0, jsx_runtime_1.jsx)(LargeProviderHeader_1.LargeProviderHeader, { provider: config.provider }) }));
}
exports.ProviderCarousel = ProviderCarousel;
