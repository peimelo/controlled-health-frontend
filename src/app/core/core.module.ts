import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { MessageComponent } from './components/message/message.component';
import { NavItemComponent } from './components/nav-item.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AppComponent } from './containers/app/app.component';
import { HomePageComponent } from './containers/home-page.component';
import { NotFoundPageComponent } from './containers/not-found-page.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import * as fromServices from './services';

export const COMPONENTS = [
  AppComponent,
  HomePageComponent,
  MessageComponent,
  NotFoundPageComponent,
  NavItemComponent,
  ToolbarComponent,
];

@NgModule({
  imports: [
    // Angular
    CommonModule,
    RouterModule,

    // app
    SharedModule,
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
  providers: [
    ...fromServices.services,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {}
