import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BuildService } from './build.service';

@Component({
  selector: 'app-build-pizza',
  imports: [RouterOutlet],
  templateUrl: './build-pizza.component.html',
  providers: [BuildService]
})
export class BuildPizzaComponent { }