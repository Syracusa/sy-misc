var colors = ['red', 'green', 'blue'];

var data = [
  { day: '221221', c: 120, cpp: 80, rs: 100 },
  { day: '221222', c: 130, cpp: 82, rs: 105 },
  { day: '221223', c: 166, cpp: 215, rs: 110 },
  { day: '221224', c: 170, cpp: 230, rs: 115 },
  { day: '221225', c: 200, cpp: 240, rs: 150 }
];

var stackGen = d3.stack()
  .keys(['c', 'cpp', 'rs']);

var stackedSeries = stackGen(data);

d3.select('.chart')
  .selectAll("g.bars")
  .data(stackedSeries)
  .enter()
  .append("g")
  .classed('bars', true)
  .style("fill", function (d, i) {
    return colors[i];
  })
  .selectAll('rect')
  .data(function (d) {
    return d;
  })
  .join('rect')
  .attr("x", function (d, i) {
    return i * 20;
  })
  .attr("y", function (d, i) {
    return 500 - (d[0] / 2) - (d[1] - d[0]) / 2;
  })
  .attr("height", function (d) {
    return (d[1] - d[0]) / 2;
  })
  .attr("width", function (d) {
    return 20;
  });