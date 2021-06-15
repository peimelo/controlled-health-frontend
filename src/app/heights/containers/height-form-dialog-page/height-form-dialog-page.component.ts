import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from '../../../auth/models';
import { SpinnerFacadeService } from '../../../core/services/spinner-facade.service';
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
  height!: Height;
  pending$ = this.spinnerFacadeService.isLoading$;
  user$!: Observable<User>;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private heightFacadeService: HeightsFacadeService,
    private spinnerFacadeService: SpinnerFacadeService
  ) {
    this.height = this.data.height;
  }

  onCreate(height: Height): void {
    this.heightFacadeService.create(height);
  }

  onUpdate(height: Height): void {
    this.heightFacadeService.update(height);
  }
}
