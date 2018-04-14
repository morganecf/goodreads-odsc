/**
 * Line example
 */
const svg = d3.select('.chart-container')
.append('svg')
.attr('width', 500)
.attr('height', 500);

const data = [
  {low: 50, high: 66, date: new Date('April 1 2018')},
  {low: 51, high: 62, date: new Date('April 2 2018')},
  {low: 55, high: 60, date: new Date('April 3 2018')},
  {low: 50, high: 57, date: new Date('April 4 2018')},
  {low: 48, high: 57, date: new Date('April 5 2018')},
  {low: 49, high: 58, date: new Date('April 6 2018')},
  {low: 47, high: 59, date: new Date('April 7 2018')},
  {low: 49, high: 59, date: new Date('April 8 2018')},
  {low: 50, high: 66, date: new Date('April 9 2018')},
];
