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
  * Constructor de la clase.
  * 
  * @param firebaseSvc Servicio de Firebase utilizado para diversas operaciones.
  */
  constructor(
    private firebaseSvc: FirebaseService
  ) {}

  // Lista de rutinas
  private _rutinas: BehaviorSubject<Rutina[]> = new BehaviorSubject<Rutina[]>([]);
  rutinas$: Observable<Rutina[]> = this._rutinas.asObservable();

  /**
  * Método para suscribirse a la colección de rutinas en Firebase.
  *
  * @returns Una función de cancelación de la suscripción o null si no se pudo suscribir.
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
  * Método para obtener una rutina específica de la base de datos.
  *
  * @param id El identificador de la rutina que se desea obtener.
  * @returns Un observable que emite la rutina solicitada.
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
  * Método para agregar una nueva rutina a la base de datos.
  *
  * @param _rutina La rutina que se va a agregar.
  * @returns Un observable que emite la rutina agregada, incluyendo su identificador único (UUID).
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
  * Método para actualizar una rutina existente en la base de datos.
  *
  * @param rutina La rutina que se va a actualizar.
  * @returns Un observable que indica el estado de la actualización.
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
  * Método para eliminar una rutina de la base de datos.
  *
  * @param rutina La rutina que se va a eliminar.
  * @returns Un observable que indica el estado de la eliminación.
  */
  public deleteRutina(rutina: Rutina) {
    from(this.firebaseSvc.deleteDocument('rutinas', rutina.id))
  }

  /**
  * Método para copiar una rutina y agregarla como una nueva rutina en la base de datos.
  *
  * @param rutina La rutina que se va a copiar.
  * @returns Un observable que indica el estado de la creación de la nueva rutina.
  */
  public copyRutina(rutina: Rutina) {
    console.log('copiar rutina', rutina);
    from(this.firebaseSvc.createDocument('rutinas', rutina))
  }

}
