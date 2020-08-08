import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthRoutingModule } from './auth-routing.module';
import { CreateAccountFormComponent } from './componentes/create-account-form/create-account-form.component';
import { ForgotPasswordFormComponent } from './componentes/forgot-password-form/forgot-password-form.component';
import { LoginFormComponent } from './componentes/login-form/login-form.component';
import { ResendConfirmationFormComponent } from './componentes/resend-confirmation-form/resend-confirmation-form.component';
import { ResetPasswordFormComponent } from './componentes/reset-password-form/reset-password-form.component';
import { CreateAccountPageComponent } from './containers/create-account-page.component';
import { ForgotPasswordPageComponent } from './containers/forgot-password-page.component';
import { LoginPageComponent } from './containers/login-page.component';
import { ResendConfirmationPageComponent } from './containers/resend-confirmation-page.component';
import { ResetPasswordPageComponent } from './containers/reset-password-page.component';
import { AuthEffects } from './effects';
import * as fromInterceptors from './interceptors';
import * as fromAuth from './reducers';

@NgModule({
  declarations: [
    CreateAccountFormComponent,
    CreateAccountPageComponent,
    ForgotPasswordFormComponent,
    ForgotPasswordPageComponent,
    LoginFormComponent,
    LoginPageComponent,
    ResendConfirmationFormComponent,
    ResendConfirmationPageComponent,
    ResetPasswordFormComponent,
    ResetPasswordPageComponent,
  ],
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    // Material
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatProgressBarModule,

    // @ngrx
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducers),
    EffectsModule.forFeature([AuthEffects]),

    // App
    AuthRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: fromInterceptors.AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: fromInterceptors.TokenInterceptor,
      multi: true,
    },
  ],
})
export class AuthModule {}
