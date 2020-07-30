import { Component } from '@angular/core';
import { AuthFacadeService } from '../../../auth/services/auth-facade.service';
import { LayoutFacadeService } from '../../services/layout-facade.service';
import { SpinnerFacadeService } from '../../services/spinner-facade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isHandset$ = this.layoutFacade.isHandset$;
  loggedIn$ = this.authFacade.loggedIn$;
  showSidenav$ = this.layoutFacade.showSidenav$;
  showSpinner$ = this.spinnerFacade.showSpinner$;
  user$ = this.authFacade.user$;

  constructor(
    private authFacade: AuthFacadeService,
    private layoutFacade: LayoutFacadeService,
    private spinnerFacade: SpinnerFacadeService
  ) {}

  closeSidenav(): void {
    this.layoutFacade.closeSidenav();
  }

  logout(): void {
    this.authFacade.logout();
    this.layoutFacade.closeSidenav();
  }

  openSidenav(): void {
    this.layoutFacade.openSidenav();
  }
}
