import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SpinnerFacadeService } from '../../core/services/spinner-facade.service';
import { CreateAccountRequest } from '../models';
import { AuthFacadeService } from '../services/auth-facade.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-create-account-form
      [pending]="pending$ | async"
      (submitted)="onSubmit($event)"
    >
    </app-create-account-form>
  `,
})
export class CreateAccountPageComponent {
  pending$ = this.spinnerFacadeService.isLoading$;

  constructor(
    private authFacadeService: AuthFacadeService,
    private spinnerFacadeService: SpinnerFacadeService
  ) {}

  onSubmit(account: CreateAccountRequest): void {
    this.authFacadeService.createAccount(account);
  }
}
