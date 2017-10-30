// This function expects an array of data of the form { name, count }.
function horizontalBarGraph(data, el, options={width: 500, height: 1000}) {
  // Set a sizable margin so that the axis ticks don't get cut off
  const margin = {
    left: 120,
    top: 20,
  };

  const yscaleRange = [margin.top, options.height];
  const xscaleRange = [0, options.width];

  // The range (min and max) of the data. For example, if we have count values between
  // 0 and 100, this will give us [0, 100].
  const xrange = d3.extent(data, d => d.count);

  const categories = data.map(d => d.name);

  // Create a categorical scale. This will allow us to map from discrete categories,
  // such as the name of a tag, to a pixel value in the drawing area. We'll use this
  // to place the category names along the y-axis.
  const yscale = d3.scaleBand().domain(categories).range(yscaleRange);

  // Create a linear scale. This will allow us to map from the categories' numerical
  // count vaues to a pixel value in the drawing area. We'll use this to place the
  // x-axis ticks and size the width of the bars.
  const xscale = d3.scaleLinear().domain(xrange).range(xscaleRange);

  // These functions help us actually draw the axes. We'll place the x-axis at the top
  // of the chart and y-axis to the left.
  const xaxis = d3.axisTop().scale(xscale);
  const yaxis = d3.axisLeft().scale(yscale);

  // Start drawing elements! SVG elements like rects and circles can only be drawn within
  // an svg container
  const svg = el.append('svg')
    .attr('width', options.width + margin.left)
    .attr('height', options.height + margin.top);

  // Render the axes within "g" or group elements. The axis-rendering function takes
  // care of drawing all the lines and ticks and text elements comprising an axis.
  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(yaxis);
  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(${margin.left}, ${margin.top})`)
    .call(xaxis);

  // scaleBand exposes a useful function that gives us the width of each band, or tick,
  // on a categorical scale. Use this to determine the height of each horizontal bar.
  // Subtract 2 to add a little space between the bars.
  const barHeight = yscale.bandwidth() - 2;

  // Draw the bars. The (x, y) position of each bar is the top-left corner of the rectangle.
  // The width of the bar is scaled to the count associated with that category. The y-position
  // is determined by the yscale, which will output a pixel value given a category name.
  svg.selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('x', margin.left + 1)           // Add 1 to give some space between axis and bar
    .attr('y', d => yscale(d.name) + 1)   // Add 1 to give some space between bars
    .attr('width', d => xscale(d.count))
    .attr('height', barHeight)
    .attr('fill', '#3A539B');             // Bar color
}
