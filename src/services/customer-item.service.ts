import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpParams, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerItem } from '../interfaces/customer-item';

@Injectable({
  providedIn: 'root',
})
export class CustomerItemService {
  private url: string = `${environment.url}/${environment.customerMaster}-${environment.item}`;
  private http: HttpClient = inject(HttpClient);

  create(payload: CustomerItem): Observable<HttpResponseBase> {
    return this.http.post<HttpResponseBase>(this.url, payload);
  }

  getCustomerItems(limit: number, offset: number, id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${limit}/${offset}/${id}`);
  }

  getData(): Observable<any> {
    return this.http.get<any>(`${this.url}/data`);
  }

  getAll(): Observable<CustomerItem[]> {
    return this.http.get<CustomerItem[]>(`${this.url}`);
  }

  getCustomerItem(id: number): Observable<CustomerItem> {
    return this.http.get<CustomerItem>(`${this.url}/${id}`);
  }

  updateCustomerItem(payload: any): Observable<any> {
    return this.http.put<any>(`${this.url}`, payload);
  }

  deleteCustomerItem(id: number): Observable<HttpResponseBase> {
    return this.http.delete<HttpResponseBase>(`${this.url}/${id}`);
  }

  search(payload: any): Observable<any> {
    return this.http.post<any>(`${this.url}/search`, payload);
  }

  getValidCustomerItems(): Observable<CustomerItem[]> {
    return this.http.get<CustomerItem[]>(`${this.url}/all`);
  }

  download(): Observable<any> {
    return this.http.get(`${this.url}/download-format`, {
      responseType: 'blob',
    });
  }

  upload(payload: FormData): Observable<any> {
    return this.http.post(`${this.url}/upload-format`, payload);
  }
}
