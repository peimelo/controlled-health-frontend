import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { AccountsFacadeService } from '../services/accounts-facade.service';

@Injectable({
  providedIn: 'root',
})
export class AccountExistsGuard implements CanActivate {
  constructor(
    private accountFacadeService: AccountsFacadeService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.hasSelectedLoaded();
  }

  hasSelectedLoaded(): Observable<boolean> {
    return this.accountFacadeService.selectedLoaded$.pipe(
      tap((selectedLoaded) => {
        if (!selectedLoaded) {
          const account = localStorage.getItem('account');

          if (account) {
            this.accountFacadeService.loadAccount(+account);
          } else {
            this.router.navigate(['/profiles']);
          }
        }
      }),
      filter((selectedLoaded) => selectedLoaded),
      take(1)
    );
  }
}
