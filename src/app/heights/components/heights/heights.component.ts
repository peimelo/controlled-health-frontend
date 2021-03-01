import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { DialogConfig, Height, Pagination } from '../../../shared/models';
import { ConfirmationDialogService } from '../../../shared/services/confirmation-dialog.service';
import { DateTimeService } from '../../../shared/services/dateTime.service';

@Component({
  selector: 'app-heights',
  templateUrl: './heights.component.html',
  styleUrls: ['./heights.component.scss'],
})
export class HeightsComponent {
  columnDefinitions = ['date', 'value', 'actions'];

  @Input() pagination!: Pagination;
  @Input() sort!: Sort;
  @Input() heights!: Height[];

  @Output() private changePage = new EventEmitter<PageEvent>();
  @Output() private add = new EventEmitter();
  @Output() private delete = new EventEmitter<number>();
  @Output() private edit = new EventEmitter<Height>();
  @Output() private sortEvent = new EventEmitter<Sort>();

  constructor(
    private confirmationDialogService: ConfirmationDialogService,
    private dateTimeService: DateTimeService
  ) {}

  deleteConfirmDialog(height: Height): void {
    const dialogConfig: DialogConfig = {
      confirmText: 'Remove',
      content: `'${this.dateTimeService.convertDateToUtcBr(
        height.date
      )}' will be removed.`,
      title: 'Remove height',
    };
    this.confirmationDialogService.show(this.delete, height.id, dialogConfig);
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

  sortData(sort: Sort) {
    this.sortEvent.emit(sort);
  }
}
