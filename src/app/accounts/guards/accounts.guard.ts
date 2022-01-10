import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Observable} from 'rxjs';
import {filter, take, tap} from 'rxjs/operators';
import {AccountsFacadeService} from "../services/accounts-facade.service";

@Injectable({
  providedIn: 'root',
})
export class AccountsGuard implements CanActivate {
  constructor(private accountsFacadeService: AccountsFacadeService) {}

  canActivate(): Observable<boolean> {
    return this.hasListLoaded();
  }

  hasListLoaded(): Observable<boolean> {
    return this.accountsFacadeService.selectListLoaded$.pipe(
      tap((listLoaded) => {
        if (!listLoaded) {
          this.accountsFacadeService.load();
        }
      }),
      filter((listLoaded) => listLoaded),
      take(1)
    );
  }
}
