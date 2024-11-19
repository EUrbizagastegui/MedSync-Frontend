import {Component, OnInit} from '@angular/core';
import {CardModule} from 'primeng/card';
import { CommonModule } from '@angular/common';
import { MetricsService} from '../../services/metrics/metrics.service';

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
export class DailyHistoryComponent implements OnInit {

  data: any[] = [];
  patientId: number = +localStorage.getItem('userId')!;

  constructor(private metricsService: MetricsService) {}

  ngOnInit(): void {
    this.getMetricsById(this.patientId);
  }

  getMetricsById(id: number): void {
    this.metricsService.getMetrics(id).subscribe(
      (response: any) => {
        console.log('Respuesta de la API:', response);

        if (response) {
          this.data = [{
            fecha: this.formatDate(response.date),
            promedio: response.average,
            maxima: response.maxFrequency,
            minima: response.minFrequency
          }];
        } else {
          console.error('No se encontró la métrica en la respuesta:', response);
        }
      },
      (error) => {
        console.error('Error al obtener las métricas:', error);
      }
    );
  }

  formatDate(dateArray: number[]): string {
    const [year, month, day] = dateArray;
    const date = new Date(year, month - 1, day);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('es-ES', options).toUpperCase();
  }
}
