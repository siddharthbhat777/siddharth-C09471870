import { Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { ScreenLoaderComponent } from "../shared/screen-loader/screen-loader.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None,
  imports: [ScreenLoaderComponent]
})
export class HomeComponent implements OnInit {
  isLoading = signal<boolean>(false);

  get isMobile() {
    return window.innerWidth <= 768
  }

  ngOnInit(): void {
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
    }, 500);
  }
}