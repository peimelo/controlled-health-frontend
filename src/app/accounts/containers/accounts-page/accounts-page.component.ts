import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../../models';
import { AccountsFacadeService } from '../../services/accounts-facade.service';

@Component({
  selector: 'app-accounts-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './accounts-page.component.html',
})
export class AccountsPageComponent implements OnInit {
  accounts$: Observable<Account[]>;
  accountSelected$: Observable<Account | null>;
  accountSelectedLoaded$: Observable<boolean>;

  constructor(private accountsFacadeService: AccountsFacadeService) {
    this.accounts$ = this.accountsFacadeService.accounts$;
    this.accountSelected$ = this.accountsFacadeService.selected$;
    this.accountSelectedLoaded$ = this.accountsFacadeService.selectedLoaded$;
  }

  ngOnInit(): void {
    this.getAccountSelected();
  }

  getAccountSelected(): void {
    const account = localStorage.getItem('account');

    if (!!account) {
      this.accountsFacadeService.loadAccount(+account);
    }
  }

  onAdd(): void {
    this.accountsFacadeService.add();
  }

  onEdit(account: Account): void {
    this.accountsFacadeService.edit(account);
  }

  onEnter(account: Account): void {
    this.accountsFacadeService.loadAccountFromPage(account);
  }
}
