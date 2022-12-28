import { Component } from '@angular/core';
import * as d3 from 'd3';
import moment from 'moment'

import DataInfo from '../assets/datainfo.json';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  data : any[] = [];
  asMoment: moment.Moment[] = [];
  datasize : number = 0;
  readDone : number = 0;
  VERBOSE = 0;

  ngOnInit(): void {
    console.log('ngoninit!!');

    console.log(DataInfo);

    this.datasize = DataInfo['files'].length
    for (let i = 0; i < this.datasize; i++) {
      this.getJSON('assets/' + DataInfo['files'][i]).subscribe(data => {
        
        if (this.VERBOSE){
          console.log(DataInfo['files'][i].split('.')[0])
          console.log(data);
        }

        this.data.push(data['All']);

        /* Check missing data */
        for (let eidx = 0; eidx < DataInfo['extensions'].length; eidx++){
          let ext = DataInfo['extensions'][eidx];
          if (!(ext in data['All'])){
            data['All'][ext] = 0;
          }
        }

        this.asMoment.push(moment(DataInfo['files'][i].split('.')[0]));
        this.readDone += 1;

        if (this.readDone == this.datasize){
          console.log(this.data);
          console.log(this.asMoment);
          this.drawGraph();
        }
      });
    }
  }

  constructor(private http: HttpClient) {}

  public getJSON(filename: string): Observable<any> {
    return this.http.get(filename);
  }

  drawGraph(): void {
    var colors = ['#001122', '#002233', '#003344', '#004455', 
                  '#005566', '#006677', '#007788', '#008899',
                  '#0099AA', '#00AABB', '#00BBCC', '#00CCDD'];

    /* Stack Data Generator */
    var stackGen = d3.stack()
      .keys(DataInfo.extensions);

    /* Generate Data */
    var stackedSeries = stackGen(this.data);

    console.log(stackedSeries);

    let maxDate = moment.max(this.asMoment);
    let minDate = moment.min(this.asMoment);

    /* Scale */
    var xScale = d3.scaleTime()
      .domain(
        [
          /* Give some margin */
          minDate.clone().add(-6, 'hours'),
          maxDate.clone().add(6, 'hours')
        ]
      )
      .range([50, 600]);

    var yScale = d3.scaleLinear()
      .domain([0, 20000])
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
      .attr("x",  (d, i) => {
        return xScale(this.asMoment[i]) - (barWidth / 2);
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
        .tickFormat((d, i) => {
          console.log('format');
          return this.asMoment[i].format('YY-MM-DD');
        });
    }

    let yAxis = d3.axisRight(yScale);

    d3.select('.xaxis')
      .append("g")
      .call(xAxis)
      .attr("transform", "translate(" + 0 + ", " + 450 + ")");

    d3.select('.yaxis')
      .append("g")
      .call(yAxis)
      .attr("transform", "translate(" + 600 + ", " + 0 + ")");

  }

  title = 'ngtest';
}
