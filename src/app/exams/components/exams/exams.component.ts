import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { DialogData, Exam, Pagination } from '../../../core/models';
import { ConfirmationDialogService } from '../../../shared/services/confirmation-dialog.service';
import { DateTimeService } from '../../../shared/services/dateTime.service';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamsComponent {
  private columnDefinitions = [
    { columnDef: 'name', showPortrait: true },
    { columnDef: 'actions', showPortrait: true },
  ];

  @Input() exams!: Exam[];
  @Input() isHandsetPortrait!: boolean;
  @Input() pagination!: Pagination;
  @Input() sort!: Sort;

  @Output() private add = new EventEmitter();
  @Output() private changePage = new EventEmitter<PageEvent>();
  @Output() private delete = new EventEmitter<number>();
  @Output() private edit = new EventEmitter<Exam>();
  @Output() private sortEvent = new EventEmitter<Sort>();

  constructor(
    private confirmationDialogService: ConfirmationDialogService,
    private dateTimeService: DateTimeService
  ) {}

  deleteConfirmDialog(exam: Exam): void {
    const dialogData: DialogData = {
      confirmText: 'Remove',
      content: `'${this.dateTimeService.convertDateToUtcBr(
        exam.name
      )}' will be removed.`,
      title: 'Remove exam',
    };
    this.confirmationDialogService.show(this.delete, exam.id, dialogData);
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

  onEdit(exam: Exam): void {
    this.edit.emit(exam);
  }

  sortData(sort: Sort) {
    this.sortEvent.emit(sort);
  }
}
