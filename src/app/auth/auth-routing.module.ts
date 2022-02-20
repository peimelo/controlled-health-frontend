import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AccountPageComponent,
  CreateAccountPageComponent,
  ForgotPasswordPageComponent,
  LoginPageComponent,
  ResendConfirmationPageComponent,
  ResetPasswordPageComponent,
} from './containers';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'account',
    component: AccountPageComponent,
    data: { title: 'Account Settings' },
    canActivate: [AuthGuard],
  },
  {
    path: 'create-account',
    component: CreateAccountPageComponent,
    data: { title: 'Create an Account' },
  },
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
