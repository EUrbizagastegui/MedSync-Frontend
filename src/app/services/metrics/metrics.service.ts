import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {

  private baseUrl = 'http://localhost:8080/api/v1/metrics';
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
