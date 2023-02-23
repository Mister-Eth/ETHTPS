"use strict";
exports.__esModule = true;
exports.useLoadValuesHook = void 0;
var react_1 = require("react");
var react_query_1 = require("react-query");
function useLoadValuesHook(dataName, loadFunction, setValueFunction, cacheTime, refetchInterval) {
    if (cacheTime === void 0) { cacheTime = undefined; }
    if (refetchInterval === void 0) { refetchInterval = 4000; }
    var _a = (0, react_1.useState)(false), completed = _a[0], setCompleted = _a[1];
    var _b = (0, react_query_1.useQuery)(dataName, loadFunction, {
        cacheTime: cacheTime,
        refetchInterval: refetchInterval,
        refetchOnWindowFocus: false
    }), data = _b.data, status = _b.status;
    (0, react_1.useEffect)(function () {
        if (status === 'success') {
            setCompleted(true);
            setValueFunction(data);
        }
    }, [data, status]);
    return completed;
}
exports.useLoadValuesHook = useLoadValuesHook;
//# sourceMappingURL=useLoadValuesHook.js.map