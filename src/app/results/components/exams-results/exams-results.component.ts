import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { DialogData, Pagination } from '../../../shared/models';
import { ConfirmationDialogService } from '../../../shared/services/confirmation-dialog.service';
import {
  ExamGraphic,
  ExamResult,
  ExamResultDeleteEvent,
  Result,
} from '../../models';

@Component({
  selector: 'app-exams-results',
  templateUrl: './exams-results.component.html',
  styleUrls: ['./exams-results.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamsResultsComponent {
  @Input() examGraphics!: ExamGraphic[];
  @Input() examsResults!: ExamResult[];
  @Input() isHandsetPortrait!: boolean;
  @Input() pagination!: Pagination;
  @Input() result!: Result;
  @Input() sort!: Sort;

  @Output() private add = new EventEmitter();
  @Output() private changePage = new EventEmitter<PageEvent>();
  @Output() private chart = new EventEmitter<number>();
  @Output() private delete = new EventEmitter<ExamResultDeleteEvent>();
  @Output() private edit = new EventEmitter<ExamResult>();
  @Output() private sortEvent = new EventEmitter<Sort>();

  @ViewChild(MatAccordion) accordion!: MatAccordion;

  private columnDefinitions = [
    { columnDef: 'exam.name', showPortrait: true },
    { columnDef: 'value', showPortrait: true },
    { columnDef: 'actions', showPortrait: true },
  ];

  constructor(private confirmationDialogService: ConfirmationDialogService) {}

  deleteConfirmDialog(examResult: ExamResult): void {
    const dialogData: DialogData = {
      confirmText: 'Remove',
      content: `'${examResult.exam.name}' will be removed.`,
      title: 'Remove exam result',
    };

    const examResultDeleteEvent: ExamResultDeleteEvent = {
      id: examResult.id,
      resultId: this.result.id,
    };

    this.confirmationDialogService.show(
      this.delete,
      examResultDeleteEvent,
      dialogData
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

  onChart(examResult: ExamResult): void {
    this.accordion.openAll();
    this.chart.emit(examResult.exam.id);
  }

  onEdit(examResult: ExamResult) {
    this.edit.emit(examResult);
  }

  sortData(sort: Sort) {
    this.sortEvent.emit(sort);
  }
}
