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
import { LoginComponent } from './componentes/login/login.component';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { AuthEffects } from './effects';
import * as fromInterceptors from './interceptors';
import * as fromAuth from './reducers';

@NgModule({
  declarations: [LoginPageComponent, LoginComponent],
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
