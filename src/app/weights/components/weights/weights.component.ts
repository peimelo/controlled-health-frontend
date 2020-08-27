import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import * as moment from 'moment';
import { DialogConfig, Pagination, Weight } from '../../models';
import { ConfirmationDialogService } from '../../services/confirmation-dialog.service';

@Component({
  selector: 'app-weights',
  templateUrl: './weights.component.html',
  styleUrls: ['./weights.component.scss'],
})
export class WeightsComponent implements OnChanges {
  columnDefinitions = [
    { columnDef: 'id', showMobile: false },
    { columnDef: 'date', showMobile: true },
    { columnDef: 'value', showMobile: true },
    { columnDef: 'range', showMobile: false },
    { columnDef: 'actions', showMobile: true },
  ];

  @Input() isHandset: boolean;
  @Input() pagination: Pagination;
  @Input() weights: Weight[];

  @Output() changePage = new EventEmitter<PageEvent>();
  @Output() create = new EventEmitter();
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<Weight>();
  @Output() weightFormDialogOpen = new EventEmitter();

  constructor(private confirmationDialogService: ConfirmationDialogService) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  deleteConfirmDialog(weight: Weight): void {
    const dialogConfig: DialogConfig = {
      confirmText: 'Remove',
      content: `'${moment
        .utc(weight.date)
        .format('DD/MM/YYYY HH:mm')}' will be removed.`,
      title: 'Remove weight',
    };
    this.confirmationDialogService.show(this.delete, weight.id, dialogConfig);
  }

  getDisplayedColumns(): string[] {
    return this.columnDefinitions
      .filter((item) => (this.isHandset ? item.showMobile : true))
      .map((item) => item.columnDef);
  }

  onChangePage(event: PageEvent): void {
    console.log('event', event);
    this.changePage.emit(event);
  }

  onCreate() {
    this.create.emit();
  }

  onEdit(weight: Weight) {
    this.edit.emit(weight);
  }

  onWeightFormDialogOpen(): void {
    this.weightFormDialogOpen.emit();
  }

  get initialRange(): number {
    const initialRange =
      (this.pagination.currentPage - 1) * this.pagination.itemsPerPage;
    return initialRange;
  }

  get finalRange(): number {
    const finalRange =
      this.pagination.currentPage * this.pagination.itemsPerPage;

    if (finalRange > this.pagination.totalItems) {
      return this.pagination.totalItems;
    }

    return finalRange;
  }
}
