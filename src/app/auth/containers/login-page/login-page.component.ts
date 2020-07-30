import { Component } from '@angular/core';
import { Credentials } from '../../models';
import { AuthFacadeService } from '../../services/auth-facade.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  errors$ = this.authFacade.errors$;
  pending$ = this.authFacade.pending$;

  constructor(private authFacade: AuthFacadeService) {}

  onSubmit(credentials: Credentials): void {
    this.authFacade.login(credentials);
  }
}
