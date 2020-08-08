import { Component } from '@angular/core';
import { LayoutFacadeService } from '../../../core/services/layout-facade.service';
import { AuthFacadeService } from '../../services/auth-facade.service';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
})
export class ForgotPasswordPageComponent {
  pending$ = this.layoutFacade.isSpinnerLoading$;

  constructor(
    private authFacade: AuthFacadeService,
    private layoutFacade: LayoutFacadeService
  ) {}

  onSubmit(email: string): void {
    this.authFacade.forgotPassword(email);
  }
}
