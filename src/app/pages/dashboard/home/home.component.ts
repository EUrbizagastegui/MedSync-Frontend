import { Component } from '@angular/core';
// https://www.npmjs.com/package/angular-svg-round-progressbar
import {RoundProgressComponent} from 'angular-svg-round-progressbar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RoundProgressComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  progress = 75;
  max=100;
}
