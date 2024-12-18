import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Ingredient } from '../ingredient.model';
import { BuildService } from '../build.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ingredients',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './ingredients.component.html',
  styleUrl: './ingredients.component.css'
})
export class IngredientsComponent implements OnInit {
  ingredients = signal<Ingredient[]>([]);

  private buildService = inject(BuildService);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
      const subscription = this.buildService.getIngredients().subscribe({
        next: (res) => this.ingredients.set(res),
        error: (error) => console.log(error)
      });
      this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}