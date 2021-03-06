function histogram(data, el, numBins=50, options={width: 1000, height: 500}) {
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
  const xaxis = d3.axisBottom().scale(xscale).tickFormat(d => d.toString());
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

  // Finally, add a tooltip to each bar. We will do this by adding invisible bars over
  // the histogram bars that are the height of the chart, so that it's easy to trigger
  // the tooltip even if bins are extremely small. The tooltip shows the time range, a
  // sample of books in that time range, and the average rating in that time range.
  const tip = d3.tip()
    .attr('class', 'tooltip')
    .offset([200, 0])
    .html(function (bin, i) {
      if (bin.length > 0) {
        const avgRating = d3.mean(bin, d => d.avg_rating);
        const startYear = bin[0].pub_year;
        const endYear = bin[bin.length - 1].pub_year;
        const sample = bin.slice(0, 5).map(d => d.title).join(', ');
        return `
          <strong>${startYear} - ${endYear}</strong>
          <p>Number of books: ${bin.length}</p>
          <p>Average rating: ${avgRating.toFixed(2)}</p>
          <p>${sample}</p>
        `;
      }
      return 'Empty bin';
    });

  svg.call(tip);

  svg.selectAll('.tip-bar')
    .data(hist)
    .enter()
    .append('rect')
    .attr('class', 'tip-bar')
    .attr('x', d => xscale(d.x0))
    .attr('y', 0)
    .attr('width', binSize - 1)
    .attr('height', options.height)
    .attr('opacity', 0)
    .on('mouseover', function(d, i) {
      // Show the tooltip and highlight the bin
      tip.show(d, i);
      d3.select(this).attr('opacity', 0.1);
    })
    .on('mouseout', function(d, i) {
      // Hide the tooltip and bin
      tip.hide(d, i)
      d3.select(this).attr('opacity', 0);
    });
}
