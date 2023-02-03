import { Streamgraph } from "./Streamgraph"
import { ReactDOM } from "react"
import * as d3 from "d3"
import { useD3 } from "../../../hooks/useD3"
const data = [
  { year: 1980, efficiency: 24.3, sales: 8949000 },

  { year: 1985, efficiency: 27.6, sales: 10979000 },

  { year: 1990, efficiency: 28, sales: 9303000 },

  { year: 1991, efficiency: 28.4, sales: 8185000 },

  { year: 1992, efficiency: 27.9, sales: 8213000 },

  { year: 1993, efficiency: 28.4, sales: 8518000 },

  { year: 1994, efficiency: 28.3, sales: 8991000 },

  { year: 1995, efficiency: 28.6, sales: 8620000 },

  { year: 1996, efficiency: 28.5, sales: 8479000 },

  { year: 1997, efficiency: 28.7, sales: 8217000 },

  { year: 1998, efficiency: 28.8, sales: 8085000 },

  { year: 1999, efficiency: 28.3, sales: 8638000 },

  { year: 2000, efficiency: 28.5, sales: 8778000 },

  { year: 2001, efficiency: 28.8, sales: 8352000 },

  { year: 2002, efficiency: 29, sales: 8042000 },

  { year: 2003, efficiency: 29.5, sales: 7556000 },

  { year: 2004, efficiency: 29.5, sales: 7483000 },

  { year: 2005, efficiency: 30.3, sales: 7660000 },

  { year: 2006, efficiency: 30.1, sales: 7762000 },

  { year: 2007, efficiency: 31.2, sales: 7562000 },

  { year: 2008, efficiency: 31.5, sales: 6769000 },

  { year: 2009, efficiency: 32.9, sales: 5402000 },

  { year: 2010, efficiency: 33.9, sales: 5636000 },

  { year: 2011, efficiency: 33.1, sales: 6093000 },

  { year: 2012, efficiency: 35.3, sales: 7245000 },

  { year: 2013, efficiency: 36.4, sales: 7586000 },

  { year: 2014, efficiency: 36.5, sales: 7708000 },

  { year: 2015, efficiency: 37.2, sales: 7517000 },

  { year: 2016, efficiency: 37.7, sales: 6873000 },

  { year: 2017, efficiency: 39.4, sales: 6081000 },
]

export function StreamgraphAnimation() {
  const width = 750
  const height = 500
  const config = {
    x: (d) => d.year,
    y: (d) => d.efficiency,
    z: (d) => "Something",
    yLabel: "↑ Unemployed persons",
    width,
    height: height,
  }

  const ref = useD3(
    (svgRef) =>
      ((
        svgRef,
        {
          x = ([x]) => x, // given d in data, returns the (ordinal) x-value
          y = ([, y]) => y, // given d in data, returns the (quantitative) y-value
          z = () => 1, // given d in data, returns the (categorical) z-value
          marginTop = 20, // top margin, in pixels
          marginRight = 30, // right margin, in pixels
          marginBottom = 30, // bottom margin, in pixels
          marginLeft = 20, // left margin, in pixels
          width = 640, // outer width, in pixels
          height = 400, // outer height, in pixels
          xType = d3.scaleUtc, // type of x-scale
          xDomain, // [xmin, xmax]
          xRange = [marginLeft, width - marginRight], // [left, right]
          yType = d3.scaleLinear, // type of y-scale
          yDomain, // [ymin, ymax]
          yRange = [height - marginBottom, marginTop], // [bottom, top]
          zDomain, // array of z-values
          offset = d3.stackOffsetWiggle, // stack offset method
          order = d3.stackOrderInsideOut, // stack order method
          xFormat, // a format specifier string for the x-axis
          yFormat, // a format specifier string for the y-axis
          yLabel, // a label for the y-axis
          colors = d3.schemeTableau10,
        } = {},
      ) => {
        if (svgRef === undefined) return
        console.log("render")
        // Compute values.
        const X = d3.map(data, x)
        const Y = d3.map(data, y)
        const Z = d3.map(data, z)

        // Compute default x- and z-domains, and unique the z-domain.
        if (xDomain === undefined) xDomain = d3.extent(X)
        if (zDomain === undefined) zDomain = Z
        zDomain = new d3.InternSet(zDomain)

        // Omit any data not present in the z-domain.
        const I = d3.range(X.length).filter((i) => zDomain.has(Z[i]))

        // Compute a nested array of series where each series is [[y1, y2], [y1, y2],
        // [y1, y2], …] representing the y-extent of each stacked rect. In addition,
        // each tuple has an i (index) property so that we can refer back to the
        // original data point (data[i]). This code assumes that there is only one
        // data point for a given unique x- and z-value.
        const series = d3
          .stack()
          .keys(zDomain)
          .value(([x, I], z) => Y[I.get(z)])
          .order(order)
          .offset(offset)(
            d3.rollup(
              I,
              ([i]) => i,
              (i) => X[i],
              (i) => Z[i],
            ),
          )
          .map((s) =>
            s.map((d) => Object.assign(d, { i: d.data[1].get(s.key) })),
          )

        // Compute the default y-domain. Note: diverging stacks can be negative.
        if (yDomain === undefined) yDomain = d3.extent(series.flat(2))

        // Construct scales and axes.
        const xScale = xType(xDomain, xRange)
        const yScale = yType(yDomain, yRange)
        const color = d3.scaleOrdinal(zDomain, colors)
        const xAxis = d3
          .axisBottom(xScale)
          .ticks(width / 80, xFormat)
          .tickSizeOuter(0)

        const area = d3
          .area()
          .x(({ i }) => xScale(X[i]))
          .y0(([y1]) => yScale(y1))
          .y1(([, y2]) => yScale(y2))

        svgRef
          .attr("width", width)
          .attr("height", height)
          .attr("viewBox", [0, 0, width, height])
          .attr("style", "max-width: 100%; height: auto; height: intrinsic;")

        svgRef
          .append("g")
          .selectAll("path")
          .data(series)
          .join("path")
          .attr("fill", ([{ i }]) => color(Z[i]))
          .attr("d", area)
          .append("title")
          .text(([{ i }]) => Z[i])

        svgRef
          .append("g")
          .attr("transform", `translate(0,${height - marginBottom})`)
          .call(xAxis)
          .call((g) => g.select(".domain").remove())

        svgRef
          .append("g")
          .attr("transform", `translate(${marginLeft},0)`)
          .call((g) =>
            g
              .append("text")
              .attr("x", -marginLeft)
              .attr("y", 10)
              .attr("font-family", "sans-serif")
              .attr("font-size", 10)
              .text(yLabel),
          )
      })(svgRef, config),
    [data],
  )
  return (
    <>
      <svg
        ref={ref}
        style={{
          height: height,

          width: width,

          marginRight: "0px",

          marginLeft: "0px",
        }}
      ></svg>
    </>
  )
}
