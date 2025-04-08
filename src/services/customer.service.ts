import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpParams, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private url: string = `${environment.url}/${environment.customerMaster}`;
  private http: HttpClient = inject(HttpClient);

  create(payload: Customer): Observable<HttpResponseBase> {
    return this.http.post<HttpResponseBase>(this.url, payload);
  }
  
  update(payload: Customer): Observable<HttpResponseBase> {
    return this.http.put<HttpResponseBase>(this.url, payload);
  }
  
  updateContact(payload: Customer): Observable<HttpResponseBase> {
    return this.http.put<HttpResponseBase>(`${this.url}/contact`, payload);
  }
  
  updateBilling(payload: Customer): Observable<HttpResponseBase> {
    return this.http.put<HttpResponseBase>(`${this.url}/billing`, payload);
  }

  getCustomers(limit: number, offset: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${limit}/${offset}`);
  }

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.url}`);
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.url}/${id}`);
  }

  updateCustomer(payload: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.url}`, payload);
  }

  deleteCustomer(id: number): Observable<HttpResponseBase> {
    return this.http.delete<HttpResponseBase>(`${this.url}/${id}`);
  }
  
  deleteContact(id: number): Observable<HttpResponseBase> {
    return this.http.delete<HttpResponseBase>(`${this.url}/contact/${id}`);
  }
  
  deleteBilling(id: number): Observable<HttpResponseBase> {
    return this.http.delete<HttpResponseBase>(`${this.url}/billing/${id}`);
  }

  search(payload: any): Observable<any> {
    return this.http.post<any>(`${this.url}/search`, payload);
  }

  getValidCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.url}/all`);
  }
}
