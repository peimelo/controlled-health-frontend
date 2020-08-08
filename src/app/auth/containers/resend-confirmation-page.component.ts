import { Component } from '@angular/core';
import { SpinnerFacadeService } from '../../core/services/spinner-facade.service';
import { AuthFacadeService } from '../services/auth-facade.service';

@Component({
  template: `
    <app-resend-confirmation-form
      [pending]="pending$ | async"
      (submitted)="onSubmit($event)"
    >
    </app-resend-confirmation-form>
  `,
})
export class ResendConfirmationPageComponent {
  pending$ = this.spinnerFacade.showSpinner$;

  constructor(
    private authFacade: AuthFacadeService,
    private spinnerFacade: SpinnerFacadeService
  ) {}

  onSubmit(email: string): void {
    this.authFacade.resendConfirmation(email);
  }
}
