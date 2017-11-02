const svg = d3.select('.chart-container')
  .append('svg')
  .attr('width', 800)
  .attr('height', 600);

const xScale = d3.scaleTime()
  .domain(d3.extent(lineData, d => d.date))
  .range([50, 800]);

const xAxis = d3.axisBottom().scale(xScale);
const xAxisGroup = svg.append('g')
  .attr('transform', 'translate(0, 550)')
  .call(xAxis)

const minTemp = d3.min(lineData, d => d.low);
const maxTemp = d3.max(lineData, d => d.high)
const yScale = d3.scaleLinear()
  .domain([minTemp, maxTemp])
  .range([0, 550])

const yAxis = d3.axisLeft().scale(yScale);
const yAxisGroup = svg.append('g')
  .attr('transform', 'translate(50, 0)')
  .call(yAxis)

const line = d3.line()
  .x(d => xScale(d.date))
  .y(d => yScale(d.temp));

const lowLine = svg.append('path')
  .datum(lineData.map(d => ({ date: d.date, temp: d.low })))
  .attr('fill', 'none')
  .attr('stroke', 'blue')
  .attr('d', line)