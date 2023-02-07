import React from "react"
import Sketch from "react-p5"
import p5Types from "p5" //Import this for typechecking and intellisense
import { DataResponseModelDictionary } from '../../../Types.dictionaries';
import { useGetProviderColorDictionaryFromAppStore } from "../../../hooks/ColorHooks";
import { useLiveData, LiveData, LiveDataPoint } from '../hooks';
import { createPointArray, transform, createYZCPoint } from "../streamgraph/StreamgraphAnimation";
import { useState, useEffect } from 'react';
import { milliseconds } from "date-fns";

function clamp(input: number, min: number, max: number) {
  return input < min ? min : input > max ? max : input
}

function map(current:number, in_min:number, in_max: number, out_min: number, out_max: number) {
  const mapped =
    ((current - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  return clamp(mapped, out_min, out_max)
}

interface IP5StreamgraphProperties {
    data?: DataResponseModelDictionary;
    maxAgeSeconds:number
}

let x = 50
const y = 50

function createDatedLiveDataPoint(data: LiveDataPoint, initialX: number): DatedLiveDataPoint {
    return {
        date: new Date(),
        x: initialX,
        dataPoints: data
  }
}

type DatedLiveDataPoint = {
    date: Date
    x:number
    dataPoints: LiveDataPoint
}

let xOffset = 0
let offsetCurrentTime = 0;

export const P5Streamgraph: React.FC<IP5StreamgraphProperties> = (props: IP5StreamgraphProperties) => {
    //See annotations in JS for more information
    const liveData = useLiveData()
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(500)
    const [_60sDataPoints, set60sDataPoints] = useState<DatedLiveDataPoint[]>()
    const [seriesCount, setSeriesCount] = useState(0)
    const [maxValue, setMaxValue] = useState(0)
    let sNow = new Date().getSeconds()
    useEffect(() => {
        console.log(liveData)
        if (liveData) {
            sNow = (new Date()).getSeconds()
            set60sDataPoints(
              _60sDataPoints?.filter(
                (x) =>
                  Math.abs(sNow - x.date.getSeconds()) < (props.maxAgeSeconds - 1),
              ),
            )
            if (_60sDataPoints === undefined) {
                 set60sDataPoints(liveData.data.map((x) =>
                     createDatedLiveDataPoint(x, width - 1)))
            }
            else {
                set60sDataPoints([
                    ...(_60sDataPoints as DatedLiveDataPoint[]),
                    ...liveData.data.map((x) =>
                        createDatedLiveDataPoint(x, width - 1),
                    ).sort((a,b)=>a.date.getSeconds() - b.date.getSeconds()),
                ])
            }
            let values = _60sDataPoints?.map(x => x.dataPoints.value) ?? [0];
            let max = Math.max(...values)
            setSeriesCount(values.length)
            setMaxValue(max)
        }
    }, [liveData])
    const colorDictionary = useGetProviderColorDictionaryFromAppStore()
    const mapX = (value: number) => map(value, 0, props.maxAgeSeconds, 0, width)
    const mapY = (value: number) => map(value, 0, maxValue, 0, height)
   // if (offsetCurrentTime === 0) offsetCurrentTime = -mapX(sNow)
    const getXY = (d: DatedLiveDataPoint, currentMs: number = 0) => {
        let result = {
          x: offsetCurrentTime + mapX(d.date.getSeconds() - (xOffset % width)),
          y: mapY(d.dataPoints.value),
        } 
        return result 
    }
    const setup = (p5: p5Types, canvasParentRef: Element) => {
        setWidth(canvasParentRef.clientWidth)
        p5.createCanvas(canvasParentRef.clientWidth, height).parent(
          canvasParentRef,
        )
    }
    const match = (d: DatedLiveDataPoint, indexOfD: number) => {
        if (_60sDataPoints) {
            for (let i = indexOfD + 1; i < seriesCount - 1; i++){
                if (_60sDataPoints[i].dataPoints.providerName === d.dataPoints.providerName)
                    return _60sDataPoints[i]
            }
        }
    }
    const getMatchedPair = (index: number) => {
        if (_60sDataPoints) {
               let d1 = _60sDataPoints[index]
            if (!d1) return undefined
            return [d1, match(d1, index)]
        }
    }
  const draw = (p5: p5Types) => {
      p5.background(0)
      p5.strokeWeight(4)
      if (_60sDataPoints) {
          for (let i = 0; i < seriesCount - 1 && maxValue > 0; i++) {
              let pair = getMatchedPair(i);
              if (!pair || !pair[0] || !pair[1]) continue;

              let p1 = getXY(pair[0], p5.millis())
              let p2 = getXY(pair[1], p5.millis())
              p5.line(p1.x, p1.y, p2.x, p2.y)
              p5.stroke(_60sDataPoints[i].dataPoints.providerColor)
          }
      }
      xOffset += mapX((p5.millis() / 1000) % props.maxAgeSeconds)
  }
  

  return <Sketch setup={setup} draw={draw} />
}

/*
   const getProcessedData = () =>
      [...Array.from(Object.keys(props.data as DataResponseModelDictionary))]
        .map((key) =>
          createPointArray(key, props.data as DataResponseModelDictionary),
        )
        .filter((x) => x !== undefined)
        .filter((x) => !x?.values.some((q : any) => q === undefined))
        .map((o) => transform(createYZCPoint(o, colorDictionary)))  
*/