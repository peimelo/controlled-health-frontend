import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { DialogConfig, Pagination } from '../../../shared/models';
import { ConfirmationDialogService } from '../../../shared/services/confirmation-dialog.service';
import { DateTimeService } from '../../../shared/services/dateTime.service';
import { Result } from '../../models';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent {
  private columnDefinitions = [
    { columnDef: 'date', showPortrait: true },
    { columnDef: 'description', showPortrait: true },
    // { columnDef: 'actions', showPortrait: true },
  ];

  @Input() isHandsetPortrait!: boolean;
  @Input() pagination!: Pagination;
  @Input() sort!: Sort;
  @Input() results!: Result[];

  @Output() private changePage = new EventEmitter<PageEvent>();
  @Output() private add = new EventEmitter();
  @Output() private delete = new EventEmitter<number>();
  @Output() private edit = new EventEmitter<Result>();
  @Output() private sortEvent = new EventEmitter<Sort>();

  constructor(
    private confirmationDialogService: ConfirmationDialogService,
    private dateTimeService: DateTimeService
  ) {}

  deleteConfirmDialog(result: Result): void {
    const dialogConfig: DialogConfig = {
      confirmText: 'Remove',
      content: `'${this.dateTimeService.convertDateTimeToUtc(
        result.date
      )}' will be removed.`,
      title: 'Remove result',
    };
    this.confirmationDialogService.show(this.delete, result.id, dialogConfig);
  }

  getDisplayedColumns(): string[] {
    return this.columnDefinitions
      .filter((item) => (this.isHandsetPortrait ? item.showPortrait : true))
      .map((item) => item.columnDef);
  }

  onAdd(): void {
    this.add.emit();
  }

  onChangePage(event: PageEvent): void {
    this.changePage.emit(event);
  }

  onEdit(result: Result): void {
    this.edit.emit(result);
  }

  sortData(sort: Sort) {
    this.sortEvent.emit(sort);
  }
}
