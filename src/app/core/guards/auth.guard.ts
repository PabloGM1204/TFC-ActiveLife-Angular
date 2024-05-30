import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  // Puedes inyectar las URL o simplemente usar strings directamente
  private loginUrl: string = '/login'; // Página para iniciar sesión o acceso
  private homeUrl: string = '/home'; // Página de inicio post-login

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.isLogged$.pipe(
      tap(logged => {
        if (logged) {
          // Si el usuario está autenticado, redirige a Home
          return this.router.createUrlTree([this.homeUrl]);
        } else {
          // Si el usuario no está autenticado, redirige a Access
          return this.router.createUrlTree([this.loginUrl]);
        }
      })
    );
  }
}