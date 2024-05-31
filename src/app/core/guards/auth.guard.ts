import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /**
  * Constructor de la clase.
  * 
  * @param auth Servicio de autenticación utilizado para manejar la autenticación del usuario.
  * @param router Servicio de enrutamiento utilizado para navegar entre diferentes vistas de la aplicación.
  */
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  /**
  * Método que determina si una ruta se puede acceder o no.
  *
  * @param route Información sobre la ruta activada actualmente.
  * @param state Estado del router en el momento de la activación de la ruta.
  * @returns Un observable, una promesa o un valor booleano o UrlTree que indica si la ruta puede ser activada.
  */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.auth.isLogged$.pipe(
      tap(logged => {
        if (logged) {
          return this.router.createUrlTree(["/home"]);
        } else {
          return this.router.createUrlTree(["/landing"]);
        }})
      );}
  }