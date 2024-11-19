import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class HomeComponent implements OnInit, OnDestroy {
  progress = 0;
  max=130;
  userId=0;
  
  currentDate = '';
  private intervalId: any;
  color='#06b6d4';
  level='';

  // 45 y 100
  constructor(private metricsService: MetricsService) { }

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
    this.userId = Number(localStorage.getItem('userId'));
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
