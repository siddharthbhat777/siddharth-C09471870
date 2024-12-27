import { Routes } from "@angular/router";
import { IngredientsComponent } from "./ingredients/ingredients.component";
import { SelectPizzaComponent } from "./select-pizza/select-pizza.component";
import { AuthGuardService } from "../auth/auth-guard.service";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'select-pizza',
        pathMatch: 'full'
    },
    {
        path: 'select-pizza',
        canActivate: [AuthGuardService],
        component: SelectPizzaComponent
    },
    {
        path: 'ingredients/:pizzaId',
        canActivate: [AuthGuardService],
        component: IngredientsComponent
    }
];