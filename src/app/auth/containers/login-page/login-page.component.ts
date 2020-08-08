import { Component } from '@angular/core';
import { LayoutFacadeService } from '../../../core/services/layout-facade.service';
import { Credentials } from '../../models';
import { AuthFacadeService } from '../../services/auth-facade.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  pending$ = this.layoutFacade.isSpinnerLoading$;

  constructor(
    private authFacade: AuthFacadeService,
    private layoutFacade: LayoutFacadeService
  ) {}

  onSubmit(credentials: Credentials): void {
    this.authFacade.login(credentials);
  }
}
