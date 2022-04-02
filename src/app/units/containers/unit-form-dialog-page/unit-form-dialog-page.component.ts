import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Unit } from '../../../core/models';
import { SpinnerFacadeService } from '../../../core/services/spinner-facade.service';
import { UnitsFacadeService } from '../../services/units-facade.service';

interface DialogData {
  unit: Unit;
}
@Component({
  selector: 'app-unit-form-dialog-page',
  templateUrl: './unit-form-dialog-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitFormDialogPageComponent {
  unit!: Unit;
  pending$: Observable<boolean>;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private unitFacadeService: UnitsFacadeService,
    private spinnerFacadeService: SpinnerFacadeService
  ) {
    this.unit = this.data.unit;
    this.pending$ = this.spinnerFacadeService.isLoading$;
  }

  onCreate(unit: Unit): void {
    this.unitFacadeService.create(unit);
  }

  onUpdate(unit: Unit): void {
    this.unitFacadeService.update(unit);
  }
}
