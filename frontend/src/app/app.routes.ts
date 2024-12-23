import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderPizzaComponent } from './order-pizza/order-pizza.component';
import { BuildPizzaComponent } from './build-pizza/build-pizza.component';
import { CartComponent } from './cart/cart.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { routes as buildRoutes } from './build-pizza/build.routes';
import { ProfileComponent } from './profile/profile.component';
import { HistoryComponent } from './history/history.component';
import { OrderSuccessfulComponent } from './order-successful/order-successful.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'order-pizza',
        component: OrderPizzaComponent,
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
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
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuardService],
        title: 'Profile'
    },
    {
        path: 'history',
        component: HistoryComponent,
        canActivate: [AuthGuardService],
        title: 'Order history'
    },
    {
        path: 'order-successful',
        component: OrderSuccessfulComponent,
        canActivate: [AuthGuardService],
        title: 'Order Successful'
    },
    {
        path: '**',
        component: NotFoundComponent,
        title: 'Page not found'
    }
];