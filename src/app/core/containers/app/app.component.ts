import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthFacadeService } from '../../../auth/services/auth-facade.service';
import { LayoutFacadeService } from '../../services/layout-facade.service';
import { SpinnerFacadeService } from '../../services/spinner-facade.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isHandset$ = this.layoutFacadeService.isHandset$;
  loggedIn$ = this.authFacadeService.loggedIn$;
  showSpinner$ = this.spinnerFacadeService.showSpinner$;
  user$ = this.authFacadeService.user$;

  constructor(
    private authFacadeService: AuthFacadeService,
    private layoutFacadeService: LayoutFacadeService,
    private spinnerFacadeService: SpinnerFacadeService
  ) {}

  logout(): void {
    this.authFacadeService.logout();
  }
}
