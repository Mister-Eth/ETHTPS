import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback } from 'react';
import { Stack } from '@visx/shape';
import { PatternCircles } from '@visx/pattern';
import { scaleLinear } from '@visx/scale';
import { transpose } from 'd3-array';
import { animated, useSpring } from '@react-spring/web';
import { WebsocketStatusPartial } from '../stats/WebsocketStatusPartial';
import { useEffect } from 'react';
import { useState } from 'react';
import { curveCardinal } from '@visx/curve';
import moment from 'moment';
import { DataType, colorHooks, handleException, } from 'ethtps.data';
import { useLiveData, useLiveDataState } from './hooks';
// constants
const NUM_LAYERS = 20;
export const BACKGROUND = '#ffdede';
// utils
const range = (n) => Array.from(new Array(n), (_, i) => i);
const keys = range(NUM_LAYERS);
// scales
const xScale = scaleLinear({});
const yScale = scaleLinear({});
const getY0 = (d) => {
    return yScale(Math.min(...d)) ?? 0;
};
const getY1 = (d) => {
    return yScale(Math.max(...d)) ?? 0;
};
export function CustomVISXStreamgraph({ width, height, animate = true, l2DataGetter, }) {
    //const forceUpdate = useForceUpdate()
    //const handlePress = () => forceUpdate()
    if (width < 10)
        return null;
    const liveState = useLiveDataState();
    const [data, setData] = useState();
    const colors = colorHooks.useGetProviderColorDictionaryFromAppStore();
    const [processedStreamchartData, setProcessedStreamchartData] = useState({
        providers: ['Mock until loaded'],
        data: [range(60).map(() => Math.random() * 10)],
    });
    const generateRequestModel = () => {
        return {
            startDate: moment().subtract(1, 'minute').toDate(),
            providers: ['All'],
            includeSidechains: liveState.sidechainsIncluded,
            mergeOptions: {
                mergePercentage: 10,
            },
        };
    };
    const getDataCallback = () => useCallback(async () => await l2DataGetter?.dataGetter({
        ...generateRequestModel(),
        dataType: DataType.Tps,
    }), [
        (liveState.mode,
            liveState.sidechainsIncluded,
            liveState.smoothing),
    ]);
    const [max, setMax] = useState(0);
    useEffect(() => {
        getDataCallback()()
            .then((x) => setData(x))
            .catch(handleException);
    }, [liveState.mode, liveState.sidechainsIncluded, liveState.smoothing]);
    useEffect(() => {
        if (data) {
            setData(data);
            if (data?.simpleAnalysis?.allDatasetsSameLength) {
                let length = Math.min(data?.simpleAnalysis?.uniformDatasetLength ?? 1, 60);
                xScale.domain([0, length - 1]);
                if (data.datasets)
                    setProcessedStreamchartData({
                        providers: data.datasets.map((x) => x.provider),
                        data: data.datasets.map((x) => x.dataPoints
                            ?.slice(0, length)
                            .map((y) => y.y) ?? []),
                    });
            }
        }
    }, [data]);
    const liveData = useLiveData();
    const [_, setDataPoints] = useState([0, 0, 0]);
    useEffect(() => {
        if (liveData) {
            setDataPoints(liveData.data?.map((x) => x?.value ?? 0));
            let temp = processedStreamchartData;
            let currentMax = 0;
            for (let i = 0; i < temp.providers.length; i++) {
                temp.data[i].shift();
                currentMax = Math.max(currentMax, Math.max(...temp.data[i]));
                const v = liveData.data?.find((x) => x.providerName === temp.providers[i])?.value ?? 0; //temp.data[i][temp.data.length - 1]
                temp.data[i].push(v);
            }
            setMax(currentMax);
            //yScale.domain([-max, max])
            setProcessedStreamchartData(temp);
        }
    }, [liveData]);
    xScale.range([0, width]);
    xScale.domain([0, 59]);
    yScale.range([height, 0]);
    useEffect(() => {
        const n = Math.ceil((max / 10) * 10);
        const m = Math.floor((max / 10) * 10);
        yScale.domain([-m, n * 1.5]);
    }, [max]);
    yScale.clamp(true);
    const colorFunction = (key, index) => colors ? colors[processedStreamchartData.providers[index]] : 'yellow';
    const customScale = (x) => colorFunction(0, x);
    const pathRefs = range(processedStreamchartData.data.length).map(() => React.createRef());
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    return (_jsxs(React.Fragment, { children: [_jsx(WebsocketStatusPartial, {}), _jsxs("svg", { width: width, height: height, children: [_jsx(PatternCircles, { id: 'circles', height: 40, width: 40, radius: 5, fill: 'black', complement: true }), _jsx(PatternCircles, { id: 'hovered-circles', height: 40, width: 40, radius: 5, fill: 'white', complement: true }), _jsxs("g", { children: [_jsx("rect", { x: 0, y: 0, width: width, height: height, fill: BACKGROUND, rx: 24 }), _jsx(Stack, { data: transpose(processedStreamchartData.data), keys: keys, curve: curveCardinal, accumulate: 'sum', offset: "wiggle", color: colorFunction, x: (_, i) => xScale(i) ?? 0, y0: getY0, y1: getY1, children: ({ stacks, path }) => stacks.map((stack) => {
                                    // Alternatively use renderprops <Spring to={{ d }}>{tweened => ...}</Spring>
                                    const pathString = path(stack) || '';
                                    const tweened = animate
                                        ? useSpring({ pathString })
                                        : { pathString };
                                    const color = customScale(stack.key);
                                    return (_jsxs("g", { children: [_jsx(animated.path, { d: tweened.pathString, fill: color }), _jsx(animated.path, { ref: pathRefs[stack.index], onMouseEnter: () => setHighlightedIndex(stack.index), onMouseLeave: () => setHighlightedIndex(-1), d: tweened.pathString, fill: `url(#${stack.index === highlightedIndex
                                                    ? 'hovered-'
                                                    : ''}circles)` })] }, `series-${stack.key}`));
                                }) })] })] })] }));
}
