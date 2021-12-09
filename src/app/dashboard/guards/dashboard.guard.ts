import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { DashboardFacadeService } from '../services/dashboard-facade.service';

@Injectable()
export class DashboardGuard implements CanActivate {
  constructor(private dashboardFacadeService: DashboardFacadeService) {}

  canActivate(): Observable<boolean> {
    return this.hasLoaded();
  }

  hasLoaded(): Observable<boolean> {
    return this.dashboardFacadeService.selectLoaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.dashboardFacadeService.load();
        }
      }),
      filter((loaded) => loaded),
      take(1)
    );
  }
}
