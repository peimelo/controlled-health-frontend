import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { HeightsFacadeService } from '../services/heights-facade.service';

@Injectable()
export class HeightsGuard implements CanActivate {
  constructor(private heightsFacade: HeightsFacadeService) {}

  canActivate(): Observable<boolean> {
    return this.hasListLoaded();
  }

  hasListLoaded(): Observable<boolean> {
    return this.heightsFacade.selectListLoaded$.pipe(
      tap((listLoaded) => {
        if (!listLoaded) {
          this.heightsFacade.loadHeights(1);
        }
      }),
      filter((listLoaded) => listLoaded),
      take(1)
    );
  }
}
