import { HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Weight } from '../../shared/models';
import { BaseResourceService } from '../../shared/services/base-resource.service';
import { WeightResponse } from '../models';

@Injectable()
export class WeightsService extends BaseResourceService<Weight> {
  constructor(protected injector: Injector) {
    super(`${environment.baseUrl}/weights`, injector);
  }

  getAll(pageIndex: number): Observable<WeightResponse> {
    const httpParams = new HttpParams().set('page', pageIndex.toString());

    return this.http.get<WeightResponse>(this.apiPath, {
      params: httpParams,
    });
  }
}
