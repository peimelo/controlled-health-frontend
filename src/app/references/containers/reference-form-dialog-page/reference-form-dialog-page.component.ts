import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Reference } from '../../../core/models';
import { SpinnerFacadeService } from '../../../core/services/spinner-facade.service';
import { ReferencesFacadeService } from '../../services/references-facade.service';

interface DialogData {
  reference: Reference;
}
@Component({
  selector: 'app-reference-form-dialog-page',
  templateUrl: './reference-form-dialog-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReferenceFormDialogPageComponent {
  reference!: Reference;
  pending$: Observable<boolean>;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private referenceFacadeService: ReferencesFacadeService,
    private spinnerFacadeService: SpinnerFacadeService
  ) {
    this.reference = this.data.reference;
    this.pending$ = this.spinnerFacadeService.isLoading$;
  }

  onCreate(reference: Reference): void {
    this.referenceFacadeService.create(reference);
  }

  onUpdate(reference: Reference): void {
    this.referenceFacadeService.update(reference);
  }
}
