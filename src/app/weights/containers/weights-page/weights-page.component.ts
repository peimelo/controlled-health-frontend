import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { LayoutFacadeService } from '../../../core/services/layout-facade.service';
import { Weight } from '../../../shared/models';
import { WeightsFacadeService } from '../../services/weights-facade.service';

@Component({
  selector: 'app-weights-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './weights-page.component.html',
})
export class WeightsPageComponent {
  isHandset$ = this.layoutFacadeService.isHandset$;
  pagination$ = this.weightsFacadeService.pagination$;
  weights$: Observable<Weight[]>;

  constructor(
    private layoutFacadeService: LayoutFacadeService,
    private weightsFacadeService: WeightsFacadeService
  ) {
    this.weights$ = this.weightsFacadeService.weights$;
  }

  onAdd(): void {
    this.weightsFacadeService.addWeight();
  }

  onChangePage(event: PageEvent): void {
    this.weightsFacadeService.changePageWeights(event.pageIndex + 1);
  }

  onDelete(id: number): void {
    this.weightsFacadeService.deleteWeight(id);
  }

  onEdit(weight: Weight): void {
    this.weightsFacadeService.editWeight(weight);
  }
}
