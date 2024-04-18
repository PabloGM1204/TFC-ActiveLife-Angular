import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase/firebase.service';
import { BehaviorSubject, Observable, from, map } from 'rxjs';
import { Rutina } from '../interfaces/rutina';
import { Unsubscribe } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class RutinaService {

  constructor(
    private firebaseSvc: FirebaseService
  ) {}

  // Lista de usuarios
  private _rutinas: BehaviorSubject<Rutina[]> = new BehaviorSubject<Rutina[]>([]);
  rutinas$: Observable<Rutina[]> = this._rutinas.asObservable();

  // GetAll continuo de la colección de rutinas
  public subscribeToUsersCollection(): Unsubscribe | null {
    return this.firebaseSvc.subscribeToCollection('rutinas', this._rutinas, (snapshot: any) => {
      const data = snapshot.data();
      console.log("Datos del documento: ", data, " uuid: ", snapshot.id);

      return {
        title: data.title,
        userUUID: data.userUUID,
        exercises: data.exercises,
        public: data.public
      }
    })
  }

  // Crear una rutina
  public addRutina(_rutina: Rutina): Observable<Rutina> {
    let newRutina = {
      title: _rutina.title,
      userUUID: _rutina.userUUID,
      exercises: _rutina.exercises,
      public: _rutina.public
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
}
