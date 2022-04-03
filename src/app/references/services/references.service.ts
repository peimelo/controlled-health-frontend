import { HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Reference } from '../../core/models';
import { BaseResourceService } from '../../core/services/base-resource.service';
import { ReferenceResponse } from '../models';

@Injectable()
export class ReferencesService extends BaseResourceService<Reference> {
  constructor(protected override injector: Injector) {
    super(`${environment.baseUrl}/references`, injector);
  }

  getAll(pageIndex: number, sort: Sort): Observable<ReferenceResponse> {
    const httpParams = new HttpParams()
      .set('page', pageIndex.toString())
      .set('sort', sort.active)
      .set('dir', sort.direction);

    return this.http.get<ReferenceResponse>(this.apiPath, {
      params: httpParams,
    });
  }
}
