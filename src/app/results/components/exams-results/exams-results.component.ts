import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { DialogConfig, Pagination } from '../../../shared/models';
import { ConfirmationDialogService } from '../../../shared/services/confirmation-dialog.service';
import { ExamResult, Result } from '../../models';

@Component({
  selector: 'app-exams-results',
  templateUrl: './exams-results.component.html',
  styleUrls: ['./exams-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamsResultsComponent {
  private columnDefinitions = [
    { columnDef: 'exam.name', showPortrait: true },
    { columnDef: 'value', showPortrait: true },
    { columnDef: 'actions', showPortrait: true },
  ];

  @Input() examsResults!: ExamResult[];
  @Input() isHandsetPortrait!: boolean;
  @Input() pagination!: Pagination;
  @Input() result!: Result;
  @Input() sort!: Sort;

  @Output() private changePage = new EventEmitter<PageEvent>();
  @Output() private add = new EventEmitter();
  @Output() private delete = new EventEmitter<{
    id: number;
    resultId: number;
  }>();
  @Output() private edit = new EventEmitter<Result>();
  @Output() private sortEvent = new EventEmitter<Sort>();

  constructor(private confirmationDialogService: ConfirmationDialogService) {}

  deleteConfirmDialog(examResult: ExamResult): void {
    const dialogConfig: DialogConfig = {
      confirmText: 'Remove',
      content: `'${examResult.exam.name}' will be removed.`,
      title: 'Remove exam result',
    };
    this.confirmationDialogService.show(
      this.delete,
      {
        id: examResult.id,
        resultId: this.result.id,
      },
      dialogConfig
    );
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

  onEdit(row: any) {}

  sortData(sort: Sort) {
    this.sortEvent.emit(sort);
  }
}
