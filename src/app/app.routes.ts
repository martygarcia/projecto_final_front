import { Routes } from '@angular/router';
import {AuthGuard} from '@auth0/auth0-angular'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage),
    canActivate: [AuthGuard]
  },
  {
    path: 'team',
    loadComponent: () => import('./team/team.page').then( m => m.TeamPage),
    canActivate: [AuthGuard]

  },
  {
    path: 'pokemon-level',
    loadComponent: () => import('./pokemon-level/pokemon-level.page').then( m => m.PokemonLevelPage),
    canActivate: [AuthGuard]

  },
  {
    path: 'stats',
    loadComponent: () => import('./stats/stats.page').then( m => m.StatsPage),
    canActivate: [AuthGuard]

  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
];
