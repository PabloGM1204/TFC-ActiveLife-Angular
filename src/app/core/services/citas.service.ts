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

  // GetAll continuo de la colección de citas
  public subscribeToCitasCollection(): Unsubscribe | null {
    return this.firebaseSvc.subscribeToCollection('citas', this._citas, (snapshot: any) => {
      const data = snapshot.data();
      console.log("Datos del documento: ", data, " uuid: ", snapshot.id);

      return {
        descripcion: data.descripcion,
        fechaCita: data.fechaCita,
        fechaSolicitud: data.fechaSolicitud,
        imagen: data.image,
        titulo: data.titulo,
        userUUID: snapshot.id,
        encargadoUuid: data?.encargadoUuid,
        estado: data.estado ? data.estado : 'espera'
      }
    })
  }

  // Actualizar datos de la cita
  public updateCita(cita: Cita) {
    console.log("Cita a actualizar: ", cita);
    from(this.firebaseSvc.updateDocument('citas', cita.userUUID, cita))
  }
}
