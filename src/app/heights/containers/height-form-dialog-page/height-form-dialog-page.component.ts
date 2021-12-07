import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
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
  height!: Height;
  pending$: Observable<boolean>;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private heightFacadeService: HeightsFacadeService,
    private spinnerFacadeService: SpinnerFacadeService
  ) {
    this.height = this.data.height;
    this.pending$ = this.spinnerFacadeService.isLoading$;
  }

  onCreate(height: Height): void {
    this.heightFacadeService.create(height);
  }

  onUpdate(height: Height): void {
    this.heightFacadeService.update(height);
  }
}
