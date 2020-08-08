import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LayoutFacadeService } from '../../../core/services/layout-facade.service';
import { PasswordCombination } from '../../models';
import { AuthFacadeService } from '../../services/auth-facade.service';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
})
export class ResetPasswordPageComponent implements OnInit {
  pending$ = this.layoutFacade.isSpinnerLoading$;

  constructor(
    private authFacade: AuthFacadeService,
    private layoutFacade: LayoutFacadeService,
    private route: ActivatedRoute
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
