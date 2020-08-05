import { Component } from '@angular/core';
import { Credentials } from '../../models';
import { AuthFacadeService } from '../../services/auth-facade.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  errors$ = this.authFacade.loginErrors$;
  pending$ = this.authFacade.logingPending$;

  constructor(private authFacade: AuthFacadeService) {}

  onSubmit(credentials: Credentials): void {
    this.authFacade.login(credentials);
  }
}
