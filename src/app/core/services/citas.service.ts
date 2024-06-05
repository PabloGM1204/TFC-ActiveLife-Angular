import { Injectable } from '@angular/core';
import { Unsubscribe } from 'firebase/firestore';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { Cita } from '../interfaces/cita';
import { FirebaseService } from './firebase/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  constructor(
    private firebaseSvc: FirebaseService
  ) { }

  // List of appointments.
  private _citas: BehaviorSubject<Cita[]> = new BehaviorSubject<Cita[]>([]);
  citas$: Observable<Cita[]> = this._citas.asObservable();

  /**
  * Method to subscribe to the collection of appointments in Firebase.
  *
  * @returns A cancellation function for the subscription or null if subscription failed.
  */
  public subscribeToCitasCollection(): Unsubscribe | null {
    return this.firebaseSvc.subscribeToCollection('citas', this._citas, (snapshot: any) => {
      const data = snapshot.data();
      //console.log("Datos del documento: ", data, " uuid: ", snapshot.id);

      return {
        id: snapshot.id,
        descripcion: data.descripcion,
        fechaCita: data.fechaCita,
        fechaSolicitud: data.fechaSolicitud,
        imagen: data.imagen,
        titulo: data.titulo,
        userUUID: data.userUUID,
        encargadoUuid: data?.encargadoUuid,
        estado: data.estado ? data.estado : 'espera',
        respuesta: data.respuesta ? data.respuesta : '',
        fileUrl: data.file ? data.file : ''
      }
    })
  }

  /**
  * Method to update an appointment in the database.
  *
  * @param cita The appointment to be updated.
  */
  public updateCita(cita: Cita) {
    console.log("Cita a actualizar: ", cita);
    from(this.firebaseSvc.updateDocument('citas', cita.id, cita))
  }

  /**
  * Method to delete an appointment from the database.
  *
  * @param cita The appointment to be deleted.
  */
  public deleteCita(cita: Cita) {
    console.log("Cita a eliminar: ", cita);
    from(this.firebaseSvc.deleteDocument('citas', cita.id))
  }
}
