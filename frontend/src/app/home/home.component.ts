import { Component } from '@angular/core';
import { FooterComponent } from "../shared/footer/footer.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [FooterComponent]
})
export class HomeComponent {
  get isMobile() {
    return window.innerWidth <= 768
  }
}
