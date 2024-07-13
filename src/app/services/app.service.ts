import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiUrl = ' http://localhost:3000'; // URL de tu backend

  constructor(private http: HttpClient) { }

  getUserState(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    this.http.get<any>(`${this.apiUrl}/getState`, { params }).subscribe(
      data => console.log("Response buenas:", data),
      error => console.log("Error:", error)
    );
  
    return this.http.get<any>(`${this.apiUrl}/getState`, { params });
  }

  setUserStateLocalStorage(state: string) {
    localStorage.setItem('userState', state);
    console.log('Userstate', state)
  }

  getUserStateLocalStorage(): string | null {
    return localStorage.getItem('userState');
  }

  updateState(email: string, newState: string): Observable<any> {
    const url = `${this.apiUrl}/update`;
    const body = { email, newState };
    return this.http.post<any>(url, body);
  }
}
