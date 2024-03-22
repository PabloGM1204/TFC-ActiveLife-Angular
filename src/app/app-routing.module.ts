import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'rutinas',
    loadChildren: () => import('./pages/rutinas/rutinas.module').then( m => m.RutinasPageModule)
  },
  {
    path: 'citas',
    loadChildren: () => import('./pages/citas/citas.module').then( m => m.CitasPageModule)
  },
  {
    path: 'problemas',
    loadChildren: () => import('./pages/problemas/problemas.module').then( m => m.ProblemasPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
