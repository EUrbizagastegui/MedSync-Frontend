import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarerService {

  private baseUrl = 'https://medsync-api.up.railway.app/api/v1/carer';
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
