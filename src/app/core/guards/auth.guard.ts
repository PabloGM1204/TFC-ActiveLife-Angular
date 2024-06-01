import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  /**
  * Constructor of the class.
  * 
  * @param auth Authentication service used to handle user authentication.
  * @param router Routing service used to navigate between different views of the application.
  */
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  /**
  * Method that determines whether a route can be accessed or not.
  *
  * @param route Information about the currently activated route.
  * @param state Router state at the time the route is activated.
  * @returns An observable, a promise, or a boolean value or UrlTree indicating whether the route can be activated.
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