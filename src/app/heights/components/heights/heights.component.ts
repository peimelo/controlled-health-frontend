import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import * as moment from 'moment';
import { DialogConfig, Height, Pagination } from '../../../shared/models';
import { ConfirmationDialogService } from '../../../shared/services/confirmation-dialog.service';
import { PaginationService } from '../../../shared/services/pagination.service';

@Component({
  selector: 'app-heights',
  templateUrl: './heights.component.html',
  styleUrls: ['./heights.component.scss'],
})
export class HeightsComponent {
  columnDefinitions = [
    { columnDef: 'date', showMobile: true },
    { columnDef: 'value', showMobile: true },
    { columnDef: 'actions', showMobile: true },
  ];

  sort: Sort = {
    active: 'date',
    direction: 'desc',
  };

  @Input() isHandset!: boolean;
  @Input() pagination!: Pagination;
  @Input() heights!: Height[];

  @Output() private changePage = new EventEmitter<PageEvent>();
  @Output() private add = new EventEmitter();
  @Output() private delete = new EventEmitter<number>();
  @Output() private edit = new EventEmitter<Height>();

  constructor(
    private confirmationDialogService: ConfirmationDialogService,
    private paginationService: PaginationService
  ) {}

  deleteConfirmDialog(height: Height): void {
    const dialogConfig: DialogConfig = {
      confirmText: 'Remove',
      content: `'${moment
        .utc(height.date)
        .format('DD/MM/YYYY HH:mm')}' will be removed.`,
      title: 'Remove height',
    };
    this.confirmationDialogService.show(this.delete, height.id, dialogConfig);
  }

  getDisplayedColumns(): string[] {
    return this.columnDefinitions
      .filter((item) => (this.isHandset ? item.showMobile : true))
      .map((item) => item.columnDef);
  }

  onAdd(): void {
    this.add.emit();
  }

  onChangePage(event: PageEvent): void {
    this.changePage.emit(event);
  }

  onEdit(height: Height): void {
    this.edit.emit(height);
  }

  get initialRange(): number {
    return this.paginationService.initialRange(this.pagination);
  }

  get finalRange(): number {
    return this.paginationService.finalRange(this.pagination);
  }
}
