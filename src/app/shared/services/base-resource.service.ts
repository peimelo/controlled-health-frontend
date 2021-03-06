import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResourceModel } from '../models';

export abstract class BaseResourceService<T extends BaseResourceModel> {
  protected http: HttpClient;

  constructor(protected apiPath: string, protected injector: Injector) {
    this.http = injector.get(HttpClient);
  }

  create(resource: T): Observable<T> {
    return this.http.post<T>(this.apiPath, resource);
  }

  // getAll(pageIndex: number): Observable<T> {
  //   const httpParams = new HttpParams().set('page', pageIndex.toString());

  //   return this.http.get<T>(this.apiPath, {
  //     params: httpParams,
  //   });
  // }

  getOne(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiPath}/${id}`);
  }

  update(resource: T): Observable<T> {
    return this.http.put<T>(`${this.apiPath}/${resource.id}`, resource);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiPath}/${id}`);
  }
}
