import { HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Weight } from '../../core/models/weight.model';
import { BaseResourceService } from '../../core/services/base-resource.service';
import { WeightResponse } from '../models';

@Injectable()
export class WeightsService extends BaseResourceService<Weight> {
  constructor(protected override injector: Injector) {
    super(`${environment.baseUrl}/weights`, injector);
  }

  getAll(pageIndex: number, sort: Sort): Observable<WeightResponse> {
    const httpParams = new HttpParams()
      .set('page', pageIndex.toString())
      .set('sort', sort.active)
      .set('dir', sort.direction);

    return this.http.get<WeightResponse>(this.apiPath, {
      params: httpParams,
    });
  }
}
