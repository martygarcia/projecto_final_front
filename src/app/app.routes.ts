import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then( m => m.HomePage)
  },
  {
    path: 'team',
    loadComponent: () => import('./team/team.page').then( m => m.TeamPage)
  },
  {
    path: 'pokemon-level',
    loadComponent: () => import('./pokemon-level/pokemon-level.page').then( m => m.PokemonLevelPage)
  },
];
