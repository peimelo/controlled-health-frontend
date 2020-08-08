import { Component } from '@angular/core';
import { SpinnerFacadeService } from '../../core/services/spinner-facade.service';
import { CreateAccountRequest } from '../models';
import { AuthFacadeService } from '../services/auth-facade.service';

@Component({
  template: `
    <app-create-account-form
      [pending]="pending$ | async"
      (submitted)="onSubmit($event)"
    >
    </app-create-account-form>
  `,
})
export class CreateAccountPageComponent {
  pending$ = this.spinnerFacade.showSpinner$;

  constructor(
    private authFacade: AuthFacadeService,
    private spinnerFacade: SpinnerFacadeService
  ) {}

  onSubmit(account: CreateAccountRequest): void {
    this.authFacade.createAccount(account);
  }
}
