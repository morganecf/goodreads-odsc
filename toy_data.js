// bar chart data
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

// Line data (weather from https://darksky.net/forecast/37.7793,-122.4192/us12/en)
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
