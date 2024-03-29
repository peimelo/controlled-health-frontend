import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResendConfirmationPageComponent {
  pending$ = this.spinnerFacadeService.isLoading$;

  constructor(
    private authFacadeService: AuthFacadeService,
    private spinnerFacadeService: SpinnerFacadeService
  ) {}

  onSubmit(email: string): void {
    this.authFacadeService.resendConfirmation(email);
  }
}
