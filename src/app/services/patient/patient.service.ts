import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseUrl = 'http://localhost:8080/api/v1/patients';
  private token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiQ0FSRVIiLCJpZCI6MSwic3ViIjoidGVzdDEyM0BnbWFpbC5jb20iLCJpYXQiOjE3MzE5NzUwMzEsImV4cCI6MTczMjU3OTgzMX0.F0BdMVdQt6eM-H9P5F4HCvB9gL5mPtCy2tFiSD1YLkQ';

  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getPatients() : Observable<any> {
    return this.http.get(this.baseUrl, this.httpOptions);
  }

  getPatient(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`, this.httpOptions);
  }

  updatePatient(id: string, patientData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, patientData, this.httpOptions);
  }

  /*
  updateCarer(patientId: number, carerId: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${patientId}/carer`, carerData, this.httpOptions);
  }*/
}
