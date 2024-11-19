import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarerService {

  private baseUrl = 'http://localhost:8080/api/v1/carer';
  private token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQ0FSRVIiLCJpZCI6MSwic3ViIjoidGVzdDEyM0BnbWFpbC5jb20iLCJpYXQiOjE3MzE5NzUwMzEsImV4cCI6MTczMjU3OTgzMX0.F0BdMVdQt6eM-H9P5F4HCvB9gL5mPtCy2tFiSD1YLkQ'; // Usa el token adecuado aquí

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getCarerById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, this.httpOptions);
  }

  updateCarer(id: number, carerData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, carerData, this.httpOptions);
  }

  getCarers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl, this.httpOptions);
  }

  getCarerByPhoneNumber(phoneNumber: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/phone/${phoneNumber}`, this.httpOptions);
  }
}
