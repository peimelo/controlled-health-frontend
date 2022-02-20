import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { Pagination, Weight } from '../../../core/models';
import { LayoutFacadeService } from '../../../core/services';
import { WeightsFacadeService } from '../../services/weights-facade.service';

@Component({
  selector: 'app-weights-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './weights-page.component.html',
})
export class WeightsPageComponent {
  isHandsetPortrait$: Observable<boolean>;
  pagination$: Observable<Pagination>;
  sort$: Observable<Sort>;
  weights$: Observable<Weight[]>;

  constructor(
    private layoutFacadeService: LayoutFacadeService,
    private weightsFacadeService: WeightsFacadeService
  ) {
    this.isHandsetPortrait$ = this.layoutFacadeService.isHandsetPortrait$;
    this.pagination$ = this.weightsFacadeService.pagination$;
    this.sort$ = this.weightsFacadeService.sort$;
    this.weights$ = this.weightsFacadeService.weights$;
  }

  onAdd(): void {
    this.weightsFacadeService.add();
  }

  onChangePage(event: PageEvent): void {
    this.weightsFacadeService.changePage(event.pageIndex + 1);
  }

  onDelete(id: number): void {
    this.weightsFacadeService.delete(id);
  }

  onEdit(weight: Weight): void {
    this.weightsFacadeService.edit(weight);
  }

  onSortEvent(sort: Sort) {
    this.weightsFacadeService.sort(sort);
  }
}
