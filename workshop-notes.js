// appended an svg container 
svg = d3.select(".chart-container").append("svg").attr('width', 800).attr('height', 500)

// add a circle to the svg
circle = svg.append('circle')

// place it in the middle of the container and set radius of 50, fill of red
circle.attr('r', 50).attr('cx', 400).attr("cy", 250).attr('fill', 'red')

// modify its other attributes
circle.attr('stroke', 'purple')
circle.attr('stroke-width', 5)
circle.attr("opacity", 0.5)

// animate it to full opacity and radius of 100 for 2s with a delay of 1s
circle.transition().duration(2000).delay(1000).attr('opacity', 1).attr('r', 100)
circle.transition().duration(2000).delay(1000).attr('opacity', 1).attr('r', 500)

// remove the circle from the DOM
circle.remove()


// Create some toy data
data = [{color: 'yellow', r: 5}, {color: 'blue', r: 10}, {color: 'purple', r: 15}];

// Bind data to empty circle selection
circle = svg.selectAll('circle').data(data, d => d.color);

// There shouldbe nothing in our exit selection (old elements)
circle.exit().data()
[]

// There should be all three elements in our enter selection (new elements)
circle.enter().data()

// Equivalent to d => d.r in the anonymous function below
function getRadius(d) { return d.r; }
getRadius(data[0])

// Bind circles to the dom using enter()
circle.enter()
  .append("circle")
  .attr('r', d => d.r)
  .attr('fill', d => d.color)
  .attr('cy', 50)
  .attr('cx', (d, i) => 50 + i * 50)

  // new data -- two new elements, no old elements remain
  newData = [{color: 'red', r: 10}, {color: 'green', r: 10}]

  // bindnew data
circle = svg.selectAll('circle').data(newData, d => d.color);

// we should see all the previous elements in our exit selection
circle.exit().data()

// we should see all new elemeents (Red and green) in the enter selection
circle.enter().data()

  // remove old elements
circle.exit().remove()

  // add new elements
circle.enter().append("circle").attr('r', d => d.r).attr('fill', d => d.color).attr('cy', 50).attr('cx', (d, i) => 50 + i * 50)

// Add a new element and remove the first element
newData.push({color: 'pink', r: 20})
newData.shift()

// Bind data again
circle = svg.selectAll('circle').data(newData, d => d.color);

// old elements shouldbe in exit selection (red)
circle.exit().data()

// new elements should be in enter selection (pink)
circle.enter().data()

// remove red el
circle.exit().remove()

// add new elements and MERGE with the existing elements we want remaining (green)
// so that the updates are relative to the entire data, not just new elements
circle.enter().append("circle").merge(circle).attr('r', d => d.r).attr('fill', d => d.color).attr('cy', 50).attr('cx', (d, i) => 50 + i * 50)


// SCALES & AXES

// create a linear scale
scale = d3.scaleLinear().domain([0, 100]).range([50, 400])

// test it out
scale(0)
scale(10)
scale(100)

// create an axis-generating function
axis = d3.axisBottom()
// initialize it with the scale
axis.scale(scale)

// axis generating function is going to draw a bunch of elements for the
// axis line and ticks and tick values. let's draw all of these in a group
// element. this is basically equivalent to calling axis(svg.append('g'))
axisSvg = svg.append('g').call(axis)

// translate it down by 400 px
axisSvg.attr('transform', 'translate(0, 400)')

// change domain
scale.domain([50, 100])

// update axis by animating/transitioning it
axisSvg.transition().duration(2000).delay(1000).call(axis)

// repeat
scale.domain([100, 1000])
axisSvg.transition().duration(2000).delay(1000).call(axis)

// set your own tick values and update
axis.tickValues([100, 1000])
axisSvg.call(axis)

// set your own tick formatting
formatter = d3.format('$')
axis.tickFormat(formatter)
axisSvg.call(axis)

// scatter plot: number of ratings vs. average rating
// # of ratings on x-axis
// avg rating on y-axis

// book, # of ratings, average rating
data = [
  ['the republic', 5093, 3.5],
  ['the prince', 3253, 3],
  ['the stranger', 3121, 3.3],
  ['zen', 2932, 2],
  ['the art of war', 2348, 3],
  ['a history of western philosophy', 2270, 4.1],
  ['siddhartha', 2248, 3.2],
  ['being and nothingness', 1722, 5],
  ['being and time', 1704, 4.7],
];

xscale = d3.scaleLinear()

// finds min and max of data along the x-axis
xdomain = d3.extent(data, d => d[1])

// ratinsg range between 0 and 5
ydomain = [0, 5]
xscale.domain(xdomain).range([50, 500])

// do [400, 0] instead of [0, 400] since the pixel coordinate system
// is inverted along the y-axis (from the typical cartesian coordinate system)
// ie., 0,0 is at top left corner
yscale = d3.scaleLinear().domain(ydomain).range([400, 0])

xaxis = d3.axisBottom().scale(xscale)
yaxis = d3.axisLeft().scale(yscale)

// draw axes
xaxisSvg = svg.append('g').attr('transform', 'translate(0, 400)')
xaxisSvg.call(xaxis)

yaxisSvg = svg.append('g').attr('transform', 'translate(50, 0)').call(yaxis)
yaxisSvg.call(yaxis)

// draw the circles
point = svg.selectAll('circle').data(data).enter().append('circle').attr('r', 10).attr('cx', d => xscale(d[1])).attr('cy', d => yscale(d[2])).attr('fill', 'purple')

/**
 * Bar chart example
 */
