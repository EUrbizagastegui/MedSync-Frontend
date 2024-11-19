import { Component, OnInit } from '@angular/core';
// https://www.npmjs.com/package/angular-svg-round-progressbar
import {RoundProgressComponent} from 'angular-svg-round-progressbar';
import { MetricsService } from '../../../services/metrics/metrics.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RoundProgressComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  progress = 0;
  max=100;
  userId=0;

  // 45 y 100
  constructor(private metricsService: MetricsService) { }

  async fetchMetrics() {
    try {
      // const response:any = await this.metricsService.getMetricByDate();
      //this.progress = response.average;
    } catch (error) {
      
    }
  }

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId'));
  }

}
