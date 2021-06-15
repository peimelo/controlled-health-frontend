import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
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
  weights$ = this.weightsFacadeService.weights$;

  constructor(
    private layoutFacadeService: LayoutFacadeService,
    private weightsFacadeService: WeightsFacadeService
  ) {}

  ngOnInit(): void {
    this.weightsFacadeService.load();
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
