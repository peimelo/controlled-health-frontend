import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../../../accounts/models';
import { AccountsFacadeService } from '../../../accounts/services/accounts-facade.service';
import { AuthFacadeService } from '../../../auth/services/auth-facade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  accountListLoaded$: Observable<boolean>;
  accountSelected$: Observable<Account | null>;
  accountSelectedLoaded$: Observable<boolean>;
  loggedIn$: Observable<boolean>;
  user$: Observable<any>;

  constructor(
    private authFacadeService: AuthFacadeService,
    private accountsFacadeService: AccountsFacadeService
  ) {
    this.accountListLoaded$ = this.accountsFacadeService.selectListLoaded$;
    this.accountSelected$ = this.accountsFacadeService.selected$;
    this.accountSelectedLoaded$ = this.accountsFacadeService.selectedLoaded$;
    this.loggedIn$ = this.authFacadeService.loggedIn$;
    this.user$ = this.authFacadeService.user$;
  }

  logout(): void {
    this.authFacadeService.logout();
  }
}
