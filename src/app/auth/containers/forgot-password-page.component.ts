import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SpinnerFacadeService } from '../../core/services/spinner-facade.service';
import { AuthFacadeService } from '../services/auth-facade.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-forgot-password-form
      [pending]="pending$ | async"
      (submitted)="onSubmit($event)"
    >
    </app-forgot-password-form>
  `,
})
export class ForgotPasswordPageComponent {
  pending$ = this.spinnerFacadeService.isLoading$;

  constructor(
    private authFacadeService: AuthFacadeService,
    private spinnerFacadeService: SpinnerFacadeService
  ) {}

  onSubmit(email: string): void {
    this.authFacadeService.forgotPassword(email);
  }
}
