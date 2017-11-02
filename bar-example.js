const svg = d3.select('.chart-container')
  .append('svg')
  .attr('width', 800)
  .attr('height', 600);

const books = barData.map(d => d[0]);
const yScale = d3.scaleBand()
  .domain(books)
  .range([0, 550])
  .padding(0.1);

const yAxis = d3.axisLeft().scale(yScale);
const yAxisGroup = svg.append('g')
  .attr('transform', 'translate(100, 0)')
  .call(yAxis)


const maxReviews = d3.max(barData, d => d[1]);
const xScale = d3.scaleLinear()
  .domain([0, maxReviews])
  .range([0, 700]);


const xAxis = d3.axisBottom().scale(xScale);
const xAxisGroup = svg.append('g')
  .attr('transform', 'translate(100, 550)')
  .call(xAxis)


let bars = svg.selectAll('.bar').data(barData);
bars = bars.enter()
  .append('rect')
  .attr('class', 'bar')
  .merge(bars);

bars
  .attr('x', 100)
  .attr('y', d => yScale(d[0]))
  .attr('height', yScale.bandwidth())
  .attr('width', d => xScale(d[1]))

