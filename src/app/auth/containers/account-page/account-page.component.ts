import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SpinnerFacadeService } from '../../../core/services/spinner-facade.service';
import { PasswordCombination, User } from '../../models';
import { AuthFacadeService } from '../../services/auth-facade.service';

@Component({
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountPageComponent {
  pending$ = this.spinnerFacadeService.isLoading$;
  user$ = this.authFacadeService.user$;

  constructor(
    private authFacadeService: AuthFacadeService,
    private spinnerFacadeService: SpinnerFacadeService
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
