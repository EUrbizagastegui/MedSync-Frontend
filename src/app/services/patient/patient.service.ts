import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseUrl = 'https://medsync-api.up.railway.app/api/v1/patients';
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

  getPatients(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl, this.httpOptions);
  }

  getPatient(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, this.httpOptions);
  }

  updatePatient(id: string, patientData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, patientData, this.httpOptions);
  }

  updatePatientCarer(patientId: string, carerId: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${patientId}/carer`, carerId, this.httpOptions);
  }

  getPatientCarer(patientId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${patientId}/carer`, this.httpOptions);
  }
}
