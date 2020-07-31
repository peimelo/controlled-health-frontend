import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { createEffect } from '@ngrx/effects';
import { filter, map, mergeMap, tap } from 'rxjs/operators';

@Injectable()
export class RouterEffects {
  updateTitle$ = createEffect(
    () =>
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        mergeMap((route) => route.data),
        map((data) => `${data['title']} - Controlled Health`),
        tap((title) => this.titleService.setTitle(title))
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private router: Router
  ) {}
}
