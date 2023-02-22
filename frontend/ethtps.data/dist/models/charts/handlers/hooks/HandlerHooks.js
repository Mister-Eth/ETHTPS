"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Handler = exports.useHandler = exports.createHandlerFromCallback = void 0;
const react_1 = __importDefault(require("react"));
function createHandlerFromCallback(callback) {
    return createHandlerFromType({ callback });
}
exports.createHandlerFromCallback = createHandlerFromCallback;
function useHandler(handler) {
    if (!handler)
        return undefined;
    return react_1.default.useCallback(() => createHandlerFromType(handler), [handler])();
}
exports.useHandler = useHandler;
function createHandlerFromType(handler) {
    return createHandler(handler);
}
function createHandler(handler) {
    if (!handler)
        return new Handler((newValue) => { });
    const [value, setValue] = react_1.default.useState(handler.defaultValue);
    const setter = (newValue) => {
        var _a;
        setValue(newValue);
        (_a = handler.callback) === null || _a === void 0 ? void 0 : _a.call(handler, newValue);
    };
    return new Handler(setter, value);
}
class Handler {
    constructor(setter = (newValue) => {
        this.value = newValue;
    }, value) {
        this.setter = setter;
        this.value = value;
    }
    convertToIHandler() {
        return {
            defaultValue: this.value,
        };
    }
}
exports.Handler = Handler;
