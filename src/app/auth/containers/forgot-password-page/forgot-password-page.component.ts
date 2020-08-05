import { Component } from '@angular/core';
import { AuthFacadeService } from '../../services/auth-facade.service';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
})
export class ForgotPasswordPageComponent {
  errors$ = this.authFacade.forgotPasswordErrors$;
  pending$ = this.authFacade.forgotPasswordPending$;

  constructor(private authFacade: AuthFacadeService) {}

  onSubmit(email: string): void {
    this.authFacade.forgotPassword(email);
  }
}
