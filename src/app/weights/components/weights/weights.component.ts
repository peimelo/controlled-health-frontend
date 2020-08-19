import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import * as moment from 'moment';
import { DialogConfig, Pagination, Weight } from '../../models';
import { ConfirmationDialogService } from '../../services/confirmation-dialog.service';

@Component({
  selector: 'app-weights',
  templateUrl: './weights.component.html',
  styleUrls: ['./weights.component.scss'],
})
export class WeightsComponent {
  columnDefinitions = [
    { columnDef: 'id', showMobile: false },
    { columnDef: 'date', showMobile: true },
    { columnDef: 'height', showMobile: false },
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
    this.changePage.emit(event);
  }

  onCreate() {
    this.create.emit();
  }

  onEdit(weight: Weight) {
    this.edit.emit(weight);
  }

  onWeightFormDialogOpen() {
    this.weightFormDialogOpen.emit();
  }

  initialRange(): number {
    return (this.pagination.currentPage - 1) * this.pagination.itemsPerPage;
  }

  finalRange(): number {
    const valor = this.pagination.currentPage * this.pagination.itemsPerPage;

    if (valor > this.pagination.totalItems) {
      return this.pagination.totalItems;
    }

    return valor;
  }
}
