import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable()
export class LayoutFacadeService {
  isHandsetPortrait$: Observable<boolean>;
  isHandsetLandscape$: Observable<boolean>;
  isTablet$: Observable<boolean>;
  isWeb$: Observable<boolean>;
  mediaObserver$: Observable<MediaChange[]>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private mediaObserver: MediaObserver
  ) {
    this.isHandsetPortrait$ = this.breakpointObserver
      .observe(Breakpoints.HandsetPortrait)
      .pipe(
        map((result) => result.matches),
        shareReplay()
      );

    this.isHandsetLandscape$ = this.breakpointObserver
      .observe(Breakpoints.HandsetLandscape)
      .pipe(
        map((result) => result.matches),
        shareReplay()
      );

    this.isTablet$ = this.breakpointObserver.observe(Breakpoints.Tablet).pipe(
      map((result) => result.matches),
      shareReplay()
    );

    this.isWeb$ = this.breakpointObserver.observe(Breakpoints.Web).pipe(
      map((result) => result.matches),
      shareReplay()
    );

    this.mediaObserver$ = this.mediaObserver.asObservable();
  }
}
