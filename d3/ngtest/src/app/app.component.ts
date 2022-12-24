import { Component } from '@angular/core';
import * as d3 from 'd3';
import * as moment from 'moment'

class tdata {
  day: string = "";
  asMoment: moment.Moment = moment();
  locs: Map<string, number> = new Map<string, number>;


}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ngOnInit(): void {
    console.log('ngoninit!!');
    this.drawGraph();
  }

  drawGraph(): void {
    let data = [
      { 'c': 120, 'cpp': 80, 'rs': 100 },
      { 'c': 130, 'cpp': 82, 'rs': 105 },
      { 'c': 166, 'cpp': 215, 'rs': 110 },
      { 'c': 170, 'cpp': 230, 'rs': 115 },
      { 'c': 200, 'cpp': 240, 'rs': 150 }
    ];

    let asMoment: moment.Moment[] = [
      moment('2022-12-21'),
      moment('2022-12-22'),
      moment('2022-12-23'),
      moment('2022-12-24'),
      moment('2022-12-25')
    ];

    var colors = ['red', 'green', 'blue'];


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
          asMoment[0].clone().add(-6, 'hours'),
          asMoment[4].clone().add(6, 'hours')
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
        return xScale(asMoment[i]) - (barWidth / 2);
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
        .tickFormat(function (d, i) {
          console.log('format');
          return asMoment[i].format('YY-MM-DD');
        });
    }

    let yAxis = d3.axisRight(yScale);

    d3.select('.xaxis')
      .call(xAxis.call)
      .attr("transform", "translate(" + 0 + ", " + 450 + ")");

    d3.select('.yaxis')
      .call(yAxis.call)
      .attr("transform", "translate(" + 600 + ", " + 0 + ")");

  }

  title = 'ngtest';
}
