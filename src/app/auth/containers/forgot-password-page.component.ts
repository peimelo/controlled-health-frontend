import { Component } from '@angular/core';
import { LayoutFacadeService } from '../../core/services/layout-facade.service';
import { AuthFacadeService } from '../services/auth-facade.service';

@Component({
  template: `
    <app-forgot-password-form
      [pending]="pending$ | async"
      (submitted)="onSubmit($event)"
    >
    </app-forgot-password-form>
  `,
})
export class ForgotPasswordPageComponent {
  pending$ = this.layoutFacade.isSpinnerLoading$;

  constructor(
    private authFacade: AuthFacadeService,
    private layoutFacade: LayoutFacadeService
  ) {}

  onSubmit(email: string): void {
    this.authFacade.forgotPassword(email);
  }
}
