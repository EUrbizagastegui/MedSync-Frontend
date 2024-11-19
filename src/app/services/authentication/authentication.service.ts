import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl = 'http://localhost:8080/api/v1/auth';

  constructor(private http: HttpClient) { }

  // Método para obtener el token desde el localStorage
  private getToken(): string | null {
    return localStorage.getItem('authToken'); // Asegúrate de guardar el token con esta clave en el login
  }

  // Método para generar los encabezados dinámicamente
  private getHttpOptions() {
    const token = this.getToken();
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return { headers };
  }

  signUp(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/signup', data).subscribe({
        next: (response) => resolve(response),
        error: (err) => reject(err),
      })
    });
  }

  signIn(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + '/signin', data).subscribe({
        next: (response) => resolve(response),
        error: (err) => reject(err),
      });
    });
  }
}
