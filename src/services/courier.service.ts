import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpParams, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { Courier } from '../interfaces/courier';

@Injectable({
  providedIn: 'root',
})
export class CourierService {
  private url: string = `${environment.url}/${environment.courierMaster}`;
  private http: HttpClient = inject(HttpClient);

  create(payload: Courier): Observable<HttpResponseBase> {
    return this.http.post<HttpResponseBase>(this.url, payload);
  }

  getCouriers(limit: number, offset: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${limit}/${offset}`);
  }

  getCourier(id: number): Observable<Courier> {
    return this.http.get<Courier>(`${this.url}/${id}`);
  }

  updateCourier(payload: Courier): Observable<Courier> {
    return this.http.put<Courier>(`${this.url}`, payload);
  }

  deleteCourier(id: number): Observable<HttpResponseBase> {
    return this.http.delete<HttpResponseBase>(`${this.url}/${id}`);
  }

  search(search: string, limit: number, offset: number): Observable<any> {
      const params = new HttpParams()
        .set('s', search)
        .set('limit', limit)
        .set('offset', offset);
      return this.http.get<any>(this.url, { params });
    }
}
