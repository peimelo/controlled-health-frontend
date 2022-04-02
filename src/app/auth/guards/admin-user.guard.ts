import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { AuthFacadeService } from '../services/auth-facade.service';

@Injectable({
  providedIn: 'root',
})
export class AdminUserGuard implements CanActivate {
  constructor(
    private authFacadeService: AuthFacadeService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.isUserAdmin();
  }

  isUserAdmin(): Observable<boolean> {
    return this.authFacadeService.isUserAdmin$.pipe(
      tap((isUserAdmin) => {
        if (!isUserAdmin) {
          this.router.navigate(['/profiles']);
        }
      }),
      filter((isUserAdmin) => isUserAdmin),
      take(1)
    );
  }
}
