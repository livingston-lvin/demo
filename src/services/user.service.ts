import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { HttpClient, HttpParams, HttpResponseBase } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url: string = `${environment.url}/${environment.user}`;
  private http: HttpClient = inject(HttpClient);

  create(payload: User): Observable<HttpResponseBase> {
    return this.http.post<HttpResponseBase>(this.url, payload);
  }

  getUsers(limit: number, offset: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${limit}/${offset}`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  updateUser(payload: User): Observable<User> {
    return this.http.put<User>(`${this.url}`, payload);
  }

  deleteUser(id: number): Observable<HttpResponseBase> {
    return this.http.delete<HttpResponseBase>(`${this.url}/${id}`);
  }

  search(data: any): Observable<any> {
    const params = new HttpParams().set('s', data);
    return this.http.get<any>(this.url, { params });
  }
}
