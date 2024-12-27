import { Component, input } from '@angular/core';

@Component({
  selector: 'app-error-screen',
  templateUrl: './error-screen.component.html',
  styleUrl: './error-screen.component.css'
})
export class ErrorScreenComponent {
  errorMessage = input.required<string>();
}