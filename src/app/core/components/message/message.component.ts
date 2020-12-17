import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

interface Data {
  message: string;
  type: 'success' | 'error';
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
})
export class MessageComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: Data) {}
}
