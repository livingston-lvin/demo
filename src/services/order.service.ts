import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private url: string = `${environment.url}/${environment.order}`;
  private http: HttpClient = inject(HttpClient);

  getAllByCustomerId(
    id: number,
    limit: number,
    offset: number
  ): Observable<any> {
    return this.http.get<any>(`${this.url}/all/${id}/${limit}/${offset}`);
  }

  getOrderDetail(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${orderId}`);
  }

  download(customerId: number): Observable<any> {
    return this.http.get(`${this.url}/download/all/${customerId}`, {
      responseType: 'blob',
    });
  }

  upload(payload: FormData): Observable<any> {
    return this.http.post(`${this.url}/upload-format`, payload);
  }
}
