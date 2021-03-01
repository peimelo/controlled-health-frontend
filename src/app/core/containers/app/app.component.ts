import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthFacadeService } from '../../../auth/services/auth-facade.service';
import { LayoutFacadeService } from '../../services/layout-facade.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isHandset$ = this.layoutFacadeService.isHandset$;
  loggedIn$ = this.authFacadeService.loggedIn$;
  user$ = this.authFacadeService.user$;

  constructor(
    private authFacadeService: AuthFacadeService,
    private layoutFacadeService: LayoutFacadeService
  ) {}

  logout(): void {
    this.authFacadeService.logout();
  }
}
