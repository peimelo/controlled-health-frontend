import { HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Height } from '../../shared/models';
import { BaseResourceService } from '../../shared/services/base-resource.service';
import { HeightResponse } from '../models';

@Injectable()
export class HeightsService extends BaseResourceService<Height> {
  constructor(protected override injector: Injector) {
    super(`${environment.baseUrl}/heights`, injector);
  }

  getAll(pageIndex: number, sort: Sort): Observable<HeightResponse> {
    const httpParams = new HttpParams()
      .set('page', pageIndex.toString())
      .set('sort', sort.active)
      .set('dir', sort.direction);

    return this.http.get<HeightResponse>(this.apiPath, {
      params: httpParams,
    });
  }
}
