import React, { useEffect, useState } from "react"
import { CityTemperature } from "@visx/mock-data/lib/mocks/cityTemperature"

import ExampleControls from "./ExampleControls"
import CustomChartBackground from "./CustomChartBackground"
import { useQuery } from "react-query"
import { config } from "react-transition-group"
import { DataType, StringTimeValue } from "../../../Types"
import { api } from "../../../services/DependenciesIOC"
import { IntervalDropdown } from "../../dropdowns/IntervalDropdown"
import { DataModeButtonGroup } from "../../buttons/DataModeButtonGroup"

export type XYChartProps = {
  width: number
  height: number
}

type City = "San Francisco" | "New York" | "Austin"

export function XYChart({ height }: XYChartProps) {
  const [interval, setInterval] = useState<string>("OneMonth")
  const [network, setNetwork] = useState("Mainnet")
  const [mode, setMode] = useState(DataType.TPS)

  const [d, setD] = useState<StringTimeValue[]>([])
  const [noData, setNoData] = useState(false)
  const [usesDatePicker, setUsesDatePicker] = useState(false)
  const [loading, setLoading] = useState(true)
  const intervalChanged = (interval: string) => {
    const usesDate = interval === "Custom"
    setUsesDatePicker(usesDate)
    if (!usesDate) setInterval(interval)
  }
  const modeChanged = (mode: DataType) => {
    setMode(mode)
  }
  const networkChanged = (network: string) => {
    setNetwork(network)
  }

  const { data, isSuccess, refetch } = useQuery(
    "get data",
    () => api.getData(mode, interval as string, "All", network),
    { refetchOnMount: false, refetchInterval: 60 * 1000 },
  )
  useEffect(() => {
    if (isSuccess) {
      if (data["All"] !== undefined) {
        /*
        const values = data["All"]?.map((x) => x.data?.at(0))
        if (values.length > 0) {
          setD(
            values
              .filter((x) => x?.value !== undefined)
              ?.map((x) => new StringTimeValue(x)),
          )*/
        setNoData(false)
        setLoading(false)
      }
    }
  }, [data])

  useEffect(() => {
    if (!isSuccess) {
      setLoading(true)
      refetch()
    }
  }, [isSuccess])

  useEffect(() => {
    setLoading(true)
    refetch()
  }, [interval, network, mode])
  return (
    <>
      <DataModeButtonGroup modeChanged={modeChanged} />
      <IntervalDropdown onChanged={intervalChanged} />
      <ExampleControls>
        {({
          accessors,
          animationTrajectory,
          annotationDataKey,
          annotationDatum,
          annotationLabelPosition,
          annotationType,
          colorAccessorFactory,
          config,
          curve,
          xydata,
          editAnnotationLabelPosition,
          numTicks,
          renderAreaSeries,
          renderAreaStack,
          renderBarGroup,
          renderBarSeries,
          renderBarStack,
          renderGlyph,
          renderGlyphSeries,
          enableTooltipGlyph,
          renderTooltipGlyph,
          renderHorizontally,
          renderLineSeries,
          setAnnotationDataIndex,
          setAnnotationDataKey,
          setAnnotationLabelPosition,
          sharedTooltip,
          showGridColumns,
          showGridRows,
          showHorizontalCrosshair,
          showTooltip,
          showVerticalCrosshair,
          snapTooltipToDatumX,
          snapTooltipToDatumY,
          stackOffset,
          theme,
          xAxisOrientation,
          yAxisOrientation,

          // components are animated or not depending on selection
          Annotation,
          AreaSeries,
          AreaStack,
          Axis,
          BarGroup,
          BarSeries,
          BarStack,
          GlyphSeries,
          Grid,
          LineSeries,
          AnnotationCircleSubject,
          AnnotationConnector,
          AnnotationLabel,
          AnnotationLineSubject,
          Tooltip,
          XYChart,
        }) => (
          <XYChart
            theme={theme}
            xScale={config.x}
            yScale={config.y}
            height={Math.min(400, height)}
            captureEvents={!editAnnotationLabelPosition}
            onPointerUp={(d: any) => {
              setAnnotationDataKey(
                d.key as "New York" | "San Francisco" | "Austin",
              )
              setAnnotationDataIndex(d.index)
            }}
          >
            <CustomChartBackground />
            <Grid
              key={`grid-${animationTrajectory}`} // force animate on update
              rows={showGridRows}
              columns={showGridColumns}
              animationTrajectory={animationTrajectory}
              numTicks={numTicks}
            />
            {renderBarStack && (
              <BarStack offset={stackOffset}>
                <BarSeries
                  dataKey="New York"
                  data={xydata}
                  xAccessor={accessors.x["New York"]}
                  yAccessor={accessors.y["New York"]}
                />
                <BarSeries
                  dataKey="San Francisco"
                  data={xydata}
                  xAccessor={accessors.x["San Francisco"]}
                  yAccessor={accessors.y["San Francisco"]}
                />
                <BarSeries
                  dataKey="Austin"
                  data={xydata}
                  xAccessor={accessors.x.Austin}
                  yAccessor={accessors.y.Austin}
                />
              </BarStack>
            )}
            {renderBarGroup && (
              <BarGroup>
                <BarSeries
                  dataKey="New York"
                  data={xydata}
                  xAccessor={accessors.x["New York"]}
                  yAccessor={accessors.y["New York"]}
                  colorAccessor={colorAccessorFactory("New York")}
                />
                <BarSeries
                  dataKey="San Francisco"
                  data={xydata}
                  xAccessor={accessors.x["San Francisco"]}
                  yAccessor={accessors.y["San Francisco"]}
                  colorAccessor={colorAccessorFactory("San Francisco")}
                />
                <BarSeries
                  dataKey="Austin"
                  data={xydata}
                  xAccessor={accessors.x.Austin}
                  yAccessor={accessors.y.Austin}
                  colorAccessor={colorAccessorFactory("Austin")}
                />
              </BarGroup>
            )}
            {renderBarSeries && (
              <BarSeries
                dataKey="New York"
                data={xydata}
                xAccessor={accessors.x["New York"]}
                yAccessor={accessors.y["New York"]}
                colorAccessor={colorAccessorFactory("New York")}
              />
            )}
            {renderAreaSeries && (
              <>
                <AreaSeries
                  dataKey="Austin"
                  data={xydata}
                  xAccessor={accessors.x.Austin}
                  yAccessor={accessors.y.Austin}
                  fillOpacity={0.4}
                  curve={curve}
                />
                <AreaSeries
                  dataKey="New York"
                  data={xydata}
                  xAccessor={accessors.x["New York"]}
                  yAccessor={accessors.y["New York"]}
                  fillOpacity={0.4}
                  curve={curve}
                />
                <AreaSeries
                  dataKey="San Francisco"
                  data={xydata}
                  xAccessor={accessors.x["San Francisco"]}
                  yAccessor={accessors.y["San Francisco"]}
                  fillOpacity={0.4}
                  curve={curve}
                />
              </>
            )}
            {renderAreaStack && (
              <AreaStack
                curve={curve}
                offset={stackOffset}
                renderLine={stackOffset !== "wiggle"}
              >
                <AreaSeries
                  dataKey="Austin"
                  data={xydata}
                  xAccessor={accessors.x.Austin}
                  yAccessor={accessors.y.Austin}
                  fillOpacity={0.4}
                />
                <AreaSeries
                  dataKey="New York"
                  data={xydata}
                  xAccessor={accessors.x["New York"]}
                  yAccessor={accessors.y["New York"]}
                  fillOpacity={0.4}
                />
                <AreaSeries
                  dataKey="San Francisco"
                  data={xydata}
                  xAccessor={accessors.x["San Francisco"]}
                  yAccessor={accessors.y["San Francisco"]}
                  fillOpacity={0.4}
                />
              </AreaStack>
            )}
            {renderLineSeries && (
              <>
                <LineSeries
                  dataKey="Austin"
                  data={xydata}
                  xAccessor={accessors.x.Austin}
                  yAccessor={accessors.y.Austin}
                  curve={curve}
                />
                {!renderBarSeries && (
                  <LineSeries
                    dataKey="New York"
                    data={xydata}
                    xAccessor={accessors.x["New York"]}
                    yAccessor={accessors.y["New York"]}
                    curve={curve}
                  />
                )}
                <LineSeries
                  dataKey="San Francisco"
                  data={xydata}
                  xAccessor={accessors.x["San Francisco"]}
                  yAccessor={accessors.y["San Francisco"]}
                  curve={curve}
                />
              </>
            )}
            {renderGlyphSeries && (
              <GlyphSeries
                dataKey="San Francisco"
                data={xydata}
                xAccessor={accessors.x["San Francisco"]}
                yAccessor={accessors.y["San Francisco"]}
                renderGlyph={renderGlyph}
                colorAccessor={colorAccessorFactory("San Francisco")}
              />
            )}
            <Axis
              key={`time-axis-${animationTrajectory}-${renderHorizontally}`}
              orientation={
                renderHorizontally ? yAxisOrientation : xAxisOrientation
              }
              numTicks={numTicks}
              animationTrajectory={animationTrajectory}
            />
            <Axis
              key={`temp-axis-${animationTrajectory}-${renderHorizontally}`}
              label={
                stackOffset == null
                  ? "Temperature (°F)"
                  : stackOffset === "expand"
                  ? "Fraction of total temperature"
                  : ""
              }
              orientation={
                renderHorizontally ? xAxisOrientation : yAxisOrientation
              }
              numTicks={numTicks}
              animationTrajectory={animationTrajectory}
              // values don't make sense in stream graph
              tickFormat={stackOffset === "wiggle" ? () => "" : undefined}
            />
            {annotationDataKey && annotationDatum && (
              <Annotation
                dataKey={annotationDataKey}
                datum={annotationDatum}
                dx={annotationLabelPosition.dx}
                dy={annotationLabelPosition.dy}
                editable={editAnnotationLabelPosition}
                canEditSubject={false}
                onDragEnd={({ dx, dy }) =>
                  setAnnotationLabelPosition({ dx, dy })
                }
              >
                <AnnotationConnector />
                {annotationType === "circle" ? (
                  <AnnotationCircleSubject />
                ) : (
                  <AnnotationLineSubject />
                )}
                <AnnotationLabel
                  title={annotationDataKey}
                  subtitle={`${annotationDatum.date}, ${annotationDatum[annotationDataKey]}°F`}
                  width={135}
                  backgroundProps={{
                    stroke: theme.gridStyles.stroke,
                    strokeOpacity: 0.5,
                    fillOpacity: 0.8,
                  }}
                />
              </Annotation>
            )}
            {showTooltip && (
              <Tooltip<CityTemperature>
                showHorizontalCrosshair={showHorizontalCrosshair}
                showVerticalCrosshair={showVerticalCrosshair}
                snapTooltipToDatumX={snapTooltipToDatumX}
                snapTooltipToDatumY={snapTooltipToDatumY}
                showDatumGlyph={
                  (snapTooltipToDatumX || snapTooltipToDatumY) &&
                  !renderBarGroup
                }
                showSeriesGlyphs={sharedTooltip && !renderBarGroup}
                renderGlyph={
                  enableTooltipGlyph ? renderTooltipGlyph : undefined
                }
                renderTooltip={({ tooltipData, colorScale }) => (
                  <>
                    {/** date */}
                    {(tooltipData?.nearestDatum?.datum &&
                      accessors.date(tooltipData?.nearestDatum?.datum)) ||
                      "No date"}
                    <br />
                    <br />
                    {/** temperatures */}
                    {(
                      (sharedTooltip
                        ? Object.keys(tooltipData?.datumByKey ?? {})
                        : [tooltipData?.nearestDatum?.key]
                      ).filter((city) => city) as City[]
                    ).map((city) => {
                      const temperature =
                        tooltipData?.nearestDatum?.datum &&
                        accessors[renderHorizontally ? "x" : "y"][city](
                          tooltipData?.nearestDatum?.datum,
                        )

                      return (
                        <div key={city}>
                          <em
                            style={{
                              color: colorScale?.(city),
                              textDecoration:
                                tooltipData?.nearestDatum?.key === city
                                  ? "underline"
                                  : undefined,
                            }}
                          >
                            {city}
                          </em>{" "}
                          {temperature == null || Number.isNaN(temperature)
                            ? "–"
                            : `${temperature}° F`}
                        </div>
                      )
                    })}
                  </>
                )}
              />
            )}
          </XYChart>
        )}
      </ExampleControls>
    </>
  )
}
