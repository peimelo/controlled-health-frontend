import { HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Unit } from '../../core/models';
import { BaseResourceService } from '../../core/services/base-resource.service';
import { UnitResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class UnitsService extends BaseResourceService<Unit> {
  constructor(protected override injector: Injector) {
    super(`${environment.baseUrl}/units`, injector);
  }

  getAll(pageIndex: number, sort: Sort): Observable<UnitResponse> {
    const params = new HttpParams()
      .set('page', pageIndex.toString())
      .set('sort', sort.active)
      .set('dir', sort.direction);

    return this.http.get<UnitResponse>(this.apiPath, {
      params,
    });
  }
}
