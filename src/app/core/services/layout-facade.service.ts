import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import * as fromRoot from '../../reducers';
import { LayoutActions } from '../actions';

@Injectable({ providedIn: 'root' })
export class LayoutFacadeService {
  isHandset$: Observable<boolean>;
  isSpinnerLoading$: Observable<boolean>;
  loggedIn$: Observable<boolean>;
  showSidenav$: Observable<boolean>;
  user$: Observable<any>;

  constructor(
    private store: Store<fromRoot.State>,
    private breakpointObserver: BreakpointObserver
  ) {
    this.isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map((result) => result.matches),
      shareReplay()
    );

    this.showSidenav$ = this.store.pipe(select(fromRoot.selectShowSidenav));
  }

  closeSidenav(): void {
    this.store.dispatch(LayoutActions.closeSidenav());
  }

  openSidenav(): void {
    this.store.dispatch(LayoutActions.openSidenav());
  }
}
