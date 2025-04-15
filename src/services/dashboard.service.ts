import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpParams, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private url: string = `${environment.url}/${environment.dashboard}`;
  private http: HttpClient = inject(HttpClient);

  getData(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}
