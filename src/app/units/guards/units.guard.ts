import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { UnitsFacadeService } from '../services/units-facade.service';

@Injectable()
export class UnitsGuard implements CanActivate {
  constructor(private unitsFacadeService: UnitsFacadeService) {}

  canActivate(): Observable<boolean> {
    return this.hasListLoaded();
  }

  hasListLoaded(): Observable<boolean> {
    return this.unitsFacadeService.selectListLoaded$.pipe(
      tap((listLoaded) => {
        if (!listLoaded) {
          this.unitsFacadeService.load();
        }
      }),
      filter((listLoaded) => listLoaded),
      take(1)
    );
  }
}
