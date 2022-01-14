import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './components/home/home.component';
import { MessageComponent } from './components/message/message.component';
import { NavItemComponent } from './components/nav-item.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AppComponent } from './containers/app/app.component';
import { HomePageComponent } from './containers/home/home-page.component';
import { NotFoundPageComponent } from './containers/not-found-page.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';

export const COMPONENTS = [
  AppComponent,
  HomePageComponent,
  HomeComponent,
  MessageComponent,
  NotFoundPageComponent,
  NavItemComponent,
  ToolbarComponent,
];

@NgModule({
  imports: [
    // Angular
    RouterModule,

    // app
    SharedModule,
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule has already been loaded. Import this module in the AppModule only.'
      );
    }
  }
}
