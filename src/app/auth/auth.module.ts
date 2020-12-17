import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import * as fromComponents from './componentes';
import * as fromContainers from './containers';
import { AuthEffects } from './effects';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import * as fromAuth from './reducers';
import { AuthFacadeService } from './services/auth-facade.service';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [...fromContainers.containers, ...fromComponents.components],
  imports: [
    // Angular
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

    // @ngrx
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducers),
    EffectsModule.forFeature([AuthEffects]),

    // app
    AuthRoutingModule,
    SharedModule,
  ],
  providers: [
    AuthFacadeService,
    AuthService,
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
