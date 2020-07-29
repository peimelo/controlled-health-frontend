import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { LayoutComponent } from './components/layout.component';
import { NavItemComponent } from './components/nav-item.component';
import { SidenavComponent } from './components/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AppComponent } from './containers/app/app.component';

export const COMPONENTS = [
  AppComponent,
  // NotFoundPageComponent,
  LayoutComponent,
  NavItemComponent,
  SidenavComponent,
  ToolbarComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    // SharedModule,
    // RouterModule,
    // StoreModule.forFeature('core', reducers),
    // EffectsModule.forFeature(effects),
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
  // providers: [
  //   ...fromServices.services,
  //   { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  //   { provide: ErrorHandler, useClass: AppErrorHandlerService },
  // ],
})
export class CoreModule {}
