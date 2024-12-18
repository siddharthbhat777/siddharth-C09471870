import { Routes } from "@angular/router";
import { IngredientsComponent } from "./ingredients/ingredients.component";
import { SelectPizzaComponent } from "./select-pizza/select-pizza.component";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'select-pizza',
        pathMatch: 'full'
    },
    {
        path: 'select-pizza',
        component: SelectPizzaComponent
    },
    {
        path: 'ingredients/:pizzaId',
        component: IngredientsComponent
    }
];