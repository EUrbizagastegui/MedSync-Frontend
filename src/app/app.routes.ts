import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
    // PÁGINA DE INICIO
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },

    // RUTAS DE MAINLAYOUT
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: 'home',
                loadComponent: () => import('./pages/dashboard/home/home.component').then(m => m.HomeComponent),
            },
            {
              path: 'profile',
              loadComponent: () => import('./pages/dashboard/profile/profile.component').then(m => m.ProfileComponent),
            },
            {
              path: 'daily-history',
              loadComponent: () => import('./pages/daily-history/daily-history.component').then(m => m.DailyHistoryComponent),
            }
        ],
    },

    // RUTAS DE AUTHENTICATION
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: 'login',
                loadComponent: () => import('./pages/authentication/login/login.component').then(m => m.LoginComponent)
            },
            {
                path: 'not-found',
                loadComponent: () => import('./pages/errors/not-found/not-found.component').then(m => m.NotFoundComponent)
            }
        ]
    },

    // REDIRECCIÓN A RUTAS NO ENCONTRADAS
    {
        path: '**',
        redirectTo: 'not-found'
    }
];
