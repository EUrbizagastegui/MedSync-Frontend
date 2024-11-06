import { Component } from '@angular/core';
import { NgCircleProgressModule, CircleProgressOptions } from 'ng-circle-progress';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgCircleProgressModule],
  providers: [
    {
      provide: CircleProgressOptions,
      useValue: {
        backgroundPadding: -4,
        radius: 50,
        outerStrokeWidth: 10,
        outerStrokeColor: "#06b6d4",
        innerStrokeWidth: 4,
        innerStrokeColor: "#0e7490",
        animation: true,
        animationDuration: 300,
        showBackground: false,
        showUnits: false,
        showSubtitle: false
      }
    }
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
}