var svg = d3.select('.chart-container')
.append('svg')
.attr('width', 500)
.attr('height', 500);

const data = [
  ['the republic', 5093, 3.5],
  ['the prince', 3253, 3],
  ['the stranger', 3121, 3.3],
  ['zen', 2932, 2],
  ['the art of war', 2348, 3],
  ['a history of western philosophy', 2270, 4.1],
  ['siddhartha', 2248, 3.2],
  ['being and nothingness', 1722, 5],
  ['being and time', 1704, 4.7],
];

const xScale = d3.scaleLinear()
  .domain([1500, 5500])
  .range([100, 500]);

const yScale = d3.scaleBand()
  .domain(data.map(d => d[0]))
  .range([0, 450])
  .padding(0.1)

const colorScale = d3.scaleLinear()
  .domain([3, 5])
  .range([d3.rgb('blue'), d3.rgb('red')])
  .interpolate(d3.interpolateRgb)

const xAxis = d3.axisBottom().scale(xScale);

const yAxis = d3.axisLeft().scale(yScale);

const xAxisSvg = svg.append('g')
  .attr('transform', 'translate(0, 450)')
  .call(xAxis);

const yAxisSvg = svg.append('g')
  .attr('transform', 'translate(100,0)')
  .call(yAxis);

svg.selectAll('rect')
  .data(data)
  .enter()
  .append('rect')
  .attr('x', 100)
  .attr('y', d => yScale(d[0]))
  .attr('height', yScale.bandwidth())
  .attr('width', d => xScale(d[1]))
  .attr('fill', d => colorScale(d[2]))

/**
 * Line example
 */
var svg = d3.select('.chart-container')
.append('svg')
.attr('width', 500)
.attr('height', 500);

data = [
  {low: 50, high: 66, date: new Date('Nov 1 2017')},
  {low: 51, high: 62, date: new Date('Nov 2 2017')},
  {low: 55, high: 60, date: new Date('Nov 3 2017')},
  {low: 50, high: 57, date: new Date('Nov 4 2017')},
  {low: 48, high: 57, date: new Date('Nov 5 2017')},
  {low: 49, high: 58, date: new Date('Nov 6 2017')},
  {low: 47, high: 59, date: new Date('Nov 7 2017')},
  {low: 49, high: 59, date: new Date('Nov 8 2017')},
  {low: 50, high: 66, date: new Date('Nov 9 2017')},
];

const xScale = d3.scaleTime()
  .domain(d3.extent(data, d => d.date))
  .range([50, 500])

const yScale = d3.scaleLinear()
  .domain([40, 80])
  .range([450, 0])

const xAxis = d3.axisBottom().scale(xScale);

const yAxis = d3.axisLeft().scale(yScale);

svg.append('g')
  .attr('transform', 'translate(0,450)')
  .call(xAxis);

svg.append('g')
  .attr('transform', 'translate(50, 0)')
  .call(yAxis)

const lowTemperatures = data.map(d => ({
  date: d.date,
  temp: d.low
}));
const highTemperatures = data.map(d => ({
  temp: d.high,
  date: d.date
}));

const line = d3.line()
  .x(d => xScale(d.date))
  .y(d => yScale(d.temp))
  .curve(d3.curveStep);

svg.append('path')
  .datum(lowTemperatures)
  .attr('d', line)
  .attr('stroke', 'blue')
  .attr('fill', 'none')

  svg.append('path')
  .datum(highTemperatures)
  .attr('d', line)
  .attr('stroke', 'red')
  .attr('fill', 'none')

  /**
   * Force layout example
   */

  // force data (ethanol structure)
  nodes = [
    {name: 'H1', color: 'red', r: 5},
    {name: 'H2', color: 'red', r: 5},
    {name: 'H3', color: 'red', r: 5},
    {name: 'H4', color: 'red', r: 5},
    {name: 'H5', color: 'red', r: 5},
    {name: 'H6', color: 'red', r: 5},
    {name: 'C1', color: 'black', r: 15},
    {name: 'C2', color: 'black', r: 15},
    {name: 'O', color: 'blue', r: 10},
  ];

  edges = [
    {source: 'C1', target: 'H1'},
    {source: 'C1', target: 'H2'},
    {source: 'C1', target: 'H3'},
    {source: 'C2', target: 'H4'},
    {source: 'C2', target: 'H5'},
    {source: 'C1', target: 'C2'},
    {source: 'C2', target: 'O'},
    {source: 'O', target: 'H6'},
  ];

  const network = d3.forceLink().id(d => d.name);
  const charge = d3.forceManyBody().strength(-50);
  const center = d3.forceCenter(250, 250);

  const simulation = d3.forceSimulation();

  simulation
    .force('link', network)
    .force('charge', charge)
    .force('center', center);
  
  var svg = d3.select('.chart-container')
    .append('svg')
    .attr('width', 500)
    .attr('height', 500);
  
  link = svg.selectAll('line')
    .data(edges)
    .enter()
    .append('line')
    .attr('stroke', '#aaa');
  
  node = svg.selectAll('circle')
    .data(nodes)
    .enter()
    .append('circle')
    .attr('r', d => d.r)
    .attr('fill', d => d.color);

  
  function tick() {
    node
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);
    
    link
      .attr('x1', d => d.source.x)
      .attr('x2', d => d.target.x)
      .attr('y1', d => d.source.y)
      .attr('y2', d => d.target.y);
  }

  simulation.nodes(nodes).on('tick', tick);
  simulation.force('link').links(edges);