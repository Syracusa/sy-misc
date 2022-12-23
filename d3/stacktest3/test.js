var colors = ['red', 'green', 'blue'];


/* Make Data */
var data = [
  { day: '2022-12-21', c: 120, cpp: 80, rs: 100 },
  { day: '2022-12-22', c: 130, cpp: 82, rs: 105 },
  { day: '2022-12-23', c: 166, cpp: 215, rs: 110 },
  { day: '2022-12-24', c: 170, cpp: 230, rs: 115 },
  { day: '2022-12-25', c: 200, cpp: 240, rs: 150 }
];

/* Date format to moment */
for (let i = 0; i < data.length; i++) {
  let asMoment = moment(data[i].day);
  data[i].asMoment = asMoment;
  console.log(data[i].asMoment.format());
  console.log(data[i].asMoment);
}

console.log(data);

/* Stack Data Generator */
var stackGen = d3.stack()
  .keys(['c', 'cpp', 'rs']);

/* Generate Data */
var stackedSeries = stackGen(data);

/* Scale */
var xScale = d3.scaleTime()
  .domain(
    [
      /* Give some margin */
      data[0].asMoment.clone().add(-6, 'hours'), 
      data[4].asMoment.clone().add(6, 'hours')
    ]
  )
  .range([50, 600]);

var yScale = d3.scaleLinear()
  .domain([0, 700])
  .range([450, 50])
  .nice();

/* Draw Bars */
let barWidth = 20;

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
    return xScale(d.data.asMoment) - (barWidth / 2);
  })
  .attr("y", function (d, i) {
    return yScale(d[1]);
  })
  .attr("height", function (d) {
    return yScale(d[0]) - yScale(d[1]);
  })
  .attr("width", function (d) {
    return barWidth;
  });

/* Draw Axes */
let useCustomFmt = 0;
let xAxis;
if (!useCustomFmt) {
  xAxis = d3.axisBottom(xScale);
} else {
  xAxis = d3.axisBottom(xScale).ticks(5)
    .tickFormat(function (d) {
      console.log('format');
      return moment(d).format('YY-MM-DD');
    });
}

let yAxis = d3.axisRight(yScale);

d3.select('.xaxis')
  .call(xAxis)
  .attr("transform", "translate(" + 0 + ", " + 450 + ")");

d3.select('.yaxis')
  .call(yAxis)
  .attr("transform", "translate(" + 600 + ", " + 0 + ")");