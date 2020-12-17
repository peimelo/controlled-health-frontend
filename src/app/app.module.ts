import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { AppComponent } from './core/containers/app/app.component';
import { CoreModule } from './core/core.module';
import { MessageEffects, RouterEffects, UserEffects } from './core/effects';
import { metaReducers, ROOT_REDUCERS } from './reducers';

registerLocaleData(localePt, 'pt');

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  imports: [
    // Angular
    BrowserModule,
    BrowserAnimationsModule,

    // @ngrx
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      name: 'Controlled Health App',
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([MessageEffects, RouterEffects, UserEffects]),

    // third-party
    NgxMaskModule.forRoot(maskConfig),

    // app
    AuthModule,
    CoreModule,
    AppRoutingModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
