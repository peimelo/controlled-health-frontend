import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Credentials } from '../../models';
import { AuthFacadeService } from '../../services/auth-facade.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  errorMessages$ = this.authFacade.errorMessages$;
  isLoading$: Observable<boolean>;

  constructor(private authFacade: AuthFacadeService) {
    // this.isLoading$ = this.store.pipe(select(fromAuthSelectors.getIsLoading));
  }

  onSubmit(credentials: Credentials): void {
    this.authFacade.login(credentials);
  }
}
