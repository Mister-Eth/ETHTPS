import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { ConditionalSkeletonRender } from '../../Types';
export function MultiProviderVSIXChart() {
    const [containerWidth, setContainerWidth] = useState(0);
    const containerRef = useRef(null);
    useEffect(() => {
        setContainerWidth(containerRef.current ? containerRef.current.offsetWidth : 0);
    }, [containerRef.current]);
    return (_jsx(React.Fragment, { children: _jsx("div", { className: "container", ref: containerRef, children: ConditionalSkeletonRender(_jsx(_Fragment, {}), containerWidth > 0) }) }));
}
