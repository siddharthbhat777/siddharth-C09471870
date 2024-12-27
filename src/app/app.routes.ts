import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
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
        loadComponent: () => import('./order-pizza/order-pizza.component').then(module => module.OrderPizzaComponent),
        runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        canActivate: [AuthGuardService],
        title: 'Order Pizza'
    },
    {
        path: 'build-pizza',
        loadComponent: () => import('./build-pizza/build-pizza.component').then(module => module.BuildPizzaComponent),
        canActivate: [AuthGuardService],
        loadChildren: () => import('./build-pizza/build.routes').then(module => module.routes),
        title: 'Build Pizza'
    },
    {
        path: 'cart',
        loadComponent: () => import('./cart/cart.component').then(module => module.CartComponent),
        canActivate: [AuthGuardService],
        title: 'Cart'
    },
    {
        path: 'profile',
        loadComponent: () => import('./profile/profile.component').then(module => module.ProfileComponent),
        canActivate: [AuthGuardService],
        title: 'Profile'
    },
    {
        path: 'history',
        loadComponent: () => import('./history/history.component').then(module => module.HistoryComponent),
        canActivate: [AuthGuardService],
        title: 'Order history'
    },
    {
        path: 'order-successful',
        loadComponent: () => import('./order-successful/order-successful.component').then(module => module.OrderSuccessfulComponent),
        canActivate: [AuthGuardService],
        title: 'Order Successful'
    },
    {
        path: '**',
        component: NotFoundComponent,
        title: 'Page not found'
    }
];