import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { WeightsFacadeService } from '../services/weights-facade.service';

@Injectable()
export class WeightsGuard implements CanActivate {
  constructor(private weightsFacadeService: WeightsFacadeService) {}

  canActivate(): Observable<boolean> {
    return this.hasListLoaded();
  }

  hasListLoaded(): Observable<boolean> {
    return this.weightsFacadeService.selectListLoaded$.pipe(
      tap((listLoaded) => {
        if (!listLoaded) {
          this.weightsFacadeService.load();
        }
      }),
      filter((listLoaded) => listLoaded),
      take(1)
    );
  }
}
