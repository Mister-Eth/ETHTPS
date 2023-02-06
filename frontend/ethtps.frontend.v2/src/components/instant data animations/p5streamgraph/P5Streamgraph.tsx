import React from "react"
import Sketch from "react-p5"
import p5Types from "p5" //Import this for typechecking and intellisense
import { DataResponseModelDictionary } from '../../../Types.dictionaries';
import { useGetProviderColorDictionaryFromAppStore } from "../../../hooks/ColorHooks";
import { useLiveData, LiveData, LiveDataPoint } from '../hooks';
import { createPointArray, transform, createYZCPoint } from "../streamgraph/StreamgraphAnimation";
import { useState, useEffect } from 'react';

interface IP5StreamgraphProperties {
    data?: DataResponseModelDictionary;
    maxAgeSeconds:number
}

let x = 50
const y = 50

type DatedLiveDataPoint = {
    date: Date
    dataPoints: LiveDataPoint[]
}

export const P5Streamgraph: React.FC<IP5StreamgraphProperties> = (props: IP5StreamgraphProperties) => {
    //See annotations in JS for more information
    const liveData = useLiveData()
    const [_60sDataPoints, set60sDataPoints] = useState<DatedLiveDataPoint[]>()
    useEffect(() => {
        console.log(liveData)
        if (liveData) {
            let sNow = (new Date()).getSeconds()
            set60sDataPoints(
              _60sDataPoints?.filter(
                (x) =>
                  Math.abs(sNow - x.date.getSeconds()) < props.maxAgeSeconds,
              ),
            )/*
            set60sDataPoints([
                ... _60sDataPoints as DatedLiveDataPoint[],
                {
                    date: new Date(),
                    dataPoint: liveData.
                }
            ])*/
        }
    }, [liveData])
    const colorDictionary = useGetProviderColorDictionaryFromAppStore()
 
    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(canvasParentRef.clientWidth, 500).parent(
          canvasParentRef,
        )
  }

  const draw = (p5: p5Types) => {
      p5.background(0, 0)
      
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