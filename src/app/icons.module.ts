import { NgModule } from '@angular/core';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faSignInAlt,
  faSignOutAlt,
  faSpinner,
  faTachometerAlt,
  faWeight,
} from '@fortawesome/pro-solid-svg-icons';

@NgModule({
  imports: [FontAwesomeModule],
  exports: [FontAwesomeModule],
})
export class IconsModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faSignInAlt,
      faSignOutAlt,
      faSpinner,
      faTachometerAlt,
      faWeight
    );
  }
}
