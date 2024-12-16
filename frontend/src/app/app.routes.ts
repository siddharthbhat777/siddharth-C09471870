import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderPizzaComponent } from './order-pizza/order-pizza.component';
import { BuildPizzaComponent } from './build-pizza/build-pizza.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'order-pizza',
        component: OrderPizzaComponent,
        title: 'Order Pizza'
    },
    {
        path: 'build-pizza',
        component: BuildPizzaComponent,
        title: 'Build Pizza'
    },
    {
        path: 'cart',
        component: CartComponent,
        title: 'Cart'
    }
];