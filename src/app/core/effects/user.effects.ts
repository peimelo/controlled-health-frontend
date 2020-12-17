import { Injectable } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { fromEvent, merge, timer } from 'rxjs';
import { map, switchMapTo } from 'rxjs/operators';
import { UserActions } from '../actions';

@Injectable()
export class UserEffects {
  clicks$ = fromEvent(document, 'click');
  keys$ = fromEvent(document, 'keydown');
  mouse$ = fromEvent(document, 'mousemove');

  idle$ = createEffect(() =>
    merge(this.clicks$, this.keys$, this.mouse$).pipe(
      switchMapTo(timer(10 * 60 * 1000)), // 10 minute inactivity timeout
      map(() => UserActions.idleTimeout())
    )
  );
}
