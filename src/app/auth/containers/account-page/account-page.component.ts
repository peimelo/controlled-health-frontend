import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SpinnerFacadeService } from '../../../core/services/spinner-facade.service';
import { PasswordCombination, User } from '../../models';
import { AuthFacadeService } from '../../services/auth-facade.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './account-page.component.html',
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
        margin: 20px;
      }
    `,
  ],
})
export class AccountPageComponent {
  pending$ = this.spinnerFacade.showSpinner$;
  user$ = this.authFacadeService.user$;

  constructor(
    private authFacadeService: AuthFacadeService,
    private spinnerFacade: SpinnerFacadeService
  ) {}

  onDelete(): void {
    this.authFacadeService.deleteAccountConfirmation();
  }

  onUpdate(user: User): void {
    this.authFacadeService.updateAccount(user);
  }

  onUpdatePassword(passwordCombination: PasswordCombination): void {
    this.authFacadeService.updatePassword(passwordCombination);
  }
}
