import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase/firebase.service';
import { Unsubscribe, UserCredential } from 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private firebaseSvc: FirebaseService
  ) { }

  private _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  users$: Observable<User[]> = this._users.asObservable();

  public subscribeToUsersCollection(): Unsubscribe | null {
    return this.firebaseSvc.subscribeToCollection('users', this._users, (snapshot: any) => {
      const data = snapshot.data();
      console.log("Datos del documento: ", data, " uuid: ", snapshot.id);

      return {
        uuid: snapshot.id,
        username: data.username,
        email: data.email,
        admin: data.admin,
        aceptado: data.aceptado
      }
    })
  }
}
