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
  * Constructor of the class.
  * 
  * @param firebaseSvc Firebase service used for various operations.
  */
  constructor(
    private firebaseSvc: FirebaseService
  ) { }

  // Users list.
  private _users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  users$: Observable<User[]> = this._users.asObservable();

  /**
  * Method to subscribe to the collection of users in Firebase.
  *
  * @returns A cancellation function for the subscription or null if subscription failed.
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
  * Method to update a user in the database.
  *
  * @param user The user to be updated.
  * @returns An observable indicating the status of the update.
  */
  public updateUser(user: any) {
    console.log("Usuario a actualizar: ", user);
    from(this.firebaseSvc.updateDocument('users', user.uuid, user))
  }

  /**
  * Method to accept a user in the database.
  *
  * @param user The user to be accepted.
  * @returns An observable indicating the status of the acceptance.
  */
  public acceptUser(user: User) {
    from(this.firebaseSvc.updateDocumentField('users', user.uuid, 'aceptado', true))
  }

  /**
  * Method to delete a user from the database.
  *
  * @param user The user to be deleted.
  * @returns An observable indicating the status of the deletion.
  */
  public deleteUser(user: User) {
    from(this.firebaseSvc.deleteDocument('users', user.uuid))
  }
}
