import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ExtraOptionsComponent } from "./extra-options/extra-options.component";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, ExtraOptionsComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  toggleExtraOptions = signal<boolean>(false);

  closeOptions() {
    this.toggleExtraOptions.set(false);
  }
}
