import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {

  private baseUrl = 'http://localhost:8080/api/v1/metrics'; // URL base para métricas
  private token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUEFUSUVOVCIsImlkIjoxLCJzdWIiOiJjaHVwZXRpbkBnbWFpbC5jb20iLCJpYXQiOjE3MzE5ODQyMDIsImV4cCI6MTczMjU4OTAwMn0.g52R9JsGFbtPdsSCJwCEGJUDlZzdAmNZJXE_B0Y-SoA'; // Token de autenticación (reemplazar con tu token real)

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getMetrics(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`, this.httpOptions);
  }

  getMetricByIdData(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, this.httpOptions);
  }

  getMetricByDate(date: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${date}`, this.httpOptions);
  }
}
