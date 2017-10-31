function ratingsOverTime(data, el, numBins=100, options={width: 1000, height: 400}) {
  const margin = {
    left: 50,
    bottom: 25,
  };

  // Create a histogram from the data
  const hist = d3.histogram()
    .value(d => d.pub_year)
    .thresholds(numBins)
    (data);

  // This function computes the average rating in a given bin
  const averageRating = bin => d3.mean(bin, d => d.avg_rating);

  const binSize = options.width / hist.length;

  // Ratings are on a scale of 0 to 5, though most ratings in this sample
  // are pretty close together.
  const yrange = d3.extent(hist, d => averageRating(d));
  const xrange = d3.extent(data, d => d.pub_year);

  const xscale = d3.scaleLinear().domain(xrange).range([margin.left, options.width]);
  const yscale = d3.scaleLinear().domain(yrange).range([options.height, 0]);

  const xaxis = d3.axisBottom().scale(xscale).tickFormat(d => d.toString());
  const yaxis = d3.axisLeft().scale(yscale);

  // This function will generate pixel values for a line of the ratings over time
  const line = d3.line()
    .x(d => xscale((d.x0 + d.x1) / 2))
    .y(d => yscale(averageRating(d)));

  // Draw the svg container and axes
  const svg = el.append('svg')
    .attr('width', options.width + margin.left)
    .attr('height', options.height + margin.bottom);

  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(0, ${options.height})`)
    .call(xaxis);
  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(yaxis);

  // Draw the line in a group element
  const path = svg.append('path')
    .attr('class', 'line')
    .datum(hist)
    .attr('d', line)
    .attr('fill', 'none')
    .attr('stroke', 'red');

  // Transition the line
  const pathLength = path.node().getTotalLength();

  path
    .attr('stroke-dasharray', pathLength + " " + pathLength)
    .attr('stroke-dashoffset', pathLength)
    .transition()
    .duration(2000)
    .attr('stroke-dashoffset', 0);
}
