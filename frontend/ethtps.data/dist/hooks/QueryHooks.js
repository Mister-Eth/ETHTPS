"use strict";
exports.__esModule = true;
exports.useGetQueryWithAutoRefetch = void 0;
var react_query_1 = require("react-query");
var react_1 = require("react");
function useGetQueryWithAutoRefetch(requestName, action) {
    var _a = (0, react_query_1.useQuery)('auto refetch ' + requestName, action), data = _a.data, isSuccess = _a.isSuccess, refetch = _a.refetch;
    (0, react_1.useEffect)(function () {
        if (!isSuccess) {
            refetch();
        }
    }, [data]);
    return data;
}
exports.useGetQueryWithAutoRefetch = useGetQueryWithAutoRefetch;
//# sourceMappingURL=QueryHooks.js.map