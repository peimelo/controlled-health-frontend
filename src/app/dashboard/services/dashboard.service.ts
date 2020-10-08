import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../auth/models';

@Injectable()
export class DashboardService {
  user: User;

  constructor(
    private http: HttpClient,
  ) { }

  getAll(): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/dashboards`);
  }
}
