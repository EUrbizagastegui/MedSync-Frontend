import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {

  private baseUrl = 'https://medsync-api.up.railway.app/api/v1/metrics';
  private getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  /*
  getMetrics(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${id}`, this.httpOptions);
    //return this.http.get<any[]>(`${this.baseUrl}/${id}`, this.httpOptions);
  }*/

  getMetrics(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${id}`, this.httpOptions).pipe(
      map((response: any) => {
        console.log('Respuesta completa de la API:', response); // Log de la respuesta

        // Verifica si la respuesta es un solo objeto o un array
        if (Array.isArray(response)) {
          return response; // Si es un array, lo dejamos tal cual
        } else {
          return [response]; // Si es un objeto, lo envolvemos en un array
        }
      })
    );
  }

  getMetricByIdData(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, this.httpOptions);
  }

  getMetricByDate(patientId: number, date: string): Promise<any> {
    const url = `${this.baseUrl}/date?patientId=${patientId}&date=${date}`;

    return new Promise((resolve, reject) => {
      this.http.get(url, this.httpOptions).subscribe({
        next: (response) => resolve(response),
        error: (err) => reject(err),
      })
    });
  }
}
