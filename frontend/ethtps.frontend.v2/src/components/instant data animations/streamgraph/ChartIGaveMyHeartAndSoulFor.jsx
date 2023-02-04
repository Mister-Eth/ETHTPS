/** MultilineChart.js */
import React from "react"
import * as d3 from "d3"

export const ChartIGaveMyHeartAndSoulFor = ({ data = [], dimensions = {} }) => {
  const svgRef = React.useRef(null)
  const { width, height, margin = {} } = dimensions
  const svgWidth = width + margin.left + margin.right
  const svgHeight = height + margin.top + margin.bottom

  //Let's try a simple thing first
  //console.log(data)
  React.useEffect(() => {
    if (data?.length === 0) return
    //Range: -60s > 0s
    //We need a linear scale
    const xScale = d3.scaleLinear().domain([-60, 0]).range([0, width]) //We'll change this later
    console.log(data)
    const yScale = d3
      .scaleLinear()
      .domain([
        d3.min(data, (d) => d3.min(d.yArrays, (q) => q)) - 0,
        d3.max(data, (d) => d3.max(d.yArrays, (q) => q)) + 0,
      ])
      .range([height, 0])
    // Create root container where we will append all other chart elements
    const svgEl = d3.select(svgRef.current)
    svgEl.selectAll("*").remove() // Clear svg content before adding new elements
    const svg = svgEl
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`)
    // Add X grid lines with labels
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(5)
      .tickSize(-height + margin.bottom)
    const xAxisGroup = svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(xAxis)
    xAxisGroup.select(".domain").remove()
    xAxisGroup.selectAll("line").attr("stroke", "rgba(255, 255, 255, 0.2)")
    xAxisGroup
      .selectAll("text")
      .attr("opacity", 0.5)
      .attr("color", "black")
      .attr("font-size", "0.75rem")
    // Add Y grid lines with labels
    const yAxis = d3
      .axisLeft(yScale)
      .ticks(5)
      .tickSize(-width)
      .tickFormat((val) => `${val}%`)
    const yAxisGroup = svg.append("g").call(yAxis)
    yAxisGroup.select(".domain").remove()
    yAxisGroup.selectAll("line").attr("stroke", "rgba(255, 255, 255, 0.2)")
    yAxisGroup
      .selectAll("text")
      .attr("opacity", 0.5)
      .attr("color", "black")
      .attr("font-size", "0.75rem")
    // Draw the lines
    const line = d3
      .line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.value))

    svg
      .selectAll(".line")
      .data(data)
      .enter()
      .append("path")
      .attr("fill", "none")
      .attr("stroke", (d) => d.c)
      .attr("stroke-width", 3)
      .attr("d", (d) => line(d.z))
  }, [data])

  return <svg ref={svgRef} width={svgWidth} height={svgHeight} />
}
