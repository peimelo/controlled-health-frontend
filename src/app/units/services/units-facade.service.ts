import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Pagination, Unit } from '../../core/models';
import {
  UnitFormDialogActions,
  UnitsGuardActions,
  UnitsPageActions,
} from '../actions';
import * as fromUnits from '../reducers';

@Injectable()
export class UnitsFacadeService {
  units$: Observable<Unit[]>;
  pagination$: Observable<Pagination>;
  selectListLoaded$: Observable<boolean>;
  sort$: Observable<Sort>;

  constructor(private store: Store<fromUnits.State>) {
    this.units$ = this.store.pipe(select(fromUnits.selectList));
    this.pagination$ = this.store.pipe(select(fromUnits.selectPagination));
    this.selectListLoaded$ = this.store.pipe(
      select(fromUnits.selectListLoaded)
    );
    this.sort$ = this.store.pipe(select(fromUnits.selectSort));
  }

  add(): void {
    this.store.dispatch(UnitsPageActions.addUnit());
  }

  changePage(pageIndex: number): void {
    this.store.dispatch(UnitsPageActions.changePageUnits({ pageIndex }));
  }

  create(unit: Unit): void {
    this.store.dispatch(UnitFormDialogActions.createUnit({ unit }));
  }

  delete(id: number): void {
    this.store.dispatch(UnitsPageActions.deleteUnit({ id }));
  }

  edit(unit: Unit): void {
    this.store.dispatch(UnitsPageActions.editUnit({ unit }));
  }

  load(): void {
    this.store.dispatch(UnitsGuardActions.loadUnits());
  }

  sort(sort: Sort): void {
    this.store.dispatch(UnitsPageActions.sortUnits({ sort }));
  }

  update(unit: Unit): void {
    this.store.dispatch(UnitFormDialogActions.updateUnit({ unit }));
  }
}
