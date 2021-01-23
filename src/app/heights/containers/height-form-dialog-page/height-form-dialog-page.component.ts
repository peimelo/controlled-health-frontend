import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from '../../../auth/models';
import { Height } from '../../../shared/models';
import { HeightsFacadeService } from '../../services/heights-facade.service';

interface DialogData {
  height: Height;
}
@Component({
  selector: 'app-height-form-dialog-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './height-form-dialog-page.component.html',
})
export class HeightFormDialogPageComponent {
  error$!: Observable<any>;
  isLoading$!: Observable<boolean>;
  user$!: Observable<User>;
  height!: Height;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private heightFacadeService: HeightsFacadeService
  ) {
    // this.error$ = this.store.pipe(select(fromHeightsSelectors.getHeightsError))
    // this.isLoading$ = this.store.pipe(select(fromHeightsSelectors.getHeightsLoading))
    // this.user$ = this.store.pipe(select(fromAuthSelectors.getUser))
    this.height = this.data.height;
  }

  onCreate(height: Height): void {
    this.heightFacadeService.createHeight(height);
  }

  onUpdate(height: Height): void {
    this.heightFacadeService.updateHeight(height);
  }
}
