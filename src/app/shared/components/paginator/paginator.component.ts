import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Pagination } from '../../../core/models';

@Component({
  selector: 'app-paginator',
  templateUrl: 'paginator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {
  @Input() pagination!: Pagination;

  @Output() page = new EventEmitter<PageEvent>();

  onChangePage(event: PageEvent) {
    this.page.emit(event);
  }
}
