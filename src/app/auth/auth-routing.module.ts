import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordPageComponent } from './containers/forgot-password-page.component';
import { LoginPageComponent } from './containers/login-page.component';
import { ResendConfirmationPageComponent } from './containers/resend-confirmation-page.component';
import { ResetPasswordPageComponent } from './containers/reset-password-page.component';

const routes: Routes = [
  {
    path: 'forgot-password',
    component: ForgotPasswordPageComponent,
    data: { title: 'Forgot Password' },
  },
  {
    path: 'login',
    component: LoginPageComponent,
    data: { title: 'Login' },
  },
  {
    path: 'resend-confirmation',
    component: ResendConfirmationPageComponent,
    data: { title: 'Resend Confirmation' },
  },
  {
    path: 'reset-password',
    component: ResetPasswordPageComponent,
    data: { title: 'Reset Password' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
