import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { IsLoadingPipeModule } from '@service-work/is-loading';
import { IconsModule } from '../icons/icons.module';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from './components/home/home.component';
import { MessageComponent } from './components/message/message.component';
import { NavItemComponent } from './components/nav-item.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AppComponent } from './containers/app/app.component';
import { HomePageComponent } from './containers/home/home-page.component';
import { NotFoundPageComponent } from './containers/not-found-page.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';

const CORE_COMPONENTS = [
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
    // @angular
    CommonModule,
    RouterModule,

    // third-party
    FlexLayoutModule,
    IsLoadingPipeModule,

    // app
    IconsModule,
    MaterialModule,
  ],
  declarations: [CORE_COMPONENTS],
  exports: [CORE_COMPONENTS],
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
