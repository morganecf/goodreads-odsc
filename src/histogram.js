function histogram(data, el, numBins=50, options={width: 600, height: 300}) {
  const margin = {
    left: 50,
    bottom: 25,
  };

  // This d3 function helps us generate histogram data. The thresholds attribute
  // tells us how many bins to generate, but this is ONLY a heuristic and will
  // not be exact.
  const histGenerator = d3.histogram()
    .value(d => d.pub_year)
    .thresholds(numBins);

  // Generate an array of bins
  const hist = histGenerator(data);

  const binSize = options.width / hist.length;

  // Determine the range of the data along the x- and y-axes. The length of each
  // element (bin) in the hist array is equal to the number of points in that bin.
  const xrange = d3.extent(data, d => d.pub_year);
  const yrange = d3.extent(hist, d => d.length);

  // Initialize the x and y scales.
  const xscale = d3.scaleLinear().domain(xrange).range([margin.left, options.width]);
  const yscale = d3.scaleLinear().domain(yrange).range([options.height, 0]);

  // Initialize the x and y axis generators.
  const xaxis = d3.axisBottom().scale(xscale).tickFormat(d => new Date(d).getFullYear());
  const yaxis = d3.axisLeft().scale(yscale);

  // Draw the svg container
  const svg = el.append('svg')
    .attr('width', options.width + margin.left)
    .attr('height', options.height + margin.bottom);

  // Draw the axes. Translate the x-axis down by the height of the container. Translate
  // the y-axis over by the left margin we set above.
  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(0, ${options.height})`)
    .call(xaxis);
  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(yaxis);

  // Bind data to rectangles to create the histogram. d3.histogram generates
  // bins where each bin contains the attributes x0 and x1, signifying the start
  // and end positions of the bins.
  const histogram = svg.selectAll('.bar')
    .data(hist)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', d => xscale(d.x0))
    .attr('y', options.height)   // Start the bar off at the bottom for transition
    .attr('width', binSize - 1)
    .attr('height', 0)   // Start the bar off with height of 0 for transition
    .attr('opacity', 0)
    .attr('fill', '#3A539B');

  // Transition the bar lengths. Delay is used to transition the bars sequentially
  // instead of all at the same time.
  histogram.transition()
    .duration(250)
    .delay((d, i) => i * (250 / hist.length))
    .attr('y', d => yscale(d.length))
    .attr('height', d => options.height - yscale(d.length))
    .attr('opacity', 1);
}
