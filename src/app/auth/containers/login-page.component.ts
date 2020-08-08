import { Component } from '@angular/core';
import { LayoutFacadeService } from '../../core/services/layout-facade.service';
import { Credentials } from '../models';
import { AuthFacadeService } from '../services/auth-facade.service';

@Component({
  template: `
    <app-login-form [pending]="pending$ | async" (submitted)="onSubmit($event)">
    </app-login-form>
  `,
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
