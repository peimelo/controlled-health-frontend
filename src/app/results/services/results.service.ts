import { HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseResourceService } from '../../core/services/base-resource.service';
import { Result, ResultResponse } from '../models';

@Injectable()
export class ResultsService extends BaseResourceService<Result> {
  constructor(protected override injector: Injector) {
    super(`${environment.baseUrl}/results`, injector);
  }

  getAll(pageIndex: number, sort: Sort): Observable<ResultResponse> {
    const httpParams = new HttpParams()
      .set('page', pageIndex.toString())
      .set('sort', sort.active)
      .set('dir', sort.direction);

    return this.http.get<ResultResponse>(this.apiPath, {
      params: httpParams,
    });
  }
}
