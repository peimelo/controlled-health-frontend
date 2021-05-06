import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Pagination } from '../../../shared/models';
import { ConfirmationDialogService } from '../../../shared/services/confirmation-dialog.service';
import { DateTimeService } from '../../../shared/services/dateTime.service';
import { ExamResult, Result } from '../../models';

@Component({
  selector: 'app-exams-results',
  templateUrl: './exams-results.component.html',
  styleUrls: ['./exams-results.component.scss'],
})
export class ExamsResultsComponent {
  private columnDefinitions = [
    { columnDef: 'exam.name', showPortrait: true },
    { columnDef: 'value', showPortrait: true },
  ];

  @Input() isHandsetPortrait!: boolean;
  @Input() pagination!: Pagination;
  @Input() sort!: Sort;
  @Input() examsResults!: ExamResult[];

  @Output() private changePage = new EventEmitter<PageEvent>();
  @Output() private add = new EventEmitter();
  @Output() private delete = new EventEmitter<number>();
  @Output() private edit = new EventEmitter<Result>();
  @Output() private sortEvent = new EventEmitter<Sort>();

  constructor(
    private confirmationDialogService: ConfirmationDialogService,
    private dateTimeService: DateTimeService
  ) {}

  getDisplayedColumns(): string[] {
    return this.columnDefinitions
      .filter((item) => (this.isHandsetPortrait ? item.showPortrait : true))
      .map((item) => item.columnDef);
  }

  sortData(sort: Sort) {
    this.sortEvent.emit(sort);
  }
}
