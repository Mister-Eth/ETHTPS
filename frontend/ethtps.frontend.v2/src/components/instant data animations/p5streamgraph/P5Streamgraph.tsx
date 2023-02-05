import React from "react"
import Sketch from "react-p5"
import p5Types from "p5" //Import this for typechecking and intellisense
import { DataResponseModelDictionary } from '../../../Types.dictionaries';
import { useGetProviderColorDictionaryFromAppStore } from "../../../hooks/ColorHooks";
import { useLiveData } from "../hooks";
import { createPointArray, transform, createYZCPoint } from "../streamgraph/StreamgraphAnimation";

interface IP5StreamgraphProperties {
    data?: DataResponseModelDictionary;
}

let x = 50
const y = 50

export const P5Streamgraph: React.FC<IP5StreamgraphProperties> = (props: IP5StreamgraphProperties) => {
    //See annotations in JS for more information
    const liveData = useLiveData()
    const colorDictionary = useGetProviderColorDictionaryFromAppStore()
    const getProcessedData = () =>
      [...Array.from(Object.keys(props.data as DataResponseModelDictionary))]
        .map((key) =>
          createPointArray(key, props.data as DataResponseModelDictionary),
        )
        .filter((x) => x !== undefined)
        .filter((x) => !x?.values.some((q : any) => q === undefined))
        .map((o) => transform(createYZCPoint(o, colorDictionary)))  
    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(canvasParentRef.clientWidth, 500).parent(
          canvasParentRef,
        )
  }

  const draw = (p5: p5Types) => {
    p5.background(0,0)
    p5.ellipse(x, y, 70, 70)
    x++ 
  }
  

  return <Sketch setup={setup} draw={draw} />
}
