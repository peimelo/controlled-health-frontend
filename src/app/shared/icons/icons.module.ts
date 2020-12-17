import { NgModule } from '@angular/core';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faBars,
  faCheck,
  faHome,
  faPencilAlt,
  faPlus,
  faSignInAlt,
  faSignOutAlt,
  faSpinner,
  faTachometerAlt,
  faTimes,
  faTrashAlt,
  faUserCircle,
  faUserPlus,
  faWeight,
} from '@fortawesome/free-solid-svg-icons';

@NgModule({
  imports: [FontAwesomeModule],
  exports: [FontAwesomeModule],
})
export class IconsModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(
      faBars,
      faCheck,
      faHome,
      faPencilAlt,
      faPlus,
      faSignInAlt,
      faSignOutAlt,
      faSpinner,
      faTachometerAlt,
      faTimes,
      faTrashAlt,
      faUserCircle,
      faUserPlus,
      faWeight
    );
  }
}
