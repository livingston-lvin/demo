import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpParams, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class StationeryDispatchService {
  private url: string = `${environment.url}/${environment.stationeryDispatch}`;
  private http: HttpClient = inject(HttpClient);

  getStationeryDispatch(limit: number, offset: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${limit}/${offset}`);
  }

  getStationeryDispatchById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  updateStationeryDispatch(payload: any): Observable<any> {
    return this.http.put<any>(`${this.url}`, payload);
  }

  dispatchOrder(data: number[],orderId: number): Observable<any> {
    return this.http.post<any>(`${this.url}/dispatch/${orderId}`, data);
  }

  getOrderDetail(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${orderId}`);
  }
  
  getPosterOrderDetail(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.url}/poster/${orderId}`);
  }
}
