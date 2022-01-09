import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseResourceService } from '../../core/services/base-resource.service';
import { Account, AccountResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class AccountsService extends BaseResourceService<Account> {
  constructor(protected override injector: Injector) {
    super(`${environment.baseUrl}/accounts`, injector);
  }

  getAll(): Observable<AccountResponse> {
    return this.http.get<AccountResponse>(`${environment.baseUrl}/accounts`);
  }
}
