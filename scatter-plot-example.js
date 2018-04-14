// scatter plot: number of ratings vs. average rating
// # of ratings on x-axis
// avg rating on y-axis

const svg = d3.select('.chart-container')
  .append('svg')
  .attr('width', 500)
  .attr('height', 500);

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
