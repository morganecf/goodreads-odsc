/**
 * Force layout example
 */

const svg = d3.select('.chart-container')
  .append('svg')
  .attr('width', 1000)
  .attr('height', 1000);

// force data (ethanol structure) (atoms)
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

// bonds between atoms
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

// Create forces
// Create simulation 
// Add forces to simulation
// Define svg elements
// Tick function
// simulation.nodes(nodes).on('tick', tick);
// network.links(edges);
// show how edges/nodes change

