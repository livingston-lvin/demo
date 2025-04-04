import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductDetailUpdateService {
  url: string = `${environment.url}/product-detail`;

  constructor(private http: HttpClient) {}

  getEmployeeHeaders(payload: any) {
    return this.http.post(`${this.url}/get-headers`, payload);
  }

  insertEmployee(payload: any): Observable<any> {
    return this.http.post(`${this.url}/update`, payload);
  }

}

