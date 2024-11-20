import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { MetricsService } from '../../services/metrics/metrics.service';
import { CarerService } from '../../services/carer/carer.service';
import {forkJoin, from} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-daily-history',
  standalone: true,
  imports: [
    CommonModule,
    CardModule
  ],
  templateUrl: './daily-history.component.html',
  styleUrls: ['./daily-history.component.css']
})
export class DailyHistoryComponent implements OnInit {

  data: any[] = [];
  userId: number = +localStorage.getItem('userId')!;
  userRole: string = localStorage.getItem('userRole')!;
  patientId: any;

  isPatient: boolean = false;
  isCarer: boolean = false;

  constructor(
    private metricsService: MetricsService,
    private carerService: CarerService
  ) {}

  ngOnInit(): void {
    this.isPatient = this.userRole === 'PATIENT';
    this.isCarer = this.userRole === 'CARER';

    const dates = ['2024-11-18','2024-11-19' ,'2024-11-20'];

    if (this.isPatient) {
      this.getMetricsByMultipleDates(this.userId, dates);
    }

    if (this.isCarer) {
      this.getMetricsByIdCarer(this.userId);
    }
  }

  getMetricsByIdCarer(carerId: number): void {
    this.carerService.getPatentByCarerId(carerId).subscribe(
      (response: any) => {
        if (response && response.id) {
          this.patientId = response.id; // Store the patient ID
          this.getMetricsByMultipleDates(this.patientId, ['2024-11-18', '2024-11-19']);
        } else {
          console.error('No se encontró un paciente asociado al cuidador.');
        }
      },
      (error) => {
        console.error('Error al obtener el ID del paciente asociado:', error);
      }
    );
  }

  getMetricsByMultipleDates(patientId: number, dates: string[]): void {
    const dateObservables = dates.map((date) =>
      // Si getMetricByDate devuelve una promesa, usar from() para convertirla en un observable
      from(this.metricsService.getMetricByDate(patientId, date)).pipe(
        catchError((error) => {
          console.error(`Error al obtener métricas para la fecha ${date}:`, error);
          return []; // Devuelve un array vacío si ocurre un error para esa fecha
        })
      )
    );

    forkJoin(dateObservables).subscribe((responses) => {
      const allMetrics = responses.flat(); // Combina todas las métricas de todas las fechas
      if (allMetrics.length > 0) {
        this.data = allMetrics.map((metric: any) => this.mapMetric(metric));
        console.log('Métricas combinadas:', this.data);
      } else {
        console.log('No se encontraron métricas para ninguna de las fechas');
        this.data = [];
      }
    });
  }

  mapMetric(metric: any): any {
    return {
      fecha: this.formatDate(metric.date), // Formatea la fecha
      promedio: metric.average,
      maxima: metric.maxFrequency,
      minima: metric.minFrequency,
      paciente: `${metric.patient?.name || 'N/A'} ${metric.patient?.lastname || ''}`
    };
  }

  formatDate(dateArray: number[]): string {
    const [year, month, day] = dateArray;
    const date = new Date(year, month - 1, day);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('es-ES', options).toUpperCase();
  }
}
