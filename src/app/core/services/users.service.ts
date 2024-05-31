import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase/firebase.service';
import { Unsubscribe, UserCredential } from 'firebase/auth';
import { BehaviorSubject, Observable, filter, from, map } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  /**
  * Constructor de la clase.
  * 
  * @param firebaseSvc Servicio de Firebase utilizado para diversas operaciones.
  */
  constructor(
    private firebaseSvc: FirebaseService
  ) { }

  // Lista de usuarios
  private _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  users$: Observable<User[]> = this._users.asObservable();

  /**
  * Método para suscribirse a la colección de usuarios en Firebase.
  *
  * @returns Una función de cancelación de la suscripción o null si no se pudo suscribir.
  */
  public subscribeToUsersCollection(): Unsubscribe | null {
    return this.firebaseSvc.subscribeToCollection('users', this._users, (snapshot: any) => {
      const data = snapshot.data();
      console.log("Datos del documento: ", data, " uuid: ", snapshot.id);
      return {
        uuid: snapshot.id,
        username: data.username,
        email: data.email,
        admin: data.admin,
        aceptado: data.aceptado,
        imageUrl: data.imageUrl ? data?.imageUrl : "https://firebasestorage.googleapis.com/v0/b/fir-project-91ee3.appspot.com/o/images%2Fprofile.png?alt=media&token=cf7e68cc-c045-4fa3-978b-8281d42fcd51"
      }
    })
  }

  /**
  * Método para actualizar un usuario en la base de datos.
  *
  * @param user El usuario que se va a actualizar.
  * @returns Un observable que indica el estado de la actualización.
  */
  public updateUser(user: any) {
    console.log("Usuario a actualizar: ", user);
    from(this.firebaseSvc.updateDocument('users', user.uuid, user))
  }

  /**
  * Método para aceptar a un usuario en la base de datos.
  *
  * @param user El usuario que se va a aceptar.
  * @returns Un observable que indica el estado de la aceptación.
  */
  public acceptUser(user: User) {
    from(this.firebaseSvc.updateDocumentField('users', user.uuid, 'aceptado', true))
  }

  /**
  * Método para eliminar un usuario de la base de datos.
  *
  * @param user El usuario que se va a eliminar.
  * @returns Un observable que indica el estado de la eliminación.
  */
  public deleteUser(user: User) {
    from(this.firebaseSvc.deleteDocument('users', user.uuid))
  }
}
