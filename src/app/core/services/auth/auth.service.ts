import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export abstract class AuthService {

  // Observables that will indicate whether the user has logged in or not.
  // It is of boolean type because if it is true, it will allow passage to the next page. 
  // Additionally, it is set to false by default for security reasons.
  protected _logged = new BehaviorSubject<boolean>(false);
  public isLogged$ = this._logged.asObservable();

  // Observables that will provide user data.
  protected _user = new BehaviorSubject<User|null>(null);
  public user$ = this._user.asObservable();

  public abstract login(credentials: Object): Observable<any>;

  public abstract register(info: Object): Observable<any>;

  public abstract logOut(): Observable<void>;

  public abstract me(): Observable<any>;

  public abstract deleteAccount(id: number): Observable<void>;
}
