import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountFormDialogComponent } from './components/account-form-dialog/account-form-dialog.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { AccountFormDialogPageComponent } from './containers/account-form-dialog-page/account-form-dialog-page.component';
import { AccountsPageComponent } from './containers/accounts-page/accounts-page.component';
import { AccountsEffects } from './effects/accounts.effects';
import * as fromAccount from './reducers';
import { AccountsFacadeService } from './services/accounts-facade.service';
import { AccountsService } from './services/accounts.service';

@NgModule({
  imports: [
    // @ngrx
    StoreModule.forFeature(
      fromAccount.accountsFeatureKey,
      fromAccount.reducers
    ),
    EffectsModule.forFeature([AccountsEffects]),

    AccountsRoutingModule,
    SharedModule,
  ],
  declarations: [
    AccountsPageComponent,
    AccountsComponent,
    AccountFormDialogComponent,
    AccountFormDialogPageComponent,
  ],
  providers: [AccountsService, AccountsFacadeService],
})
export class AccountsModule {}
