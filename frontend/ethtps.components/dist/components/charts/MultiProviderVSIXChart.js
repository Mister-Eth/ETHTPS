var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { ConditionalSkeletonRender } from '../../Types';
import React from 'react';
export function MultiProviderVSIXChart() {
    var _a = useState(0), containerWidth = _a[0], setContainerWidth = _a[1];
    var containerRef = useRef(null);
    useEffect(function () {
        setContainerWidth(containerRef.current ? containerRef.current.offsetWidth : 0);
    }, [containerRef.current]);
    return (_jsx(React.Fragment, { children: _jsx("div", __assign({ className: "container", ref: containerRef }, { children: ConditionalSkeletonRender(_jsx(_Fragment, {}), containerWidth > 0) })) }));
}
//# sourceMappingURL=MultiProviderVSIXChart.js.map