import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { SpinnerFacadeService } from '../../../core/services/spinner-facade.service';
import { Account } from '../../models';
import { AccountsFacadeService } from '../../services/accounts-facade.service';

interface DialogData {
  account: Account;
}
@Component({
  selector: 'app-account-form-dialog-page',
  templateUrl: './account-form-dialog-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountFormDialogPageComponent {
  account!: Account;
  pending$: Observable<boolean>;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private accountFacadeService: AccountsFacadeService,
    private spinnerFacadeService: SpinnerFacadeService
  ) {
    this.account = this.data.account;
    this.pending$ = this.spinnerFacadeService.isLoading$;
  }

  onCreate(account: Account): void {
    this.accountFacadeService.create(account);
  }

  onUpdate(account: Account): void {
    this.accountFacadeService.update(account);
  }
}
