import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase/firebase.service';
import { Unsubscribe, UserCredential } from 'firebase/auth';
import { BehaviorSubject, Observable, filter, from, map } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private firebaseSvc: FirebaseService
  ) { }

  // Lista de usuarios
  private _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  users$: Observable<User[]> = this._users.asObservable();

  // GetAll continuo de la colección de usuarios
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

  // Actualizar datos del usuario
  public updateUser(user: any) {
    console.log("Usuario a actualizar: ", user);
    from(this.firebaseSvc.updateDocument('users', user.uuid, user))
  }

  // Aceptar un usuario que se ha registrado como administrador
  public acceptUser(user: User) {
    from(this.firebaseSvc.updateDocumentField('users', user.uuid, 'aceptado', true))
  }

  // Eliminar un usuario que se ha registrado
  public deleteUser(user: User) {
    from(this.firebaseSvc.deleteDocument('users', user.uuid))
  }
}
