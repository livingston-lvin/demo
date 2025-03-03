import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpParams, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root',
})
export class DispatchReportService {
  private url: string = `${environment.url}/excel`;
  private http: HttpClient = inject(HttpClient);

  uploadIcici(payload: FormData): Observable<any> {
    return this.http.post(`${this.url}/process/icici-data`, payload);
  }
  
  uploadApple(payload: FormData): Observable<any> {
    return this.http.post(`${this.url}/process/apple-data`, payload);
  }

  download(): Observable<any> {
    return this.http.get(`${this.url}/process/data`, {
      responseType: 'blob',
    });
  }
}
