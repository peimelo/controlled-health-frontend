import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpinnerFacadeService } from '../../core/services/spinner-facade.service';
import { Credentials } from '../models';
import { AuthFacadeService } from '../services/auth-facade.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-login-form [pending]="pending$ | async" (submitted)="onSubmit($event)">
    </app-login-form>
  `,
})
export class LoginPageComponent implements OnInit {
  pending$ = this.spinnerFacadeService.isLoading$;

  constructor(
    private authFacadeService: AuthFacadeService,
    private route: ActivatedRoute,
    private spinnerFacadeService: SpinnerFacadeService
  ) {}

  ngOnInit(): void {
    const accountConfirmationSuccess = this.route.snapshot.queryParamMap.get(
      'account_confirmation_success'
    );

    if (accountConfirmationSuccess) {
      this.authFacadeService.showConfirmationAccountMessage(
        'Your account has been successfully confirmed.'
      );
    }
  }

  onSubmit(credentials: Credentials): void {
    this.authFacadeService.login(credentials);
  }
}
