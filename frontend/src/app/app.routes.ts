import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderPizzaComponent } from './order-pizza/order-pizza.component';
import { BuildPizzaComponent } from './build-pizza/build-pizza.component';
import { CartComponent } from './cart/cart.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'order-pizza',
        component: OrderPizzaComponent,
        canActivate: [AuthGuardService],
        title: 'Order Pizza'
    },
    {
        path: 'build-pizza',
        component: BuildPizzaComponent,
        canActivate: [AuthGuardService],
        title: 'Build Pizza'
    },
    {
        path: 'cart',
        component: CartComponent,
        canActivate: [AuthGuardService],
        title: 'Cart'
    },
    {
        path: '**',
        component: NotFoundComponent,
        title: 'Page not found'
    }
];