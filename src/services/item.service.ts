import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private url: string = `${environment.url}/${environment.item}`;
  private http: HttpClient = inject(HttpClient);

  create(payload: any): Observable<HttpResponseBase> {
    return this.http.post<HttpResponseBase>(this.url, payload);
  }

  getAll(limit: number, offset: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${limit}/${offset}`);
  }

  get(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.url}/${id}`);
  }

  update(payload: Item): Observable<Item> {
    return this.http.put<Item>(`${this.url}`, payload);
  }

  delete(id: number): Observable<HttpResponseBase> {
    return this.http.delete<HttpResponseBase>(`${this.url}/${id}`);
  }
}
