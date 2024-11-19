import {Component, OnInit} from '@angular/core';
import {CardModule} from 'primeng/card';
import { CommonModule } from '@angular/common';
import { MetricsService} from '../../services/metrics/metrics.service';
import { CarerService} from '../../services/carer/carer.service';

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
  userId: number = +localStorage.getItem('userId')!;
  userRole: string = localStorage.getItem('userRole')!;
  patientId: any;

  isPatient: boolean = false;
  isCarer: boolean = false;

  constructor(private metricsService: MetricsService, private carerService: CarerService) {}

  ngOnInit(): void {
    this.isPatient = this.userRole === 'PATIENT';
    this.isCarer = this.userRole === 'CARER';

    if (this.isPatient) {
      this.getMetricsById(this.userId);
    }
    if (this.isCarer) {
      console.log(this.userId);
      this.getMetricsByIdCarer(this.userId);
    }
  }

  getMetricsByIdCarer(carerId: number): void {
    this.carerService.getPatentByCarerId(carerId).subscribe(
      (response: any) => {
        console.log('Respuesta de la API:', response);

        if (response && response.id) {
          console.log(response);
          this.patientId = response.id; // Almacena el ID del paciente
          console.log(`ID del paciente asociado: ${this.patientId}`);

          // Una vez obtenido el ID del paciente, busca sus métricas
          this.getMetricsById(this.patientId);
        } else {
          console.error('No se encontró un paciente asociado al cuidador.');
        }
      },
      (error) => {
        console.error('Error al obtener el ID del paciente asociado:', error);
      }
    );
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
