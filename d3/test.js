var data = [
  {day: '221221', c: 120, cpp: 80, rs: 100},
  {day: '221222', c: 130,  cpp: 82, rs: 105},
  {day: '221223', c: 166, cpp: 215, rs: 110},
  {day: '221224', c: 170,  cpp: 230, rs: 105},
  {day: '221225', c: 200, cpp: 240, rs: 105}
];

var stackGen = d3.stack().keys(['c', 'cpp', 'rs']);

var stackedSeries = stackGen(data);

console.log(stackedSeries);

d3.select('.chart')
  .selectAll('rect')
  .style('fill', 'grey')
  .data(stackedSeries)
  .join('rect')
  .attr('x', function(d, i) {
    console.log(d);
    return i * 20;
  })
  .attr('y', function(d, i) {
    return d[0];
  })
  .attr('width', function(d, i) {
    return 10;
  })
  .attr('height', function(d, i) {
    return d[1];
  });
  

// d3.selectAll('circle')
//   .style('fill', 'grey')
//   .attr('r', function() {
//     return 10;
//   });