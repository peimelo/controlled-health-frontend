import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as fromContainers from './containers';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'account',
    component: fromContainers.AccountPageComponent,
    data: { title: 'Account Settings' },
    canActivate: [AuthGuard],
  },
  {
    path: 'create-account',
    component: fromContainers.CreateAccountPageComponent,
    data: { title: 'Create an Account' },
  },
  {
    path: 'forgot-password',
    component: fromContainers.ForgotPasswordPageComponent,
    data: { title: 'Forgot Password' },
  },
  {
    path: 'login',
    component: fromContainers.LoginPageComponent,
    data: { title: 'Login' },
  },
  {
    path: 'resend-confirmation',
    component: fromContainers.ResendConfirmationPageComponent,
    data: { title: 'Resend Confirmation' },
  },
  {
    path: 'reset-password',
    component: fromContainers.ResetPasswordPageComponent,
    data: { title: 'Reset Password' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
