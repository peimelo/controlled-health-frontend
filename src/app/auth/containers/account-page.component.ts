import { Component } from '@angular/core';
import { SpinnerFacadeService } from '../../core/services/spinner-facade.service';
import { CreateAccountRequest } from '../models';
import { AuthFacadeService } from '../services/auth-facade.service';

@Component({
  template: `
    <app-account-form
      [pending]="pending$ | async"
      [user]="user$ | async"
      (deleted)="onDelete()"
      (submitted)="onSubmit($event)"
    >
    </app-account-form>
  `,
})
export class AccountPageComponent {
  pending$ = this.spinnerFacade.showSpinner$;
  user$ = this.authFacade.user$;

  constructor(
    private authFacade: AuthFacadeService,
    private spinnerFacade: SpinnerFacadeService
  ) {}

  onDelete(): void {
    this.authFacade.deleteAccount();
  }

  onSubmit(account: CreateAccountRequest): void {
    this.authFacade.createAccount(account);
  }
}
