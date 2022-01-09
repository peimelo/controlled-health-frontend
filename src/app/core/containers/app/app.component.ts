import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountsFacadeService } from '../../../accounts/services/accounts-facade.service';
import { AuthFacadeService } from '../../../auth/services/auth-facade.service';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  accountListLoaded$: Observable<boolean>;
  accountSelectedLoaded$: Observable<boolean>;
  loggedIn$: Observable<boolean>;
  user$: Observable<any>;

  constructor(
    private authFacadeService: AuthFacadeService,
    private accountFacadeService: AccountsFacadeService
  ) {
    this.accountListLoaded$ = this.accountFacadeService.selectListLoaded$;
    this.accountSelectedLoaded$ = this.accountFacadeService.selectedLoaded$;
    this.loggedIn$ = this.authFacadeService.loggedIn$;
    this.user$ = this.authFacadeService.user$;
  }

  logout(): void {
    this.authFacadeService.logout();
  }
}
