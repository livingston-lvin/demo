import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpParams, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root',
})
export class ItemPriceService {
  private url: string = `${environment.url}/${environment.itemPrice}`;
  private http: HttpClient = inject(HttpClient);

  create(payload: any): Observable<HttpResponseBase> {
    return this.http.post<HttpResponseBase>(this.url, payload);
  }

  getAll(limit: number, offset: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${limit}/${offset}`);
  }

  get(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  update(payload: any): Observable<Item> {
    return this.http.put<Item>(`${this.url}`, payload);
  }

  delete(id: number): Observable<HttpResponseBase> {
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
