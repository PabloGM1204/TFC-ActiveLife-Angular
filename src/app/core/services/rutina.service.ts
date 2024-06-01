import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase/firebase.service';
import { BehaviorSubject, Observable, catchError, from, map, tap } from 'rxjs';
import { Rutina } from '../interfaces/rutina';
import { Unsubscribe } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class RutinaService {

  /**
  * Constructor of the class.
  * 
  * @param firebaseSvc Firebase service used for various operations.
  */
  constructor(
    private firebaseSvc: FirebaseService
  ) {}

  // List of routines.
  private _rutinas: BehaviorSubject<Rutina[]> = new BehaviorSubject<Rutina[]>([]);
  rutinas$: Observable<Rutina[]> = this._rutinas.asObservable();

  /**
  * Method to subscribe to the collection of routines in Firebase.
  *
  * @returns A cancellation function for the subscription or null if subscription failed.
  */
  public subscribeToRutinaCollection(): Unsubscribe | null {
    return this.firebaseSvc.subscribeToCollection('rutinas', this._rutinas, (snapshot: any) => {
      const data = snapshot.data();
      return {
        title: data.title,
        userUUID: data.userUUID,
        exercises: data.exercises,
        public: data.public,
        day: data.day,
        description: data.description,
        id: snapshot.id,
        activo: data?.activo ? data.activo : false
      }
    })
  }

  /**
  * Method to retrieve a specific routine from the database.
  *
  * @param id The identifier of the routine to retrieve.
  * @returns An observable that emits the requested routine.
  */
  public getRutina(id: any): Observable<Rutina> {
    return from(this.firebaseSvc.getDocument('rutinas', id)).pipe(
      map((rutina: any) => {
        //console.log('Rutina:', rutina);
        return {
          title: rutina.data.title,
          userUUID: rutina.data.userUUID,
          exercises: rutina.data.exercises,
          public: rutina.data.public,
          day: rutina.data.day,
          description: rutina.data.description,
          id: rutina.id,
          activo: rutina.data?.activo ? rutina.data.activo : false
        };
      }),
      tap(rutina => {
        //console.log('Rutina:', rutina);
      }),
      catchError((error) => {
        console.error('Error al obtener la rutina:', error);
        throw error;
      })
    );
  }

  /**
  * Method to add a new routine to the database.
  *
  * @param _rutina The routine to be added.
  * @returns An observable that emits the added routine, including its unique identifier (UUID).
  */
  public addRutina(_rutina: Rutina): Observable<Rutina> {
    let newRutina = {
      title: _rutina.title,
      userUUID: _rutina.userUUID,
      exercises: _rutina.exercises,
      public: _rutina.public,
      day: _rutina.day,
      description: _rutina.description,
      activo: false
    };
    console.log('Nueva rutina:', newRutina);
    return from(this.firebaseSvc.createDocument('rutinas', newRutina)).pipe(
      map((uuid: string) => {
        return {
          ..._rutina,
          uuid
        }
      })
    )
  }

  /**
  * Method to update an existing routine in the database.
  *
  * @param rutina The routine to be updated.
  * @returns An observable indicating the status of the update.
  */
  public updateRutina(rutina: Rutina): Observable<void> {
    let updateRutina = {
      title: rutina.title ? rutina.title : '',
      exercises: rutina.exercises,
      public: rutina.public,
      day: rutina.day ? rutina.day : '',
      description: rutina.description ? rutina.description : '',
      activo: rutina.activo ? rutina.activo : false
    };
    console.log('Rutina actualizada:', updateRutina);
    console.log('Rutina id:', rutina);
    return from(this.firebaseSvc.updateDocument('rutinas', rutina.id, updateRutina))
  }

  /**
  * Method to delete a routine from the database.
  *
  * @param rutina The routine to be deleted.
  * @returns An observable indicating the status of the deletion.
  */
  public deleteRutina(rutina: Rutina) {
    from(this.firebaseSvc.deleteDocument('rutinas', rutina.id))
  }

  /**
  * Method to copy a routine and add it as a new routine in the database.
  *
  * @param rutina The routine to be copied.
  * @returns An observable indicating the status of creating the new routine.
  */
  public copyRutina(rutina: Rutina) {
    console.log('copiar rutina', rutina);
    from(this.firebaseSvc.createDocument('rutinas', rutina))
  }

}
