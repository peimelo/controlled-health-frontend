import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutFacadeService } from '../../services/layout-facade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isHandset$ = this.layoutFacade.isHandset$;
  showSidenav$ = this.layoutFacade.showSidenav$;

  isSpinnerLoading$: Observable<boolean>;
  loggedIn$: Observable<boolean>;
  user$: Observable<any>;

  constructor(private layoutFacade: LayoutFacadeService) {}

  closeSidenav(): void {
    this.layoutFacade.closeSidenav();
  }

  logout(): void {
    // this.store.dispatch(AuthActions.logout());
  }

  openSidenav(): void {
    this.layoutFacade.openSidenav();
  }
}
