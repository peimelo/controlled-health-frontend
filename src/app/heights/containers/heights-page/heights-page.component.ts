import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { Height } from '../../../core/models';
import { Pagination } from '../../../shared/models';
import { HeightsFacadeService } from '../../services/heights-facade.service';

@Component({
  selector: 'app-heights-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './heights-page.component.html',
})
export class HeightsPageComponent {
  heights$: Observable<Height[]>;
  pagination$: Observable<Pagination>;
  sort$: Observable<Sort>;

  constructor(private heightsFacadeService: HeightsFacadeService) {
    this.heights$ = this.heightsFacadeService.heights$;
    this.pagination$ = this.heightsFacadeService.pagination$;
    this.sort$ = this.heightsFacadeService.sort$;
  }

  onAdd(): void {
    this.heightsFacadeService.add();
  }

  onChangePage(event: PageEvent): void {
    this.heightsFacadeService.changePage(event.pageIndex + 1);
  }

  onDelete(id: number): void {
    this.heightsFacadeService.delete(id);
  }

  onEdit(height: Height): void {
    this.heightsFacadeService.edit(height);
  }

  onSortEvent(sort: Sort) {
    this.heightsFacadeService.sort(sort);
  }
}
