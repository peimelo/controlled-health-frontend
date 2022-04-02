import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { Pagination, Unit } from '../../../core/models';
import { UnitsFacadeService } from '../../services/units-facade.service';

@Component({
  selector: 'app-units-page',
  templateUrl: './units-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitsPageComponent {
  units$: Observable<Unit[]>;
  pagination$: Observable<Pagination>;
  sort$: Observable<Sort>;

  constructor(private unitsFacadeService: UnitsFacadeService) {
    this.units$ = this.unitsFacadeService.units$;
    this.pagination$ = this.unitsFacadeService.pagination$;
    this.sort$ = this.unitsFacadeService.sort$;
  }

  onAdd(): void {
    this.unitsFacadeService.add();
  }

  onChangePage(event: PageEvent): void {
    this.unitsFacadeService.changePage(event.pageIndex + 1);
  }

  onDelete(id: number): void {
    this.unitsFacadeService.delete(id);
  }

  onEdit(unit: Unit): void {
    this.unitsFacadeService.edit(unit);
  }

  onSortEvent(sort: Sort) {
    this.unitsFacadeService.sort(sort);
  }
}
