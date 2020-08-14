import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpinnerFacadeService } from '../../core/services/spinner-facade.service';
import { PasswordCombination } from '../models';
import { AuthFacadeService } from '../services/auth-facade.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-reset-password-form
      [pending]="pending$ | async"
      (submitted)="onSubmit($event)"
    >
    </app-reset-password-form>
  `,
})
export class ResetPasswordPageComponent implements OnInit {
  pending$ = this.spinnerFacade.showSpinner$;

  constructor(
    private authFacade: AuthFacadeService,
    private route: ActivatedRoute,
    private spinnerFacade: SpinnerFacadeService
  ) {}

  ngOnInit(): void {
    const accessToken = this.route.snapshot.queryParamMap.get('access-token');
    const client = this.route.snapshot.queryParamMap.get('client');
    const uid = this.route.snapshot.queryParamMap.get('uid');

    if (accessToken && client && uid) {
      localStorage.setItem('access-token', accessToken);
      localStorage.setItem('client', client);
      localStorage.setItem('uid', uid);
    }
  }

  onSubmit(passwordCombination: PasswordCombination): void {
    this.authFacade.resetPassword(passwordCombination);
  }
}
