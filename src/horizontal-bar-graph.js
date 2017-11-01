// This function expects an array of data of the form { name, count }.
function horizontalBarGraph(el, options={width: 800, height: 1000}) {
  // Define the transition
  const transition = d3.transition().duration(500);

  // Set a sizable margin so that the axis ticks don't get cut off
  const margin = {
    left: 120,
    right: 20,
    top: 20,
    bottom: 20,
  };

  const yscaleRange = [margin.top, options.height];
  const xscaleRange = [0, options.width];

  // Create a categorical scale. This will allow us to map from discrete categories,
  // such as the name of a tag, to a pixel value in the drawing area. We'll use this
  // to place the category names along the y-axis.
  const yscale = d3.scaleBand().range(yscaleRange);

  // Create a linear scale. This will allow us to map from the categories' numerical
  // count vaues to a pixel value in the drawing area. We'll use this to place the
  // x-axis ticks and size the width of the bars.
  const xscale = d3.scaleLinear().range(xscaleRange);

  // These functions help us actually draw the axes. We'll place the x-axis at the top
  // of the chart and y-axis to the left.
  const xaxis = d3.axisTop();
  const yaxis = d3.axisLeft();

  // Start drawing elements! SVG elements like rects and circles can only be drawn within
  // an svg container
  const svg = el.append('svg')
    .attr('width', options.width + margin.left + margin.right)
    .attr('height', options.height + margin.top + margin.bottom);

  // Axes will be rendered inside a "g" or group element. The axis-rendering function takes
  // care of drawing all the lines and ticks and text elements comprising an axis.
  const yaxisSvg = svg.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(${margin.left}, 0)`);
  const xaxisSvg = svg.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

  // Formats HTML for the bar tooltips: show the tag, value, and a sample of the books
  // associated with the tag.
  function barTooltipContent(d) {
    return `
      <strong>${d.name}</strong>
      <p>${d.count}</p>
      <p>${d.sample}</p>
    `;
  }

  // Call this function each time we want to update the graph with new data
  function update(data, transitionY=false) {
    // The range (min and max) of the data. For example, if we have count values between
    // 0 and 100, this will give us [0, 100].
    const xrange = d3.extent(data, d => d.count);
    const categories = data.map(d => d.name);

    // Set the input domain of the x-axis scale (the numerical values)
    xscale.domain(xrange);
    // Set the input domain of the y-axis scale (the names of the categories)
    yscale.domain(categories);

    // Initialize the axis generators with the scales
    xaxis.scale(xscale);
    yaxis.scale(yscale);

    // Render the axes
    yaxisSvg.transition(transition).call(yaxis);
    xaxisSvg.transition(transition).call(xaxis);

    // scaleBand exposes a useful function that gives us the width of each band, or tick,
    // on a categorical scale. Use this to determine the height of each horizontal bar.
    // Subtract 2 to add a little space between the bars.
    const barHeight = yscale.bandwidth() - 2;

    // Use the enter/exit/update pattern to draw the bars. The (x, y) position of each bar is the
    // top-left corner of the rectangle. The width of the bar is scaled to the count associated
    // with that category. The y-position is determined by the yscale, which will output a pixel
    // value given a category name.
    const bars = svg.selectAll('.bar').data(data, d => d.name);

    // Remove old bars
    bars.exit().remove();

    // Add new bars and merge with bars that are neither new nor old.
    let selection = bars
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .merge(bars)
      .attr('height', barHeight)
      .attr('fill', '#3A539B');             // Bar color

    // If we want to transition the bars vertically (for example, when doing a sort), we want to set
    // the attribute on the transition. If we don't want to transition the bars vertically, add it
    // before the transition.
    if (!transitionY) {
      selection = selection.attr('y', d => yscale(d.name) + 1);
    }

    // Use interrupt to interrupt transitions that are currently in progress. If we press a button
    // that triggers a transition a bunch of times in a row, we want to make sure the transition is
    // immediately starting over instead of getting scheduled and chained.
    selection
      .interrupt()
      .transition(transition)
      .attr('y', d => yscale(d.name) + 1)   // Add 1 to give some space between bars
      .attr('x', margin.left + 1)           // Add 1 to give some space between axis and bar
      .attr('width', d => xscale(d.count));

    // Finally, add a tooltip to each bar using the d3-tip tooltip library.
    const tip = d3.tip()
      .attr('class', 'tooltip')
      .html(barTooltipContent);

    svg.call(tip);

    selection
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);
  }

  return { update };
}
