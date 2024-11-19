import { Component, OnDestroy, OnInit } from '@angular/core';
// https://www.npmjs.com/package/angular-svg-round-progressbar
import {RoundProgressComponent} from 'angular-svg-round-progressbar';
import { MetricsService } from '../../../services/metrics/metrics.service';
import { CarerService } from '../../../services/carer/carer.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RoundProgressComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  progress = 0;
  max=130;
  userId=Number(localStorage.getItem('userId'));;
  userRole: string = localStorage.getItem('userRole')!;
  patientId: any;
  data: any[] = [];
  
  currentDate = '';
  private intervalId: any;
  color='#06b6d4';
  level='';

  // 45 y 100
  constructor(private carerService: CarerService, private metricsService: MetricsService) { }

  getCurrentDate(): string {
    const today = new Date();
    
    const year = today.getFullYear(); // Obtiene el año
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Obtiene el mes (añadiendo 1 ya que los meses empiezan desde 0)
    const day = String(today.getDate()).padStart(2, '0'); // Obtiene el día, y lo rellena con un 0 si es menor a 10
  
    return `${year}-${month}-${day}`; // Devuelve la fecha en formato aaaa-mm-dd
  }

  async fetchMetrics() {
    try {
      const response = await this.metricsService.getMetricByDate(this.userId, this.currentDate);
      this.progress = response.average;
      this.getLevel(Number(response.average));
    } catch (error) {
      console.error('Error al obtener las métricas:', error);
    }
  }

  async getMetricsByIdCarer(carerId: number): Promise<void> {
    console.log("OBTENIENDO METRICAS DEL PACIENTE.");
    this.carerService.getPatentByCarerId(carerId).subscribe(
      (response: any) => {
        console.log('Respuesta de la API:', response);

        if (response && response.id) {
          console.log("OBTENIENDO ID DEL PACIENTE.");
          this.userId = response.id; // Almacena el ID del paciente
          console.log(`ID del paciente asociado: ${this.userId}`);

        } else {
          console.error('No se encontró un paciente asociado al cuidador.');
        }
      },
      (error) => {
        console.error('Error al obtener el ID del paciente asociado:', error);
      }
    );
  }

  formatDate(dateArray: number[]): string {
    const [year, month, day] = dateArray;
    const date = new Date(year, month - 1, day);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('es-ES', options).toUpperCase();
  }

  getLevel(bpm: any) {
    if (bpm < 45) {
      this.color = '#ff0000';
      this.level = 'Bajo';
    } else if (bpm < 100) {
      this.color = '#06b6d4';
      this.level = 'Normal';
    } else {
      this.color = '#ff0000';
      this.level = 'Alto';
    }
  }

  ngOnInit(): void {
    // Ejecutar inmediatamente
    if (this.userRole === 'CARER') {
      console.log("ID DEL CARER: ", this.userId);
      this.getMetricsByIdCarer(Number(this.userId));
    }

    this.color = '#06b6d4';
    this.currentDate = this.getCurrentDate();
    this.fetchMetrics();

    // Configurar intervalo de 2.5 segundos
    this.intervalId = setInterval(() => {
      this.currentDate = this.getCurrentDate();
      this.fetchMetrics();
    }, 2500);
  }

  ngOnDestroy(): void {
    // Limpiar el intervalo para evitar fugas de memoria
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

}
