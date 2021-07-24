import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Height } from '../../../shared/models';
import { HeightsFacadeService } from '../../services/heights-facade.service';

@Component({
  selector: 'app-heights-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './heights-page.component.html',
})
export class HeightsPageComponent {
  heights$ = this.heightsFacadeService.heights$;
  pagination$ = this.heightsFacadeService.pagination$;
  sort$ = this.heightsFacadeService.sort$;

  constructor(private heightsFacadeService: HeightsFacadeService) {}

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
