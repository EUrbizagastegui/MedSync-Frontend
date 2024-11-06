import { Component } from '@angular/core';
import {CardModule} from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-daily-history',
  standalone: true,
  imports: [
    CommonModule,
    CardModule
  ],
  templateUrl: './daily-history.component.html',
  styleUrl: './daily-history.component.css'
})
export class DailyHistoryComponent {
  data = [
    {
      fecha: 'Martes 25, Septiembre 2024',
      promedio: 75,
      maxima: 130,
      minima: 60
    },
    {
      fecha: 'Martes 26, Septiembre 2024',
      promedio: 80,
      maxima: 135,
      minima: 65
    },
    {
      fecha: 'Martes 27, Septiembre 2024',
      promedio: 70,
      maxima: 125,
      minima: 55
    }
  ]
}