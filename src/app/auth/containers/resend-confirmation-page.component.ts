import { Component } from '@angular/core';
import { LayoutFacadeService } from '../../core/services/layout-facade.service';
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
  pending$ = this.layoutFacade.isSpinnerLoading$;

  constructor(
    private authFacade: AuthFacadeService,
    private layoutFacade: LayoutFacadeService
  ) {}

  onSubmit(email: string): void {
    this.authFacade.resendConfirmation(email);
  }
}
