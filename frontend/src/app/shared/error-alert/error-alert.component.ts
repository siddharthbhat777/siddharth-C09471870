import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-error-alert',
  templateUrl: './error-alert.component.html',
  styleUrl: './error-alert.component.css'
})
export class ErrorAlertComponent {
  heading = input.required<string>();
  description = input.required<string>();
  close = output();

  closeAlert() {
    this.close.emit();
  }
}