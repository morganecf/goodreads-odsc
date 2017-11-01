const forceWidth = 2000;
const forceHeight = 2000;
const center = {x: forceWidth / 2, y: forceHeight / 2};

function network(data) {
  // Sets the node id accessor so that the force simulation
  // knows that a node/book is uniquely identified by its title
  const forceLink = d3.forceLink().id(d => d.title);

  // Force function that acts upon multiple bodies. A positive
  // strength causes nodes to attract each other -- this will
  // cause nodes to collapse into each other. A negative strength
  // causes nodes to repel each other.
  const forceCharge = d3.forceManyBody().strength(-15);

  // A centering force centers the simulation at the given coordinates
  const forceCenter = d3.forceCenter(center.x, center.y);

  // Create a new simulation with the above forces
  const simulation = d3.forceSimulation()
    .force('link', forceLink)
    .force('charge', forceCharge)
    .force('center', forceCenter);

  // Create the svg element
  const svg = d3.select('.chart-container')
    .append('svg')
    .attr('width', forceWidth)
    .attr('height', forceHeight);

  // Create a color scale for the book ratings. The higher
  // the rating, the redder the book node.
  const color = d3.scaleLinear()
    .domain([3, 5])
    .range([d3.rgb('blue'), d3.rgb('red')])
    .interpolate(d3.interpolateHcl);

  const strokeWidth = d3.scaleLinear()
    .domain(d3.extent(data.edges, d => d.overlap_size))
    .range([1, 3]);

  // Add links or edges as path elements. Group all of these
  // paths in a g element. Link width (thickness) represents
  // the edge weights. The higher the weight, i.e., the # of
  // tags a pair of books has in common, the bigger the
  // width. Each edge or link represents a weighted connection
  // between two books, based on how many tags they have
  // in common.
  const link = svg.append('g')
    .attr('class', 'links')
    .selectAll('.link')
    .data(data.edges)
    .enter()
    .append('line')
    .attr('class', 'link')
    .attr('stroke', '#aaa')
    .attr('stroke-width', d => strokeWidth(d.overlap_size));

  // Add node elements, grouped together. Each node represents
  // a book and is color-scaled based on its average rating.
  const node = svg.append('g')
    .attr('class', 'nodes')
    .selectAll('.node')
    .data(data.nodes)
    .enter()
    .append('circle')
    .attr('class', 'node')
    .attr('r', 5)
    .attr('fill', d => color(d.average_rating));

  // Only use edges that are in the nth percentile of all edges based
  // on number of overlapping tags. Limiting the number of edges used
  // in the network makes clusters of related books more obvious at
  // the expense of losing some relations entirely.
  function topEdges(percentile) {
    const overlapExtent = d3.extent(data.edges, d => d.overlap_size);
    return function(edge) {
      return ((edge.overlap_size - overlapExtent[0]) / (overlapExtent[1] - overlapExtent[0])) > (percentile / 100);
    };
  }

  // Try varying this number to see its effect on the network.
  const edges = data.edges.filter(topEdges(60));

  // Start the simulation
  simulation.nodes(data.nodes).on('tick', tick);
  simulation.force('link').links(edges);

  // This function is called on every "tick", or unit of time,
  // of the simulation. In each tick, D3 generates new node
  // positions based on the starting positions and the forces
  // chosen above. These are stored as x and y attributes of each
  // node data object. We reposition the svg links and nodes with
  // these values. You can use this function to customize the
  // positions of the nodes and links. For example, if you wanted
  // to ensure some kind of hierarchical tree structure, you could
  // give each node a level and then make sure nodes of a certain
  // level stayed above larger levels and below smaller levels.
  function tick() {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y);

    node
      .attr('cx', d => d.x)
      .attr('cy', d => d.y);
  }

  // Formats HTML for the node tooltips: show the book
  // title and its average rating.
  function nodeTooltipContent(d) {
    return `
      <strong>${d.title}</strong>
      <p>${d.average_rating}</p>
    `;
  }

  // Formats HTML for the link tooltips: show the two
  // book titles and the tags they have in common.
  function linkTooltipContent(d) {
    return `
      <strong>${d.source.title} &mdash; ${d.target.title}</strong>
      <p>${d.overlap_size} in common</p>
      <ul>${d.overlap_sample.map(tag => `<li>${tag}</li>`).join('')}</ul>
    `;
  }

  function addToolTip(svg, selection, formatter) {
    const tip = d3.tip()
      .attr('class', 'tooltip')
      .html(formatter);
    svg.call(tip);
    selection
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide);
  }

  // Initialize the tooltips
  addToolTip(svg, node, nodeTooltipContent);
  addToolTip(svg, link, linkTooltipContent);

  // Scroll to center of network
  window.scrollTo(
    (forceWidth - window.innerWidth) / 2,
    (forceHeight - window.innerHeight) / 2
  );
}
