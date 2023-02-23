"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.Handler = exports.useHandler = exports.createHandlerFromCallback = void 0;
var react_1 = __importDefault(require("react"));
function createHandlerFromCallback(callback) {
    return createHandlerFromType({ callback: callback });
}
exports.createHandlerFromCallback = createHandlerFromCallback;
function useHandler(handler) {
    if (!handler)
        return undefined;
    return react_1["default"].useCallback(function () { return createHandlerFromType(handler); }, [handler])();
}
exports.useHandler = useHandler;
function createHandlerFromType(handler) {
    return createHandler(handler);
}
function createHandler(handler) {
    if (!handler)
        return new Handler(function (newValue) { });
    var _a = react_1["default"].useState(handler.defaultValue), value = _a[0], setValue = _a[1];
    var setter = function (newValue) {
        var _a;
        setValue(newValue);
        (_a = handler.callback) === null || _a === void 0 ? void 0 : _a.call(handler, newValue);
    };
    return new Handler(setter, value);
}
var Handler = /** @class */ (function () {
    function Handler(setter, value) {
        if (setter === void 0) { setter = function (newValue) {
            _this.value = newValue;
        }; }
        var _this = this;
        this.setter = setter;
        this.value = value;
    }
    Handler.prototype.convertToIHandler = function () {
        return {
            defaultValue: this.value
        };
    };
    return Handler;
}());
exports.Handler = Handler;
//# sourceMappingURL=HandlerHooks.js.map