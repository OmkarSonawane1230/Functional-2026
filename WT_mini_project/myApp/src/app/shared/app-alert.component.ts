import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="alert" [ngClass]="'alert-' + type" *ngIf="message">
      <span class="material-icons">{{type === "success" ? "check_circle" : "error"}}</span>
      <div>{{message}}</div>
    </div>
  `
})
export class AppAlertComponent {
  @Input() type: string = 'info';
  @Input() message: string = '';
}
