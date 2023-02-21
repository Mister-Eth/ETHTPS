"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useGetQueryWithAutoRefetch = void 0;
const react_query_1 = require("react-query");
const react_1 = require("react");
function useGetQueryWithAutoRefetch(requestName, action) {
    const { data, isSuccess, refetch } = (0, react_query_1.useQuery)("auto refetch " + requestName, action);
    (0, react_1.useEffect)(() => {
        if (!isSuccess) {
            refetch();
        }
    }, [data]);
    return data;
}
exports.useGetQueryWithAutoRefetch = useGetQueryWithAutoRefetch;
