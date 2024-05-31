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

  // Lista de citas
  private _citas: BehaviorSubject<Cita[]> = new BehaviorSubject<Cita[]>([]);
  citas$: Observable<Cita[]> = this._citas.asObservable();

  /**
  * Método para suscribirse a la colección de citas en Firebase.
  *
  * @returns Una función de cancelación de la suscripción o null si no se pudo suscribir.
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
        imagen: data.image,
        titulo: data.titulo,
        userUUID: data.userUuid,
        encargadoUuid: data?.encargadoUuid,
        estado: data.estado ? data.estado : 'espera',
        respuesta: data.respuesta ? data.respuesta : '',
        fileUrl: data.file ? data.file : ''
      }
    })
  }

  /**
  * Método para actualizar una cita en la base de datos.
  *
  * @param cita La cita que se va a actualizar.
  */
  public updateCita(cita: Cita) {
    console.log("Cita a actualizar: ", cita);
    from(this.firebaseSvc.updateDocument('citas', cita.id, cita))
  }

  /**
  * Método para eliminar una cita de la base de datos.
  *
  * @param cita La cita que se va a eliminar.
  */
  public deleteCita(cita: Cita) {
    console.log("Cita a eliminar: ", cita);
    from(this.firebaseSvc.deleteDocument('citas', cita.id))
  }
}
