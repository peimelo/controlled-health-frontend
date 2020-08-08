import { NgModule } from '@angular/core';
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
@NgModule({
  imports: [FontAwesomeModule],
  exports: [FontAwesomeModule],
})
export class IconsModule {
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
