import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faBars,
  faSignInAlt,
  faSignOutAlt,
  faSpinner,
  faTachometerAlt,
  faUserCircle,
  faUserPlus,
  faWeight,
} from '@fortawesome/pro-solid-svg-icons';
import { NavItemComponent } from './components/nav-item.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { AppComponent } from './containers/app/app.component';
import { HomePageComponent } from './containers/home-page.component';
import { NotFoundPageComponent } from './containers/not-found-page.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';

export const COMPONENTS = [
  AppComponent,
  HomePageComponent,
  NotFoundPageComponent,
  NavItemComponent,
  ToolbarComponent,
];

@NgModule({
  imports: [
    // Angular
    CommonModule,
    RouterModule,

    // Material
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTooltipModule,

    // Icons
    FontAwesomeModule,
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
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faBars,
      faSignInAlt,
      faSignOutAlt,
      faSpinner,
      faTachometerAlt,
      faUserCircle,
      faUserPlus,
      faWeight
    );
  }
}
