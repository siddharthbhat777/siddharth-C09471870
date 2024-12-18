import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderPizzaComponent } from './order-pizza/order-pizza.component';
import { BuildPizzaComponent } from './build-pizza/build-pizza.component';
import { CartComponent } from './cart/cart.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { routes as buildRoutes } from './build-pizza/build.routes';

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
        children: buildRoutes,
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