import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase/firebase.service';
import { BehaviorSubject, Observable, catchError, from, map, tap } from 'rxjs';
import { Rutina } from '../interfaces/rutina';
import { Unsubscribe } from 'firebase/firestore';

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
  public subscribeToRutinaCollection(): Unsubscribe | null {
    return this.firebaseSvc.subscribeToCollection('rutinas', this._rutinas, (snapshot: any) => {
      const data = snapshot.data();
      console.log("Datos del documento: ", data, " uuid: ", snapshot.id);

      return {
        title: data.title,
        userUUID: data.userUUID,
        exercises: data.exercises,
        public: data.public,
        day: data.day,
        description: data.description,
        id: snapshot.id
      }
    })
  }

  // Obtener una rutina por su uuid
  public getRutina(id: any): Observable<Rutina> {
    return from(this.firebaseSvc.getDocument('rutinas', id)).pipe(
      map((rutina: any) => {
        console.log('Rutina:', rutina);
        return {
          title: rutina.data.title,
          userUUID: rutina.data.userUUID,
          exercises: rutina.data.exercises,
          public: rutina.data.public,
          day: rutina.data.day,
          description: rutina.data.description,
          id: rutina.id
        };
      }),
      tap(rutina => {
        console.log('Rutina:', rutina);
      }),
      catchError((error) => {
        console.error('Error al obtener la rutina:', error);
        throw error;
      })
    );
  }

  // Crear una rutina
  public addRutina(_rutina: Rutina): Observable<Rutina> {
    let newRutina = {
      title: _rutina.title,
      userUUID: _rutina.userUUID,
      exercises: _rutina.exercises,
      public: _rutina.public,
      day: _rutina.day,
      description: _rutina.description
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

  //
  public updateRutina(rutina: Rutina): Observable<void> {
    let updateRutina = {
      title: rutina.title ? rutina.title : '',
      exercises: rutina.exercises,
      public: rutina.public,
      day: rutina.day ? rutina.day : '',
      description: rutina.description ? rutina.description : ''
    };
    console.log('Rutina actualizada:', updateRutina);
    console.log('Rutina id:', rutina);
    return from(this.firebaseSvc.updateDocument('rutinas', rutina.id, updateRutina))
  }

}
