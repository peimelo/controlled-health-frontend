import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { IsLoadingPipeModule } from '@service-work/is-loading';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import {
  ChangePasswordComponent,
  CreateAccountFormComponent,
  DeleteAccountComponent,
  DeleteAccountConfirmationComponent,
  ForgotPasswordFormComponent,
  LoginFormComponent,
  PersonalDataComponent,
  ResendConfirmationFormComponent,
  ResetPasswordFormComponent,
} from './componentes';
import {
  AccountPageComponent,
  CreateAccountPageComponent,
  ForgotPasswordPageComponent,
  LoginPageComponent,
  ResendConfirmationPageComponent,
  ResetPasswordPageComponent,
} from './containers';
import { AuthEffects } from './effects';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import * as fromAuth from './reducers';

@NgModule({
  declarations: [
    AccountPageComponent,
    ChangePasswordComponent,
    CreateAccountFormComponent,
    CreateAccountPageComponent,
    DeleteAccountComponent,
    DeleteAccountConfirmationComponent,
    ForgotPasswordFormComponent,
    ForgotPasswordPageComponent,
    LoginFormComponent,
    LoginPageComponent,
    PersonalDataComponent,
    ResendConfirmationFormComponent,
    ResendConfirmationPageComponent,
    ResetPasswordFormComponent,
    ResetPasswordPageComponent,
  ],
  imports: [
    // @angular
    CommonModule,
    ReactiveFormsModule,

    // @ngrx
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducers),
    EffectsModule.forFeature([AuthEffects]),

    // third-party
    FlexLayoutModule,
    IsLoadingPipeModule,

    // app
    AuthRoutingModule,
    MaterialModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class AuthModule {}
