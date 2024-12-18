import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Ingredient } from './ingredient.model';
import { AuthService } from '../auth/auth.service';
import { map, Observable } from 'rxjs';

@Injectable()
export class BuildService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<{ ingredients: Ingredient[] }>('http://localhost:8001/build/ingredients', {
      headers: {
        'Authorization': `Bearer ${this.authService.token}`
      }
    }).pipe(
      map((res) => res.ingredients)
    );
  }
}