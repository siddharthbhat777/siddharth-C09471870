import { Component, input } from '@angular/core';

@Component({
  selector: 'app-error-screen',
  imports: [],
  templateUrl: './error-screen.component.html',
  styleUrl: './error-screen.component.css'
})
export class ErrorScreenComponent {
  errorMessage = input.required<string>();
  errorIcon = input.required<string>();
}
