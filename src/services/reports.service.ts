import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpParams, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from '../interfaces/brand';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private url: string = `${environment.url}/${environment.reports}`;
  private http: HttpClient = inject(HttpClient);

  getReport(payload: any): Observable<any> {
    return this.http.post(`${this.url}`, payload, { responseType: 'blob' });
  }
  
  getData(): Observable<any> {
    return this.http.get(`${this.url}`);
  }
}
