import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Pagination } from '../../models';

@Component({
  selector: 'app-paginator',
  templateUrl: 'paginator.component.html',
})
export class PaginatorComponent {
  @Input() pagination!: Pagination;

  @Output() page = new EventEmitter<PageEvent>();

  onChangePage(event: PageEvent) {
    this.page.emit(event);
  }
}
