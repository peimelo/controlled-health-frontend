import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { LayoutFacadeService } from '../../../core/services/layout-facade.service';
import { Weight } from '../../../shared/models';
import { WeightsFacadeService } from '../../services/weights-facade.service';

@Component({
  selector: 'app-weights-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './weights-page.component.html',
})
export class WeightsPageComponent implements OnInit {
  isHandsetPortrait$ = this.layoutFacadeService.isHandsetPortrait$;
  pagination$ = this.weightsFacadeService.pagination$;
  sort$ = this.weightsFacadeService.sort$;
  weights$: Observable<Weight[]>;

  constructor(
    private layoutFacadeService: LayoutFacadeService,
    private weightsFacadeService: WeightsFacadeService
  ) {
    this.weights$ = this.weightsFacadeService.weights$;
  }

  ngOnInit(): void {
    this.weightsFacadeService.loadWeights();
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

  onSortEvent(sort: Sort) {
    this.weightsFacadeService.sortWeights(sort);
  }
}
