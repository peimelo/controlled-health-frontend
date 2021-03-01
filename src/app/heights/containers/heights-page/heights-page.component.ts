import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { Height } from '../../../shared/models';
import { HeightsFacadeService } from '../../services/heights-facade.service';

@Component({
  selector: 'app-heights-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './heights-page.component.html',
})
export class HeightsPageComponent implements OnInit {
  pagination$ = this.heightsFacadeService.pagination$;
  sort$ = this.heightsFacadeService.sort$;
  heights$: Observable<Height[]>;

  constructor(private heightsFacadeService: HeightsFacadeService) {
    this.heights$ = this.heightsFacadeService.heights$;
  }

  ngOnInit(): void {
    this.heightsFacadeService.loadHeights();
  }

  onAdd(): void {
    this.heightsFacadeService.addHeight();
  }

  onChangePage(event: PageEvent): void {
    this.heightsFacadeService.changePageHeights(event.pageIndex + 1);
  }

  onDelete(id: number): void {
    this.heightsFacadeService.deleteHeight(id);
  }

  onEdit(height: Height): void {
    this.heightsFacadeService.editHeight(height);
  }

  onSortEvent(sort: Sort) {
    this.heightsFacadeService.sortWeights(sort);
  }
}
