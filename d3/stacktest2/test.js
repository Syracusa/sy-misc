var colors = ['red', 'green', 'blue'];

var data = [
  { day: '2022-12-21', c: 120, cpp: 80, rs: 100 },
  { day: '2022-12-22', c: 130, cpp: 82, rs: 105 },
  { day: '2022-12-23', c: 166, cpp: 215, rs: 110 },
  { day: '2022-12-24', c: 170, cpp: 230, rs: 115 },
  { day: '2022-12-25', c: 200, cpp: 240, rs: 150 }
];

for (let i = 0; i < data.length; i++){
  data[i].day = Date.parse(data[i].day);
}

console.log(data);

var stackGen = d3.stack()
  .keys(['c', 'cpp', 'rs']);

var stackedSeries = stackGen(data);

var xScale = d3.scaleTime()
.domain([data[0].day, data[4].day])
.range([100, 400]);

var yScale = d3.scaleLinear()
  .domain([0, 1000])
  .range([400, 0]);

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
    return xScale(d.data.day);
  })
  .attr("y", function (d, i) {
    return yScale(d[1]);
  })
  .attr("height", function (d) {
    return yScale(d[0]) -  yScale(d[1]);
  })
  .attr("width", function (d) {
    return 20;
  });