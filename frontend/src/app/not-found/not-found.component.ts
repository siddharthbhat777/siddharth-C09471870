import { Component } from '@angular/core';
import { ErrorScreenComponent } from "../shared/error-screen/error-screen.component";

@Component({
  selector: 'app-not-found',
  imports: [ErrorScreenComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

}
