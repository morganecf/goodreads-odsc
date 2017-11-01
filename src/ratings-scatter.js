function ratingsPlot(data, el, options={width: 1000, height: 500}) {
  const margin = {
    left: 50,
    bottom: 50,
  };

  // Ratings are on a scale of 0 to 5, though most ratings in this sample
  // are pretty close together.
  const yrange = [2, 5]; //d3.extent(data, d => d.avg_rating);
  const xrange = d3.extent(data, d => d.num_ratings);

  const xscale = d3.scaleLog().domain(xrange).range([margin.left, options.width]);
  const yscale = d3.scaleLinear().domain(yrange).range([options.height, 0]);

  const xaxis = d3.axisBottom().scale(xscale).tickFormat(d => d.toString());
  const yaxis = d3.axisLeft().scale(yscale);

  // Draw the svg container and axes
  const svg = el.append('svg')
    .attr('width', options.width + margin.left)
    .attr('height', options.height + margin.bottom);

  svg.append('g')
    .attr('class', 'axis tilted')
    .attr('transform', `translate(0, ${options.height})`)
    .call(xaxis);
  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', `translate(${margin.left}, 0)`)
    .call(yaxis);

  const points = svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', d => xscale(d.num_ratings))
    .attr('cy', d => yscale(d.avg_rating))
    .attr('fill', 'red')
    .attr('stroke', 'black')
    .attr('r', 3);

  const tip = d3.tip()
    .attr('class', 'tooltip')
    .html((d) => {
      return `
        <strong>${d.title}</strong>
        <p>${d.avg_rating} average rating</p>
        <p>${d.num_ratings} ratings</p>
      `;
    });
  svg.call(tip);

  points
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);
}
