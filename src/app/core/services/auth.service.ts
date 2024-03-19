import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export abstract class AuthService {

  // Observables que me van a indicar si el usuario se ha logeado o no
  // es de tipo booleano ya que si es verdadero dara el paso a la siguiente página, ademas lo tenemos en falso por defecto por seguridad
  protected _logged = new BehaviorSubject<boolean>(false);
  public isLogged$ = this._logged.asObservable();

  protected _user = new BehaviorSubject<User|null>(null);
  public user$ = this._user.asObservable();

  public abstract login(credentials: Object): Observable<any>;

  public abstract register(info: Object): Observable<any>;

  public abstract logOut(): Observable<void>;

  public abstract me(): Observable<any>;

  public abstract deleteAccount(id: number): Observable<void>;
}
