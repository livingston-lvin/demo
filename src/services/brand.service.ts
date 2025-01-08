import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpParams, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from '../interfaces/brand';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private url: string = `${environment.url}/${environment.brandMaster}`;
  private http: HttpClient = inject(HttpClient);

  create(payload: Brand): Observable<HttpResponseBase> {
    return this.http.post<HttpResponseBase>(this.url, payload);
  }

  getBrands(limit: number, offset: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${limit}/${offset}`);
  }

  getBrand(id: number): Observable<Brand> {
    return this.http.get<Brand>(`${this.url}/${id}`);
  }

  updateBrand(payload: Brand): Observable<Brand> {
    return this.http.put<Brand>(`${this.url}`, payload);
  }

  deleteBrand(id: number): Observable<HttpResponseBase> {
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
