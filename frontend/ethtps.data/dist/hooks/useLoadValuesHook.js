"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLoadValuesHook = void 0;
const react_1 = require("react");
const react_query_1 = require("react-query");
function useLoadValuesHook(dataName, loadFunction, setValueFunction, cacheTime = undefined, refetchInterval = 4000) {
    const [completed, setCompleted] = (0, react_1.useState)(false);
    const { data, status } = (0, react_query_1.useQuery)(dataName, loadFunction, {
        cacheTime: cacheTime,
        refetchInterval: refetchInterval,
        refetchOnWindowFocus: false,
    });
    (0, react_1.useEffect)(() => {
        if (status === "success") {
            setCompleted(true);
            setValueFunction(data);
        }
    }, [data, status]);
    return completed;
}
exports.useLoadValuesHook = useLoadValuesHook;
