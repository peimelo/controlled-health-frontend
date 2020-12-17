import { Injectable, Injector } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Weight } from '../../shared/models';
import { BaseResourceService } from '../../shared/services/base-resource.service';

@Injectable()
export class WeightsService extends BaseResourceService<Weight> {
  constructor(protected injector: Injector) {
    super(`${environment.baseUrl}/weights`, injector);
  }
}
