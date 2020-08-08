import { Component } from '@angular/core';
import { SpinnerFacadeService } from '../../core/services/spinner-facade.service';
import { Credentials } from '../models';
import { AuthFacadeService } from '../services/auth-facade.service';

@Component({
  template: `
    <app-login-form [pending]="pending$ | async" (submitted)="onSubmit($event)">
    </app-login-form>
  `,
})
export class LoginPageComponent {
  pending$ = this.spinnerFacade.showSpinner$;

  constructor(
    private authFacade: AuthFacadeService,
    private spinnerFacade: SpinnerFacadeService
  ) {}

  onSubmit(credentials: Credentials): void {
    this.authFacade.login(credentials);
  }
}
